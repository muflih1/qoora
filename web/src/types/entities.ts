export interface Question {
  id: string
  question_text: string
  asker: {
    id: string
    given_name: string
    picture_url: string
  }
  url: string
  slug: string
  viewer_has_answered: boolean
  answer_count: number
}

export interface Answer {
  id: string
  answer_text: string
  created_time: string
  url: string
  owner: {
    id: string
    given_name: string
    family_name?: string | null
    picture_url: string
  }
  question: Question
  viewer_can_delete: boolean
  viewer_can_edit: boolean
}