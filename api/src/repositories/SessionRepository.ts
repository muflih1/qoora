import { BaseRepository } from "./BaseRepository";

export interface SessionTable {
  id: bigint;
  token_digets: string;
  user_id: bigint;
  user_agent?: string | null;
  ip_address?: string | null;
  last_refreshed: Date;
  expires: Date;
  last_activity_time: Date;
  created_time?: Date
}

export class SessionRepository extends BaseRepository<SessionTable> {
  private static _instance: SessionRepository

  static getInstance(): SessionRepository {
    if (!this._instance) {
      this._instance = new SessionRepository()
    }
    return this._instance
  }

  constructor() {
    super('sessions')
  }
}