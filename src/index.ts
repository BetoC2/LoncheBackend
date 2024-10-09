import express from 'express';
import routes from './routes';

import { config } from 'dotenv';
import { connectDB } from './config/db';

config();
connectDB();

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
