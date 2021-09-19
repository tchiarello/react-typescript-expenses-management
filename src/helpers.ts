export function getMonthAsString(currentMonth: number): string {
  return currentMonth < 10 ? `0${currentMonth}` : currentMonth.toString();
}
