import express from 'express';
import {
  getAllUsers,
  getUserById,
  deleteUser,
  setUser,
  postUser,
} from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.route('/').get(getAllUsers).post(postUser);

userRouter.route('/:id').get(getUserById).delete(deleteUser).put(setUser);

export default userRouter;
