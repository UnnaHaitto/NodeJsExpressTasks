import express from 'express';
import {
  postLogin,
  getMe,
  postUser,
  postLogout,
} from '../controllers/auth-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {body} from 'express-validator';
import {validationErrors} from '../middlewares/error-handlers.js';

const authRouter = express.Router();

authRouter
  .route('/login')
  .post(
    body('username')
      .trim()
      .notEmpty()
      .isLength({min: 3, max: 20})
      .isAlphanumeric(),
    body('password').notEmpty(),
    validationErrors,
    postLogin
  );

authRouter
  .route('/register')
  .post(
    body('name').trim().notEmpty(),
    body('email').trim().notEmpty().isEmail(),
    body('username')
      .trim()
      .notEmpty()
      .isLength({min: 3, max: 20})
      .isAlphanumeric(),
    body('password').notEmpty().isLength({min: 8}),
    validationErrors,
    postUser
  );

authRouter.route('/me').get(authenticateToken, getMe);
authRouter.route('/logout').get(authenticateToken, postLogout);

export default authRouter;
