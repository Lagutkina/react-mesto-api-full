const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');
const {
  getUserByIdValidation,
  updateUserValidation,
  updateUserAvatarValidation,
} = require('../middlewares/validation');
// возвращаем всех юзеров
router.get('/', getUsers);

// обновления профиля - name & about
router.patch('/me', updateUserValidation, updateUser);

// обновление аватара
router.patch('/me/avatar', updateUserAvatarValidation, updateUserAvatar);
// возвращаем текущего юзера
router.get('/me', getCurrentUser);
// возвращем юзера по айди
router.get('/:userId', getUserByIdValidation, getUserById);
module.exports = router;
