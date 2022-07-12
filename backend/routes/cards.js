const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  createCardValidation,
  deleteCardValidation,
  likeCardValidation,
  dislikeCardValidation,
} = require('../middlewares/validation');

// возвращаем все карточки
router.get('/', getCards);

// создаем карточку
router.post('/', createCardValidation, createCard);

// удаляем карточку по айди
router.delete('/:cardId', deleteCardValidation, deleteCard);

// ставим карточке лайк

router.put('/:cardId/likes', likeCardValidation, likeCard);

// удаляем карточке лайк
router.delete('/:cardId/likes', dislikeCardValidation, dislikeCard);

module.exports = router;
