import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import fs from 'fs';
import { fileURLToPath } from 'url';

import indexRouter from './routes/index.js';
import uploadRouter from './routes/uploadRouter.js';
import userRouter from './routes/userRouter.js';

const app = express();

// Define __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// view engine setup
app.set('view engine', 'jade');

// middleware
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', indexRouter);
app.use('/api', uploadRouter);
app.use('/auth', userRouter);

// static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
