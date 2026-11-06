import {
  getUsers,
  findUserById,
  removeUser,
  putUser,
  addUser,
} from '../models/user-model.js';

const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users: ', error);
    res.status(500).json({message: 'Error fetching users'});
  }
};

const getUserById = async (req, res) => {
  const id = Number(req.params.id);

  const user = await findUserById(id);

  if (!user) {
    return res.status(404).json({message: 'The user was not found!'});
  }

  res.json(user);
};

const deleteUser = async (req, res) => {
  const removed = await removeUser(Number(req.params.id));

  if (removed) {
    res.json({message: 'user item deleted.'});
  } else {
    res.status(404).json({message: 'The user was not found'});
  }
};

const setUser = async (req, res) => {
  const set = await putUser(Number(req.params.id), req.body);

  if (set) {
    res.json({message: 'User item updated.'});
  } else {
    res.status(404).json({message: 'User was not found.'});
  }
};

const postUser = async (req, res) => {
  console.log('request', req.body);

  const userId = await addUser(req.body);

  res.status(201).json({message: 'User added succesfully', User: userId});
};

export {getAllUsers, getUserById, deleteUser, setUser, postUser};
