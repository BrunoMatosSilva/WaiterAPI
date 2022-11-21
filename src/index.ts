import path from 'node:path';
import http from 'node:http';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Server } from 'socket.io';

import { router } from './router';

dotenv.config();
const app = express();
const serverHttp = http.createServer(app);
export const io = new Server(serverHttp);

mongoose.connect(`${process.env.MONGODB_URL}`)
  .then(() => {

    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');
      next();
    });
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

    serverHttp.listen(3001, () => {
      console.log('🚀Server is running na PORT 3000');
    });
  })
  .catch(() => console.log('Erro ao conectar no mongodb!'));


