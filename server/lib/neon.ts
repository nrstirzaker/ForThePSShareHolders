import { neon } from '@neondatabase/serverless';
const url : string = process.env.DATABASE_URL || 'localhost';
export const sql = neon(url);