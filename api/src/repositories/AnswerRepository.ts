import { BaseRepository } from "./BaseRepository.js";

export interface AnswerTable {
  id: bigint;
  answer_text: string;
  author_id: bigint;
  quetion_id: bigint;
  created_time: Date;
  updated_time: Date;
}

export class AnswerRepository extends BaseRepository<AnswerTable> {
  private static _instance: AnswerRepository

  static getInstance(): AnswerRepository {
    if (!this._instance) {
      this._instance = new AnswerRepository()
    }
    return this._instance
  }

  constructor() {
    super('answers')
  }
}