const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

console.log(process.env.NODE_ENV);
const bodyParser = require("body-parser"); // JSON middelware
const { errors } = require("celebrate");
const auth = require("./middlewares/auth");
const cors = require("./middlewares/cors");
const users = require("./routes/users");
const cards = require("./routes/cards");
const { login, createUser } = require("./controllers/users");
const {
  createUserValidation,
  loginValidation,
} = require("./middlewares/validation");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3001 } = process.env;
const app = express(); // заводим сервер

mongoose.connect("mongodb://localhost:27017/mestodb"); // подключаемся к  БД

app.use(bodyParser.urlencoded({ extended: false })); // express понимает JSON запросы
app.use(bodyParser.json()); // express понимает JSON запросы

app.use(cors); // cors миддлвара
app.use(requestLogger); // логер запросов
app.post("/signin", loginValidation, login); // роут логина
app.post("/signup", createUserValidation, createUser); // роут регистрации

// авторизация
app.use(auth);
app.use("/users", users); // подключение роута для users
app.use("/cards", cards); // подключение роута для cards

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate
app.use((err, req, res, next) => {
  // обработчик ошибок
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log("its a day ");
});
