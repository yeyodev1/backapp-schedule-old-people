export function convertDate(dateString: string): Date {
  const [dayName, day, month, year] = dateString.replace(',', '').split('/');
  const monthIndex = {
    "01": 0, "02": 1, "03": 2, "04": 3, "05": 4, "06": 5, "07": 6, "08": 7, "09": 8, "10": 9, "11": 10, "12": 11
  }[month];

  return new Date(parseInt(year), monthIndex as any, parseInt(day));
}