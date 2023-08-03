const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const urlRegex = /^https?:\/\/[^\s/$.?#]+\.[^\s]*$/;

router.get('/cards', getCards);

router.post(
  '/cards',
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().min(2).max(30).required(),
        link: Joi.string().required().regex(urlRegex),
      }),
  }),
  createCard,
);

router.delete(
  '/cards/:cardId',
  celebrate({
    params: Joi.object()
      .keys({
        cardId: Joi.string().hex().length(24).required(),
      }),
  }),
  deleteCard,
);

router.put(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object()
      .keys({
        cardId: Joi.string().hex().length(24).required(),
      }),
  }),
  likeCard,
);

router.delete(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object()
      .keys({
        cardId: Joi.string().hex().length(24).required(),
      }),
  }),
  dislikeCard,
);

module.exports = router;
