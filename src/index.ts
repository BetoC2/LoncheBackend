import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import { config } from 'dotenv';
config();

import swaggerConfig from './../swagger.config';
import routes from './routes';

import { connectDB } from './config/db';

connectDB();

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use(routes);

const swaggerDocs = swaggerJSDoc(swaggerConfig);
app.use('/swagger', serve, setup(swaggerDocs));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
