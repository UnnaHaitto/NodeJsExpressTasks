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

  if (!removed) {
    return res.status(404).json({message: 'The user was not found'});
  } else {
    return res.status(201).json({message: 'User item deleted.'});
  }
};

const setUser = (req, res) => {
  const set = putUser(req.params.id);

  if (!set) {
    return res.status(404).json({message: 'New user data not found'});
  } else {
    return res.status(201).json({message: 'User item updated.'});
  }
};

const postUser = (req, res) => {
  const userId = addUser(req.body);

  return res
    .status(201)
    .json({message: 'User added succesfully', User: userId});
};

export {getAllUsers, getUserById, deleteUser, setUser, postUser};
