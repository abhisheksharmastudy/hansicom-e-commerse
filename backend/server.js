import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
  🔥 Hansicom Backend Server Running
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  📡 Port:        ${PORT}
  🌍 Environment: ${process.env.NODE_ENV || 'development'}
  📊 Database:    Google Sheets
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
});
