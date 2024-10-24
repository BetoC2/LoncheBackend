import express from 'express';
import { config } from 'dotenv';
import { connectDB } from './config/db';
import cors from 'cors';
import routes from './routes';
import cookieParser from 'cookie-parser';

config();
connectDB();

const app = express();
const port = process.env.PORT ?? 3000;

app.disable('x-powered-by');

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Uso de CORS
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser(process.env.SECRET_COOKIE_KEY as string));
app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
