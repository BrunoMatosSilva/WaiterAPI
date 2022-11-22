import path from 'node:path';
import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

import { router } from './router';

dotenv.config();
const app = express();

mongoose.connect(`${process.env.MONGODB_URL}`)
  .then(() => {
    const PORT = process.env.PORT;

    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');
      next();
    });
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

    app.listen(PORT, () => {
      console.log(`🚀Server is running na PORT ${PORT}!`);
    });
  })
  .catch(() => console.log('Erro ao conectar no mongodb!'));


