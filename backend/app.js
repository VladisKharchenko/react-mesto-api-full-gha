const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const cors = require('cors');
const handleErrors = require('./middlewares/errorHandler');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const authMiddleware = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(cookieParser());
const port = 3000;

const urlRegex = /^https?:\/\/[^\s/$.?#]+\.[^\s]*$/;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.post(
  '/signup',
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        avatar: Joi.string().regex(urlRegex),
      }),
  }),
  createUser,
);

app.post(
  '/signin',
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }),
  }),
  login,
);

app.use(authMiddleware);

app.use('/', userRoutes);
app.use('/', cardRoutes);

app.use((req, res, next) => {
  const err = new NotFoundError('Неправильный путь');
  next(err);
});

app.use(errorLogger);

app.use(errors());

app.use(handleErrors);

app.listen(port);
