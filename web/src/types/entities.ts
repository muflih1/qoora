export interface Question {
  id: string
  question_text: string
  asker: {
    id: string
    given_name: string
  }
  url: string
  slug: string
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
}