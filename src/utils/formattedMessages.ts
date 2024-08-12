import { CiudadInfo } from "../interfaces/SheetData.interface";

export function formatMessageOfSede (data: CiudadInfo[]): string {
  let message = 'Ahora, por favor indícame la sede 🏢.\n\nLas verás aquí abajo 👇👇👇.\n\n';

  data.forEach(ciudadInfo => {
      message += `${ciudadInfo.ciudad.toUpperCase()}:\n`;
      ciudadInfo.sedes.forEach(sede => {
          message += `   ▪️ ${sede.nombre}: ${sede.direccion}\n`;
      });
      message += '\n';
  });

  return message.trim(); 
};


export function formatScheduleMessage(data: { daysAvailables: { day: string, schedule: string }[] }): string {
  let message = 'Todos los horarios son de 9:00 AM a 4:30 PM 🕘.\n\nDías disponibles:\n\n';

  const dayMap: { [key: string]: string } = {
    lunes: "Lunes",
    martes: "Martes",
    miercoles: "Miércoles",
    jueves: "Jueves",
    viernes: "Viernes",
    sabado: "Sábado",
    domingo: "Domingo"
  };

  data.daysAvailables.forEach(dayObj => {
    const dayFormatted = dayMap[dayObj.day.toLowerCase()] || dayObj.day;
    message += `📅 ${dayFormatted.charAt(0).toUpperCase() + dayFormatted.slice(1)}: ${dayObj.schedule}\n`;
  });

  return message.trim();
}
