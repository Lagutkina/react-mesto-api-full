const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const validator = require('validator');
const NotFoundError = require('../errors/not-found-err');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь океана',
  },
  avatar: {
    type: String,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: () => 'Некорректный формат данных', // фиг знает работает ли это
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false, // запрещаем возвращать пароль
  },
});
// метод схемы для проверки логина
// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password') // даем взять хэш пароля для проверки логина
    .then((user) => {
      if (!user) {
        // юзер не найден
        return Promise.reject(
          new NotFoundError('Неправильные почта или пароль'),
        );
      }
      // юзер найден, сравниваем пароли
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new NotFoundError('Неправильные почта или пароль'),
          );
        }

        return user; // возвращаем юзера, так как все совпало
      });
    });
};
module.exports = mongoose.model('user', userSchema);
