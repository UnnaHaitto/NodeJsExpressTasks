import express from 'express';
import {
  getAllUsers,
  getUserById,
  deleteUser,
  setUser,
} from '../controllers/user-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';

const userRouter = express.Router();

userRouter.route('/').get(authenticateToken, getAllUsers);

userRouter
  .route('/:id')
  .get(authenticateToken, getUserById)
  .delete(authenticateToken, deleteUser)
  .put(authenticateToken, setUser);

export default userRouter;
