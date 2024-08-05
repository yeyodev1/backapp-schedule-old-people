import process from "node:process";
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

process.loadEnvFile();

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY,
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
  ] 
});

const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID!, serviceAccountAuth);

(async function () {
  await doc.loadInfo();
})();

export async function getSheetByIndex(index = 0) {
  if(!doc) {
    throw new Error('Google Spreadsheet not loaded');
  }
  return doc.sheetsByIndex[index];
}