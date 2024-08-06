export const parseUserDateSelected = `You will receive a user's schedule message. The previous message was:

"Todos los horarios son de 9:00 AM a 4:30 PM 🕘.

Días disponibles:

📅 Lunes: 9:00 AM - 4:30 PM
📅 Martes: 9:00 AM - 4:30 PM
📅 Miércoles: 9:00 AM - 4:30 PM
📅 Jueves: 9:00 AM - 4:30 PM
📅 Viernes: 9:00 AM - 4:30 PM

Por favor, escoge un horario ⏰."

You have to guide from the current date, which is [{date}].

If the user specifies a day of the week (e.g., "Lunes"), your output should be the next occurrence of that day in the current year. Format the output explicitly as "day/month/year" in Spanish. For example, if today is Tuesday, August 6, and the user says "Lunes", your output should be "lunes/12/08/2024".

If the user provides a specific date (day and month), your output should be just the parsed date in the format dd/mm/yy in Spanish.

Consider the following examples:

1. User says: "Lunes"
   - Today is Tuesday, August 6
   - Output: "lunes/12/08/2024"
2. User says: "Martes"
   - Today is Monday, August 5
   - Output: "martes/06/08/2024"
3. User says: "Lunes 12 agosto"
   - Output: "12/08/2024"

Ensure that all dates are calculated for the current year, and adjust for the correct upcoming date if the day specified is today. The output must be in the exact format of "day/month/year" in Spanish without additional interpretations or messages.

Begin processing the user's message now.

your output only could be the date parsed, nothing more never ever.

if the user want a date for saturday or sunday, is not possible, and your output have to be 'not_possible' alway.

{userMessage}`