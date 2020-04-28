import express, { Application } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';

export default (app: Application) => {
  app.use(compression());
  app.use(cors());
  app.use(helmet());
  app.use(cookieParser());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};
