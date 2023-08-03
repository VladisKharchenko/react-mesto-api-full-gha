const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.jwt;

  try {
    const payload = await jwt.verify(token, 'some-secret-key');
    req.user = payload;
    return next();
  } catch (error) {
    return next(new UnauthorizedError('Неверный токен авторизации'));
  }
};

module.exports = authMiddleware;
