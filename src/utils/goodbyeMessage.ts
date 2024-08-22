export function generateConfirmationMessage(city: string, address: string): string {
  const sedeNameMatch = address.match(/Sede barrio ([^:]+):/i);
  const sedeName = sedeNameMatch ? sedeNameMatch[1] : 'la sede seleccionada';
  const fullAddress = address.split(': ')[1].trim();

  const message = `El Día de Prueba para la sede ${sedeName} en ${city} ha sido agendado satisfactoriamente 👌 para el 00-00-2024 de 9:00am a 4:30pm

⚠ Nuestra dirección es ${fullAddress}, barrio ${sedeName}, primer sector ⚠

Los atenderá la directora de la sede quien es Psicóloga🥼 especializada en Alzheimer y Demencias.`;

  return message;
};