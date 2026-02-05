/**
 * User Service
 * Handles user CRUD operations via Google Sheets
 */

import bcrypt from 'bcryptjs';
import { getSheetsClient, getSheetId } from '../config/googleSheets.js';

// ─────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────

/**
 * Fetch all users from the "Users" sheet
 */
async function getUsersFromSheet() {
  const sheets = await getSheetsClient();
  if (!sheets) return []; // Returns empty if not connected

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: getSheetId(),
      range: 'Users!A2:G', // Columns A to G
    });

    const rows = response.data.values || [];
    return rows.map(row => ({
      id: row[0],
      name: row[1],
      email: row[2],
      password_hash: row[3],
      provider: row[4],
      google_id: row[5],
      created_at: row[6]
    }));
  } catch (error) {
    console.error('Error fetching users from Sheet:', error.message);
    return [];
  }
}

// ─────────────────────────────────────────────────────────────
// Core Functions
// ─────────────────────────────────────────────────────────────

/**
 * Generate unique user ID based on timestamp
 */
function generateUserId() {
  return `USR-${Date.now()}`;
}

/**
 * Find user by email
 */
export async function findByEmail(email) {
  const users = await getUsersFromSheet();
  return users.find(u => u.email && u.email.toLowerCase() === email.toLowerCase()) || null;
}

/**
 * Find user by ID
 */
export async function findById(id) {
  const users = await getUsersFromSheet();
  return users.find(u => u.id === id) || null;
}

/**
 * Create a new user (local registration)
 */
export async function createUser({ name, email, password }) {
  const sheets = await getSheetsClient();
  if (!sheets) throw new Error('Database connection failed');

  // Check if email already exists
  const existing = await findByEmail(email);
  if (existing) {
    throw new Error('Email already registered');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);

  const newUser = {
    id: generateUserId(),
    name,
    email: email.toLowerCase(),
    password_hash,
    provider: 'local',
    google_id: '',
    created_at: new Date().toISOString()
  };

  const newRow = [
    newUser.id,
    newUser.name,
    newUser.email,
    newUser.password_hash,
    newUser.provider,
    newUser.google_id,
    newUser.created_at
  ];

  // Append to Google Sheet
  await sheets.spreadsheets.values.append({
    spreadsheetId: getSheetId(),
    range: 'Users!A:G',
    valueInputOption: 'USER_ENTERED',
    resource: { values: [newRow] }
  });

  console.log(`[UserService] Created user: ${newUser.email}`);
  
  // Return user without password
  const { password_hash: _, ...safeUser } = newUser;
  return safeUser;
}

/**
 * Create or get user from Google OAuth
 */
export async function findOrCreateGoogleUser({ name, email, googleId }) {
  const sheets = await getSheetsClient();
  if (!sheets) throw new Error('Database connection failed');

  let user = await findByEmail(email);
  
  if (user) {
    // If user exists but has no google_id, update it (Simple implementation: just return existing)
    // For a full implementation, you would need an updateRow function similar to products
    const { password_hash: _, ...safeUser } = user;
    return safeUser;
  }

  // Create new user from Google
  const newUser = {
    id: generateUserId(),
    name,
    email: email.toLowerCase(),
    password_hash: '', // No password
    provider: 'google',
    google_id: googleId,
    created_at: new Date().toISOString()
  };

  const newRow = [
    newUser.id,
    newUser.name,
    newUser.email,
    newUser.password_hash,
    newUser.provider,
    newUser.google_id,
    newUser.created_at
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: getSheetId(),
    range: 'Users!A:G',
    valueInputOption: 'USER_ENTERED',
    resource: { values: [newRow] }
  });

  console.log(`[UserService] Created Google user: ${newUser.email}`);
  
  const { password_hash: _, ...safeUser } = newUser;
  return safeUser;
}

/**
 * Verify user password
 */
export async function verifyPassword(user, password) {
  if (!user.password_hash) return false;
  return bcrypt.compare(password, user.password_hash);
}

/**
 * Get all users (for Admin dashboard)
 */
export async function getAllUsers() {
  const users = await getUsersFromSheet();
  return users.map(({ password_hash: _, ...user }) => user);
}