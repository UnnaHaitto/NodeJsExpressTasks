import express from 'express';
import {
  getAllUsers,
  getUserById,
  deleteUser,
  setUser,
} from '../controllers/user-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {body} from 'express-validator';
import {validationErrors} from '../middlewares/error-handlers.js';

const userRouter = express.Router();

userRouter.route('/').get(authenticateToken, getAllUsers);

userRouter
  .route('/:id')
  .get(authenticateToken, getUserById)
  .delete(authenticateToken, deleteUser)
  .put(
    authenticateToken,
    body('name').optional().trim().notEmpty(),
    body('email').optional().trim().notEmpty().isEmail(),
    body('username')
      .optional()
      .trim()
      .notEmpty()
      .isLength({min: 3, max: 20})
      .isAlphanumeric(),
    body('password').optional().notEmpty().isLength({min: 8}),
    validationErrors,
    setUser
  );
export default userRouter;
