import { BaseRepository } from "./BaseRepository.js";

export interface ImageTable {
  id: bigint;
  filename: string;
  url: string;
  created_time: Date;
}

export class ImageRepository extends BaseRepository<ImageTable> {
  private static _instance: ImageRepository

  static getInstance(): ImageRepository {
    if (!this._instance) {
      this._instance = new ImageRepository()
    }
    return this._instance
  }

  constructor() {
    super('images')
  }
}