import { google } from 'googleapis';

/**
 * Google Sheets API Client
 * Uses Service Account authentication
 */

let sheetsClient = null;

/**
 * Initialize and return the Google Sheets API client
 */
export async function getSheetsClient() {
  if (sheetsClient) return sheetsClient;

  try {
    // For development, we'll use a simplified mock if no credentials
    if (!process.env.GOOGLE_PRIVATE_KEY) {
      console.warn('⚠️  Google Sheets credentials not found. Using mock data.');
      return null;
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const authClient = await auth.getClient();
    sheetsClient = google.sheets({ version: 'v4', auth: authClient });
    
    console.log('✅ Google Sheets API connected');
    return sheetsClient;
  } catch (error) {
    console.error('❌ Google Sheets connection failed:', error.message);
    return null;
  }
}

/**
 * Get the configured Sheet ID
 */
export function getSheetId() {
  return process.env.GOOGLE_SHEETS_ID;
}
