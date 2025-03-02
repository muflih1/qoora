import { BaseRepository } from "./BaseRepository";

export interface AnswerImageTable {
  answer_id: bigint;
  image_id: bigint;
}

export class AnswerImageRepository extends BaseRepository<AnswerImageTable> {
  private static _instance: AnswerImageRepository

  static getInstance(): AnswerImageRepository {
    if (!this._instance) {
      this._instance = new AnswerImageRepository()
    }
    return this._instance
  }

  constructor() {
    super('answer_images')
  }
}