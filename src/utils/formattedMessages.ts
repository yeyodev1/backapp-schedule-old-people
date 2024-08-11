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