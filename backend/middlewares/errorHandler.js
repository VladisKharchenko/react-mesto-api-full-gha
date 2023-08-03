// eslint-disable-next-line
const handleErrors = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;

  if (err.code === 11000) {
    statusCode = 409;
    message = 'Пользователь с таким email уже существует';
  }

  res.status(statusCode).send({ message, err });
};

module.exports = handleErrors;
