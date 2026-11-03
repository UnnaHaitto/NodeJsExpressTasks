import {userItems, getUserById} from '../models/user-model.js';

const getAllUsers = (req, res) => {
  res.json(userItems);
};

const getUserById = (req, res) => {
  const id = Number(req.param.id);

  const user = getUserById(id);

  if (!user) {
    return res.status(404).json({message: 'The user was not found!'});
  }

  res.json(user);
};

export {getAllUsers, getUserById};
