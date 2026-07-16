import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Construct DATABASE_URL from env or build it dynamically
const dbUser = process.env.DB_USERNAME || 'postgres';
const dbPassword = encodeURIComponent(process.env.DB_PASSWORD || '');
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '5432';
const dbName = process.env.DB_NAME || 'postgres';

const DATABASE_URL = process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Database URL: ${DATABASE_URL.replace(/:([^@:]+)@/, ':****@')}`);
});
