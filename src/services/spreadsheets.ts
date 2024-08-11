import process from "node:process";
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { SedeInfo } from "../interfaces/SheetData.interface";

process.loadEnvFile();

class GoogleSheetService {
  private doc: GoogleSpreadsheet;
  private isInitialized: boolean = false;

  constructor() {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY, // Asegura que las nuevas líneas en la clave se manejan correctamente
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ]
    });

    this.doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID!, serviceAccountAuth);
    this.initialize();
  }

  private async initialize() {
    if (!this.isInitialized) {
      await this.doc.loadInfo();
      this.isInitialized = true;
    }
  }

  async getSheetByIndex(index = 0): Promise<GoogleSpreadsheetWorksheet> {
    await this.initialize();
    return this.doc.sheetsByIndex[index];
  }

  async getAllRows(sheetIndex = 0): Promise<any[]> {
    const sheet = await this.getSheetByIndex(sheetIndex);
    const rows = await sheet.getRows();
    return rows;
  }

  async getSheetData(sheetIndex = 1): Promise<SedeInfo[]> {
    await this.initialize();
    try {
      const rows = await this.getAllRows(sheetIndex);
    
      const result: SedeInfo[] = [];

      rows.forEach(row => {
        const ciudad = row.get('Ciudad') || '';
        const sedesString = row.get('Sede') || '';
        const diasDisponiblesString = row.get('dias disponibles') || '';

        const sedes = sedesString.split(' | ').map((sede: any) => {
            const [nombre, direccion] = sede.split(':').map((part: any) => part.trim());
            return { nombre, direccion };
        });

        const diasDisponibles = diasDisponiblesString.split('-');

        result.push({
            ciudad: ciudad.toUpperCase(),
            sedes,
            diasDisponibles
        });
    });

    return result;
    } catch (error) {
      console.error('error: ', error);
      return []
    }
  }
}

export default GoogleSheetService;
