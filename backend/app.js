const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const bodyParser = require('body-parser'); // JSON middelware
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');

const { PORT = 3001 } = process.env;
const app = express(); // заводим сервер

mongoose.connect('mongodb://localhost:27017/mestodb'); // подключаемся к  БД

app.use(bodyParser.urlencoded({ extended: false })); // express понимает JSON запросы
app.use(bodyParser.json()); // express понимает JSON запросы

app.use(cors); // cors миддлвара
app.use(requestLogger); // логер запросов
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
}); // Краш-тест сервера
app.use(routes); // роуты всех страничек

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate
app.use((err, req, res, next) => {
  // обработчик ошибок
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('its a day ');
});
