const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();
const {
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
  getCurrentUser,
  logout,
} = require('../controllers/users');
const authMiddleware = require('../middlewares/auth');

const urlRegex = /^https?:\/\/[^\s/$.?#]+\.[^\s]*$/;

router.get('/users', getUsers);

router.get('/users/me', authMiddleware, getCurrentUser);

router.patch(
  '/users/me',
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().min(2).max(30).required(),
        about: Joi.string().min(2).max(30).required(),
      }),
  }),
  updateUserProfile,
);

router.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object()
      .keys({
        avatar: Joi.string().regex(urlRegex).required(),
      }),
  }),
  updateUserAvatar,
);

router.get(
  '/users/:userId',
  celebrate({
    params: Joi.object()
      .keys({
        userId: Joi.string().hex().length(24).required(),
      }),
  }),
  getUserById,
);

router.get('/signout', logout);

module.exports = router;
