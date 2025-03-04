import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import indexRouter from './routes/index.js';
import uploadRouter from './routes/uploadRouter.js';
import userRouter from './routes/userRouter.js';
import postRouter from './routes/postRouter.js';
import commentRouter from './routes/commentRouter.js';
import likeRouter from './routes/likeRouter.js';
import followerRouter from './routes/followerRouter.js';
import cors from 'cors';

const app = express();
dotenv.config();

// Define __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const uploadsFolder = path.join(__dirname, 'uploads');

// view engine setup
app.set('view engine', 'jade');

// middleware
app.use(cors());
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', userRouter);
app.use('/api', indexRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
app.use('/api/likes', likeRouter);
app.use('/api/followers', followerRouter);

// static files
app.use('/uploads', express.static(uploadsFolder));

if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(`error ${err.status}`);
});

export default app;
