require('dotenv').config();
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

const { NODE_ENV, JWT_SECRET } = process.env;

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.jwt;

  try {
    const payload = await jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    req.user = payload;
    return next();
  } catch (error) {
    return next(new UnauthorizedError('Неверный токен авторизации'));
  }
};

module.exports = authMiddleware;
