import {
  userItems,
  findUserById,
  removeUser,
  putUser,
  addUser,
} from '../models/user-model.js';

const getAllUsers = (req, res) => {
  res.json(userItems);
};

const getUserById = (req, res) => {
  const id = Number(req.params.id);

  const user = findUserById(id);

  if (!user) {
    return res.status(404).json({message: 'The user was not found!'});
  }

  res.json(user);
};

const deleteUser = (req, res) => {
  const removed = removeUser(Number(req.params.id));

  if (removed) {
    res.json({message: 'user item deleted.'});
  } else {
    res.status(404).json({message: 'The user was not found'});
  }
};

const setUser = (req, res) => {
  const set = putUser(Number(req.params.id), req.body);

  if (set) {
    res.json({message: 'User item updated.'});
  } else {
    res.status(404).json({message: 'User was not found.'});
  }
};

const postUser = (req, res) => {
  console.log('request', req.body);

  const userId = addUser(req.body);

  res.status(201).json({message: 'User added succesfully', User: userId});
};

export {getAllUsers, getUserById, deleteUser, setUser, postUser};
