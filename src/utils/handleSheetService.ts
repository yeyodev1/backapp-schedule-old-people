import { getSheetByIndex } from '../services/spreadsheets';

type UserRowData = {
  ['nombre del acudiente']: string;
  ['nombre del paciente']: string;
  ['sede escogida']: string;
  ['dia escogido']: string;
  ['nro de telefono']: string;
  uuid: string;
}

let uuid: string | null = null;

export async function addRowsToSheet(updateFieldName: keyof UserRowData, updateFieldValue: string ,sheetIndex?: number ): Promise<void> {
  const sheet = await getSheetByIndex(sheetIndex);
  const rows = await sheet.getRows<UserRowData>();

  if(updateFieldName == 'uuid'){
    uuid = updateFieldValue;
    await sheet.addRow({ 'uuid': updateFieldValue });
  } else {
    const rowUpdateIndex = rows.findIndex(row => row.get('uuid') === uuid);
    rows[rowUpdateIndex].set(updateFieldName, updateFieldValue);
    await rows[rowUpdateIndex].save();
  }
}