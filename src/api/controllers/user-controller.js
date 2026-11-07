import {
  getUsers,
  findUserById,
  removeUser,
  putUser,
} from '../models/user-model.js';
import bcrypt from 'bcrypt';

const getAllUsers = async (req, res) => {
  try {
    const role = res.locals.user.role;

    if (role !== 'admin') {
      return res
        .status(403)
        .json({message: 'This function is only accessible by admins'});
    }

    const users = await getUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users: ', error);
    res.status(500).json({message: 'Error fetching users'});
  }
};

const getUserById = async (req, res) => {
  const role = res.locals.user.role;

  const user_id = res.locals.user.user_id;

  const id = Number(req.params.id);

  if (user_id !== id && role !== 'admin') {
    return res
      .status(403)
      .json({message: 'You do not have access to this user.'});
  }

  try {
    const user = await findUserById(id);

    if (!user) {
      return res.status(404).json({message: 'The user was not found!'});
    }

    res.json(user);
  } catch (error) {
    console.log('Error fetching users: ', error);
    return res.status(500).json({message: 'Error fetching users'});
  }
};

const deleteUser = async (req, res) => {
  const role = res.locals.user.role;

  const user_id = res.locals.user.user_id;

  const id = Number(req.params.id);

  if (user_id !== id && role !== 'admin') {
    return res
      .status(403)
      .json({message: 'You do not have access to this user.'});
  }

  const removed = await removeUser(id);

  if (removed) {
    res.json({message: 'user item deleted.'});
  } else {
    res.status(404).json({message: 'The user was not found'});
  }
};

const setUser = async (req, res) => {
  const role = res.locals.user.role;

  const user_id = res.locals.user.user_id;

  const id = Number(req.params.id);

  if (user_id !== id && role !== 'admin') {
    return res
      .status(403)
      .json({message: 'You do not have access to this user.'});
  }

  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }

  const set = await putUser(id, req.body);

  if (set) {
    res.json({message: 'User item updated.'});
  } else {
    res.status(404).json({message: 'User was not found.'});
  }
};

export {getAllUsers, getUserById, deleteUser, setUser};
