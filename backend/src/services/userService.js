/**
 * User Service
 * Handles user CRUD operations for customer authentication
 */

import bcrypt from 'bcryptjs';

// In-memory user storage (mock data for development)
// In production, this would use Google Sheets or a proper database
const users = [
  {
    id: 'USR-001',
    name: 'Test User',
    email: 'test@example.com',
    password_hash: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    provider: 'local',
    created_at: new Date().toISOString()
  }
];

/**
 * Generate unique user ID
 */
function generateUserId() {
  const num = users.length + 1;
  return `USR-${String(num).padStart(3, '0')}`;
}

/**
 * Find user by email
 */
export async function findByEmail(email) {
  return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
}

/**
 * Find user by ID
 */
export async function findById(id) {
  return users.find(u => u.id === id) || null;
}

/**
 * Create a new user (local registration)
 */
export async function createUser({ name, email, password }) {
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
    created_at: new Date().toISOString()
  };

  users.push(newUser);
  console.log(`[UserService] Created user: ${newUser.email}`);
  
  // Return user without password
  const { password_hash: _, ...safeUser } = newUser;
  return safeUser;
}

/**
 * Create or get user from Google OAuth
 */
export async function findOrCreateGoogleUser({ name, email, googleId }) {
  let user = await findByEmail(email);
  
  if (user) {
    // User exists - update google ID if not set
    if (!user.google_id) {
      user.google_id = googleId;
    }
    const { password_hash: _, ...safeUser } = user;
    return safeUser;
  }

  // Create new user from Google
  const newUser = {
    id: generateUserId(),
    name,
    email: email.toLowerCase(),
    password_hash: null, // No password for Google users
    provider: 'google',
    google_id: googleId,
    created_at: new Date().toISOString()
  };

  users.push(newUser);
  console.log(`[UserService] Created Google user: ${newUser.email}`);
  
  const { password_hash: _, ...safeUser } = newUser;
  return safeUser;
}

/**
 * Verify user password
 */
export async function verifyPassword(user, password) {
  if (!user.password_hash) {
    return false;
  }
  return bcrypt.compare(password, user.password_hash);
}

/**
 * Get all users (admin function)
 */
export async function getAllUsers() {
  return users.map(({ password_hash: _, ...user }) => user);
}
