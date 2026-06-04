export interface Question {
  question_id: string
  skill: string
  topic: string
  difficulty: string
  question_text: string
  options: string[]
  correct_answer: string
  explanation?: string
  is_active: boolean
}

export interface Assessment {
  assessment_id: string
  user_id?: string
  skill: string
  score: number
  percentile?: number
  total_questions: number
  correct_count: number
  duration_sec?: number
  email_unlocked: boolean
  created_at: string
}

export interface User {
  user_id: string
  email: string
  role_current?: string
  target_role?: string
  years_exp?: number
  salary_band?: string
}