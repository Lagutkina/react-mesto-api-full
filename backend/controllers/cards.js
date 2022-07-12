const Card = require("../models/card");

const BadRequestError = require("../errors/bad-request-err");
const NotFoundError = require("../errors/not-found-err");
const ForbiddenError = require("../errors/forbidden-err");
// возвращаем все карточки
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

// создаем карточку
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id }) // добавляем айди оунера
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        throw new BadRequestError("Переданы некорректные данные");
      } else {
        throw err;
      }
    })
    .catch(next);
};

// удаляем карточку по айди
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Карточка не найдена");
      } else if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError("Вы не можете удалить чужую карточку");
      } else {
        return Card.findByIdAndRemove(req.params.cardId).then((c) =>
          res.send(c)
        );
      }
    })
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        throw new NotFoundError("Карточка не найдена");
      } else {
        throw err;
      }
    })
    .catch(next);
};

// ставим карточке лайк
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Карточка не найдена");
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        throw new BadRequestError("Переданы некорректные данные");
      } else {
        throw err;
      }
    })
    .catch(next);
};
// удаляем карточке лайк
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать айди из множества
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Карточка не найдена");
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        throw new BadRequestError("Переданы некорректные данные");
      } else {
        throw err;
      }
    })
    .catch(next);
};
