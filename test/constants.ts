import * as dotenv from 'dotenv';
dotenv.config({ path: './env/dev.env' });

export const database = process.env.MONGO_DB;