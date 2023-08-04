const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const CustomError = require('../errors/custom-err');
const UnauthorizedError = require('../errors/unauthorized-err');

const CREATED_SUCCESSFULLY = 201;
const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    return next(error);
  }
};

const getUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('Пользователь с указанным _id не найден');
    }
    return res.json(user);
  } catch (error) {
    if (error.name === 'CastError') {
      return next(new CustomError('Некорректный формат _id пользователя'));
    }
    return next(error);
  }
};

const createUser = async (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    });

    user.password = undefined;
    return res.status(CREATED_SUCCESSFULLY).json(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(
        new CustomError('Переданы некорректные данные при регистрации'),
      );
    }
    return next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      throw new NotFoundError('Пользователь с указанным _id не найден');
    }
    return res.json(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(
        new CustomError('Ошибка валидации данных при обновлении профиля'),
      );
    }
    return next(error);
  }
};

const updateUserAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      throw new NotFoundError('Пользователь с указанным _id не найден');
    }
    return res.json(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(
        new CustomError('Ошибка валидации данных при обновлении аватара'),
      );
    }
    return next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }

    const payload = { _id: user._id };

    const token = jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '1w' });

    res.cookie('jwt', token, { httpOnly: true, maxAge: 604800000, sameSite: true });

    return res.send({ message: 'Всё верно!', user });
  } catch (error) {
    return next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie('jwt');
    return res.send({ message: 'Выход' });
  } catch (error) {
    return next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.user._id);
    if (!currentUser) {
      throw new NotFoundError('Пользователь не найден');
    }
    return res.json(currentUser);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
  getCurrentUser,
  logout,
};
