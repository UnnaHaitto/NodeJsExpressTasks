import express from 'express';
import {
  postLogin,
  getMe,
  postUser,
  postLogout,
} from '../controllers/auth-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';

const authRouter = express.Router();

authRouter.route('/login').post(postLogin);
authRouter.route('/register').post(postUser);
authRouter.route('/me').get(authenticateToken, getMe);
authRouter.route('/logout').get(authenticateToken, postLogout);

export default authRouter;
