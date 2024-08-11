import GoogleSheetService from '../services/spreadsheets';

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
  const sheetService = new GoogleSheetService();
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
