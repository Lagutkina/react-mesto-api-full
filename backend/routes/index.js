const router = require('express').Router();
const users = require('./users');
const cards = require('./cards');
const auth = require('../middlewares/auth');
const {
  createUserValidation,
  loginValidation,
} = require('../middlewares/validation');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/not-found-err');

router.post('/signin', loginValidation, login); // роут логина
router.post('/signup', createUserValidation, createUser); // роут регистрации

// авторизация
router.use('/users', auth, users); // подключение роута для users
router.use('/cards', auth, cards); // подключение роута для cards

router.use('/', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
