export function GetWeekDay(year: number, month: number, date: number) {
  const weekdayIndex: number = new Date(
    new Date(`${year}-${month}-${date}`)
  ).getDay()
  const days: string[] = [
    'Неділя',
    'Понеділок',
    'Вівторок',
    'Середа',
    'Четвер',
    "П'ятниця",
    'Субота',
  ]
  return days[weekdayIndex]
}
