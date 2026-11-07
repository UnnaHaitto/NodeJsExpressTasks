import {
  getUsers,
  findUserById,
  removeUser,
  putUser,
} from '../models/user-model.js';
import bcrypt from 'bcrypt';

const getAllUsers = async (req, res, next) => {
  try {
    const role = res.locals.user.role;

    if (role !== 'admin') {
      const error = new Error('This function is only accessible by admins');
      error.status = 403;
      return next(error);
    }

    const users = await getUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users: ', error);

    const newError = new Error('Error fetching users');
    newError.status = 500;
    return next(newError);
  }
};

const getUserById = async (req, res, next) => {
  const role = res.locals.user.role;

  const user_id = res.locals.user.user_id;

  const id = Number(req.params.id);

  if (user_id !== id && role !== 'admin') {
    const error = new Error('You do not have access to this user.');
    error.status = 403;
    return next(error);
  }

  try {
    const user = await findUserById(id);

    if (!user) {
      const error = new Error('The user was not found!');
      error.status = 404;
      return next(error);
    }
    res.json(user);
  } catch (error) {
    console.log('Error fetching users: ', error);
    const newError = new Error('Error fetching users');
    newError.status = 500;
    return next(newError);
  }
};

const deleteUser = async (req, res, next) => {
  const role = res.locals.user.role;

  const user_id = res.locals.user.user_id;

  const id = Number(req.params.id);

  if (user_id !== id && role !== 'admin') {
    const error = new Error('You do not have access to this user.');
    error.status = 403;
    return next(error);
  }

  try {
    const removed = await removeUser(id);

    if (!removed) {
      const error = new Error('The user was not found');
      error.status = 404;
      return next(error);
    }

    res.json({message: 'user item deleted.'});
  } catch (error) {
    return next(error);
  }
};

const setUser = async (req, res, next) => {
  const role = res.locals.user.role;

  const user_id = res.locals.user.user_id;

  const id = Number(req.params.id);

  if (user_id !== id && role !== 'admin') {
    const error = new Error('You do not have access to this user.');
    error.status = 403;
    return next(error);
  }

  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }

  try {
    const set = await putUser(id, req.body);

    if (!set) {
      const error = new Error('User was not found.');
      error.status = 404;
      return next(error);
    }

    res.json({message: 'User item updated.'});
  } catch (error) {
    return next(error);
  }
};

export {getAllUsers, getUserById, deleteUser, setUser};
