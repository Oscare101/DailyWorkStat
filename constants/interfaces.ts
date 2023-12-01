export interface DailyWork {
  year?: number
  month?: number
  date?: number
  tasks?: number
  chats?: number
  workingDay?: boolean
  timestamp?: string
}

export interface UserInfo {
  tasksAmount: number
}
