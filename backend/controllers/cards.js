const Card = require('../models/card');
const CustomError = require('../errors/custom-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

const CREATED_SUCCESSFULLY = 201;

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find().sort({ createdAt: -1 });
    return res.json(cards);
  } catch (error) {
    return next(error);
  }
};

const createCard = async (req, res, next) => {
  const { name, link } = req.body;
  const { _id: owner } = req.user;
  try {
    const card = await Card.create({ name, link, owner });
    return res.status(CREATED_SUCCESSFULLY).json(card);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(
        new CustomError('Переданы некорректные данные при создании карточки'),
      );
    }
    return next(error);
  }
};

const deleteCard = async (req, res, next) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findById(cardId);
    if (!card) {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    }
    if (card.owner.toString() !== req.user._id) {
      throw new ForbiddenError('У вас нет прав для удаления этой карточки');
    }
    await card.deleteOne();
    return res.json({ message: 'Карточка успешно удалена' });
  } catch (error) {
    if (error.name === 'CastError') {
      return next(
        new CustomError('Переданы некорректные данные для удаления карточки'),
      );
    }
    return next(error);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Передан несуществующий _id карточки');
    }
    return res.json(card);
  } catch (error) {
    if (error.name === 'CastError') {
      return next(
        new CustomError('Переданы некорректные данные для постановки лайка'),
      );
    }
    return next(error);
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Передан несуществующий _id карточки');
    }
    return res.json(card);
  } catch (error) {
    if (error.name === 'CastError') {
      return next(
        new CustomError('Переданы некорректные данные для снятия лайка'),
      );
    }
    return next(error);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
