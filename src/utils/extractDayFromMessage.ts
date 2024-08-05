export function extractDayFromMessage(message: string): string | null {
  const daysMap: { [key: string]: number } = {
    'lunes': 1,
    'martes': 2,
    'miércoles': 3,
    'jueves': 4,
    'viernes': 5,
  };
  const lowerMessage = message.toLowerCase();

  for (const day in daysMap) {
    if (lowerMessage.includes(day)) {
      const dayNumber = daysMap[day];
      const nextDate = getNextDate(dayNumber);
      return formatDate(nextDate);
    }
  }

  return null;
}

function getNextDate(dayOfWeek: number): Date {
  const today = new Date();
  const resultDate = new Date(today);
  resultDate.setDate(today.getDate() + (dayOfWeek + 7 - today.getDay()) % 7);
  return resultDate;
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}