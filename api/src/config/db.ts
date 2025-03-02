import pg from "pg"
import { getEnv } from "../env"

class Database {
  static instance: Database
  private _pool: pg.Pool

  static createInstance() {
    if (!Database.instance) {
      this.instance = new Database()
    }
    return this.instance
  }

  constructor() {
    this._pool = new pg.Pool({ connectionString: getEnv('DATABASE_URI') })
  }

  connect() {
    return new Promise((ok, fail) => {
      this._pool.connect((err, client, release) => {
        if (err) {
          return fail(err)
        }
        release()
        ok(client)
      })
    })
  }

  query<T>(queryText: string, values?: any[] | undefined): Promise<Array<T>> {
    return new Promise((ok, fail) => {
      this._pool.query(queryText, values as any[], (err, result) => {
        if (err) {
          return fail(err)
        }
        ok(result.rows as T[])
      })
    })
  }
}

export const db = Database.createInstance()

export async function connectDatabase() {
  try {
    await db.connect()
    console.log('Database connected')
  } catch (error) {
    console.log('Database connection error:', error)
    process.exit(1)
  }
}