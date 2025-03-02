import { BaseRepository } from "./BaseRepository.js";

export interface QuestionTable {
  id: bigint;
  question_text: string;
  author_id: bigint;
  slug: string;
  created_time?: Date;
  updated_time?: Date;
}

export class QuestionRepository extends BaseRepository<QuestionTable> {
  private static _instance: QuestionRepository

  static getInstance(): QuestionRepository {
    if (!this._instance) {
      this._instance = new QuestionRepository()
    }
    return this._instance
  }

  constructor() {
    super('questions')
  }
}