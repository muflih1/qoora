import { db } from "../config/db.js"

const tableNamesCache = new Set()

async function getTableNames() {
  try {
    const result = await db.query<{table_name: string}>(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public'
    `)
    result.forEach(row => tableNamesCache.add(row.table_name))
  } catch (error) {
    console.log('Error fetching table names:', error)
    process.exit(1)
  }
}

await getTableNames()

export class BaseRepository<T extends Record<string, any>> {
  private _tableName: string
  declare private _query: string
  declare private _values: any[]

  constructor(tableName: string) {
    if (!tableNamesCache.has(tableName)) {
      throw new Error('Invalid table name: ' + tableName)
    }
    this._tableName = tableName
  }

  get(filters?: Partial<T>): this {
    this._query = `
      SELECT * FROM ${this._tableName}
    `
    this._values = []

    if (filters) {
      const keys = Object.keys(filters)
      if (keys.length > 0) {
        const condition = keys.map((key, index) => `"${String(key)}" = $${index + 1}`).join(" AND ")
        this._query += ` WHERE ${condition}`
        this._values = Object.values(filters)
      }
    }

    return this
  }

  sort(options: { [column in keyof T]?: 'ASC' | 'DESC' | 1 | -1 }): this {
    if (!options || Object.keys(options).length === 0) {
      throw new Error('At least one column must be provided for sorting.')
    }
  
    const orderByClause = Object.entries(options)
      .map(([column, order]) => {
        const direction = order === 1 ? 'ASC' : order === -1 ? 'DESC' : order
        return `"${String(column)}" ${direction}`
      })
      .join(', ')
  
    this._query += ` ORDER BY ${orderByClause}`
    return this
  }
  
  async exec() {
    const result = await db.query<T>(this._query, this._values)
    return Promise.all(result.map(async row => await this._transform(row)))
  }

  then<TResult1 = T[], TResult2 = never>(
    resolve?: (value: T[]) => TResult1 | PromiseLike<TResult1>,
    reject?: (reason: any) => TResult2 | PromiseLike<TResult2>
  ): Promise<TResult1 | TResult2> {
    return this.exec().then(resolve, reject)
  }

  catch<TResult = never>(
    reject?: (reson: any) => TResult | PromiseLike<TResult>
  ): Promise<T[] | TResult> {
    return this.exec().catch(reject)
  }

  finally(
    onFinally?: null | (() => void)
  ): Promise<T[]> {
    return this.exec().finally(onFinally)
  }

  async getOneBy(filters: Partial<T>): Promise<T | null> {
    const keys = Object.keys(filters)
    if (keys.length === 0) {
      throw new Error('At least one filter must be provided.')
    }

    const condition = keys.map((key, index) => `"${String(key)}" = $${index + 1}`).join(" AND ")
    const values = Object.values(filters)

    const query = `SELECT * FROM ${this._tableName} WHERE ${condition}`
    const result = await db.query<T>(query, values)

    if (result.length === 0) {
      return null
    }

    const transformedResult = await this._transform(result[0])
    return transformedResult
  }
  
  async getById(id: bigint): Promise<T | null> {
    const result = await db.query<T>(`SELECT * FROM ${this._tableName} WHERE id = $1`, [id])
    if (!result.length) {
      return null
    }
  
    const transformedResult = await this._transform(result[0])
    return transformedResult
  }

  async create(entity: T): Promise<T> {
    const keys = Object.keys(entity).join(', ')
    const values = Object.values(entity)
    const placeholders = values.map((_, index) => `$${index + 1}`).join(', ')

    const result = await db.query<T>(
      `INSERT INTO ${this._tableName} (${keys}) VALUES (${placeholders}) RETURNING *`,
      values
    )

    const transformedResult = await this._transform(result[0])

    return transformedResult
  }

  async update(id: bigint, entity: Partial<T>): Promise<T | null> {
    const tablesWithoutUpdatedAt = ['sessions']

    if (!tablesWithoutUpdatedAt.includes(this._tableName) && !('updated_time' in entity)) {
      (entity as any).updated_time = new Date()
    }

    const keys = Object.keys(entity)
    if (keys.length === 0) {
      throw new Error("At least one field must be updated.");
    }

    const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ')
    const values = [...Object.values(entity), id]

    const result = await db.query<T>(
      `UPDATE ${this._tableName} SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
      values
    )

    if (result.length === 0) {
      return null
    }

    const transformedResult = await this._transform(result[0])

    return transformedResult
  }

  async updateBy(filter: Partial<T>, entity: Partial<T>): Promise<T | null> {
    const filterKeys = Object.keys(filter)
    if (filterKeys.length === 0) {
      throw new Error('At lease one filter must be provided')
    }
    const condition = filterKeys.map((key, index) => `"${String(key)}" = $${index + 1}`).join(" AND ")

    const tablesWithoutUpdatedAt = ['sessions']

    if (!tablesWithoutUpdatedAt.includes(this._tableName) && !('updated_time' in entity)) {
      (entity as any).updated_time = new Date()
    }

    const keys = Object.keys(entity)
    if (keys.length === 0) {
      return null
    }

    const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ')
    const values = [...Object.values(entity), ...filterKeys]

    const result = await db.query<T>(
      `UPDATE ${this._tableName} SET ${setClause} WHERE = ${condition} RETURNING *`,
      values
    )

    if (result.length === 0) {
      return null
    }

    return result[0]
  }

  async delete(id: bigint): Promise<boolean> {
    const result = await db.query<T>(
      `DELETE FROM ${this._tableName} WHERE = $1`,
      [id]
    )
    return result.length > 0
  }

  async deleteBy(filter: Partial<T>): Promise<boolean> {
    const keys = Object.keys(filter)
    if (keys.length === 0) {
      throw new Error('At lease one filter must be provided')
    }

    const condition = keys.map((key, index) => `"${String(key)}" = $${index + 1}`).join(" AND ")
    const values = Object.values(filter)

    const result = await db.query(
      `DELETE FROM ${this._tableName} WHERE = ${condition}`,
      values
    )

    return result.length > 0
  }

  private async _transform(row: T) {
    const dateFields = await getDateFields(this._tableName)

    return Object.fromEntries(
      Object.entries(row).map(([key, value]) => [
        key,
        dateFields.includes(key) && typeof value === "string" ? new Date(value) : value
      ])
    ) as T
  }
}

const dateFieldsCache = new Map<string, Array<string>>()

async function getDateFields(tableName: string): Promise<Array<string>> {
  if (dateFieldsCache.has(tableName)) {
    // @ts-expect-error 
    return dateFieldsCache.get(tableName)
  }

  const query = `
    SELECT column_name 
    FROM information_schema.columns 
    WHERE table_name = $1 
      AND data_type IN ('timestamp', 'timestamp without time zone', 'date')
  `

  const result = await db.query<{column_name: string}>(query, [tableName])
  const dateFields = result.map(row => row.column_name)

  dateFieldsCache.set(tableName, dateFields)
  return dateFields
}