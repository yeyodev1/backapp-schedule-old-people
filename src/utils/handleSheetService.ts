import GoogleSheetService from '../services/spreadsheets';

const sheetService = new GoogleSheetService();

type UserRowData = {
  ['nombre del acudiente']: string;
  ['nombre del paciente']: string;
  ['sede escogida']: string;
  ['dia escogido']: string;
  ['nro de telefono']: string;
  uuid: string;
}

let uuid: string | null = null;

export async function addRowsToSheet(updateFieldName: keyof UserRowData, updateFieldValue: string, sheetIndex = 0): Promise<void> {
  const sheet = await sheetService.getSheetByIndex(sheetIndex);
  const rows = await sheet.getRows<UserRowData>();

  if (updateFieldName === 'uuid') {
    uuid = updateFieldValue;
    await sheet.addRow({ uuid: updateFieldValue });
  } else {
    const rowUpdateIndex = rows.findIndex(row => row.get('uuid') === uuid);
    if (rowUpdateIndex !== -1) {
      rows[rowUpdateIndex].set(updateFieldName, updateFieldValue);
      await rows[rowUpdateIndex].save();
    } else {
      throw new Error(`Row with uuid ${uuid} not found.`);
    }
  }
}

export async function getLastSedeEscogidaByPhoneNumber(phoneNumber: string, sheetIndex = 0): Promise<string> {
  try {
    const rows =  await sheetService.getAllRows(sheetIndex);

    const filteredRows = rows.filter(row => row.get('nro de telefono') === phoneNumber);

    if (filteredRows.length === 0) {
      throw new Error(`No entries found for phone number ${phoneNumber}`);
    }

    const lastRow = filteredRows[filteredRows.length - 1];

    return lastRow.get('sede escogida') 
  } catch (error) {
    throw new Error(`errorsote: ${error}`);
  }
}
export async function getDaysAvailablesByCity(sedeEscogida: string, sheetIndex = 1): Promise<{ daysAvailables: string } | null> {
  try {
    const rows = await sheetService.getAllRows(sheetIndex);

    for (const row of rows) {
      const cities = row.get('Ciudad') || '';


      if (sedeEscogida.includes(cities.trim())) {
        const rawDaysAvailables = row.get('dias disponibles') || '';
        const daysAvailablesArray = rawDaysAvailables.split('-').map((day: string) => day.trim().toLowerCase());


        const daysAvailables = daysAvailablesArray.map((day: string) => ({
          day,
          schedule: "9:00 AM - 4:30 PM"  
        }));

        return { 
          daysAvailables
        };
      }
    }
    return null;
  } catch (error) {
    throw new Error(`Error al buscar días disponibles: ${error}`);
  }
}

export async function getFullAddressBySede(
  sedeSelected: string, 
  sheetIndex = 1): Promise<{ sedeSelected: string; city: string }> {
  try {
    const rows = await sheetService.getAllRows(sheetIndex);

    const [, selectedSede] = sedeSelected.split('|').map(part => part.trim().toLowerCase());

    for (const row of rows) {
      const city = row.get('Ciudad') || '';
      const sede = row.get('Sede') || '';

      if (sedeSelected.includes(city.trim())) {
        const sedeParts = sede.split('|').map((part: string) => part.trim().toLowerCase());

        const matchingPart = sedeParts.find((part: string) => part.includes(selectedSede));
        if (matchingPart) {
          const sedeSelected = sede.split('|').find((part: string) => part.trim().toLowerCase().includes(selectedSede));
          return {
            sedeSelected,
            city
          }
        };
      };
    };
    return {
      sedeSelected: 'Not found',
      city: 'Not found'
    };
  } catch (error) {
    throw new Error(`Error searching data: ${error}`);
  }
}
