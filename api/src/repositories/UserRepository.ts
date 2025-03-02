import { BaseRepository } from "./BaseRepository"

export interface UserTable {
  id: bigint
  given_name: string
  family_name?: string | null
  email: string
  password_digest: string
  picture_url?: string | null
  biography?: string | null
  created_time?: Date
  updated_time?: Date
}

export class UserRepository extends BaseRepository<UserTable> {
  private static _instance: UserRepository

  static getInstance(): UserRepository {
    if (!this._instance) {
      this._instance = new UserRepository()
    }
    return this._instance
  }

  constructor() {
    super('users')
  }
}