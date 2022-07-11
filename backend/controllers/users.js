const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// импортируем модуль jsonwebtoken

const User = require("../models/user");

const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request-err");
const ConflictError = require("../errors/conflict-err");

const { NODE_ENV, JWT_SECRET } = process.env; // добавляем среду
// возвращаем всех юзеров
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

// возвращем юзера по айди
module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь не найден");
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        throw new BadRequestError("Переданы некорректные данные");
      } else {
        next(err);
      }
    });
};

// создаем юзера с именем и прочими штуками
module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email } = req.body;
  // хешируем пароль
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        throw new BadRequestError("Переданы некорректные данные");
      } else if (err.code === 11000) {
        throw new ConflictError("Такой email уже зарегистрирован");
      } else {
        next(err);
      }
    });
};

// обновления профиля - name & about
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь не найден");
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        throw new BadRequestError("Переданы некорректные данные");
      } else {
        next(err);
      }
    });
};

// обновление аватара
module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь не найден");
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        throw new BadRequestError("Переданы некорректные данные");
      } else {
        next(err);
      }
    });
};

// Логинимся

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        {
          expiresIn: "7d",
        }
      );

      // вернём токен
      res.send({ token });
      // аутентификация успешна! вручаем токен пользователю
    })
    .catch(next);
};

// возвращем текущего юзера
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь не найден");
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        throw new BadRequestError("Переданы некорректные данные");
      } else {
        next(err);
      }
    });
};
