import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {findUserByUsername, addUser} from '../models/user-model.js';
import 'dotenv/config';

const postLogin = async (req, res) => {
  console.log('postLogin', req.body);
  const user = await findUserByUsername(req.body.username);
  if (!user) {
    res.sendStatus(401);
    return;
  }

  console.log('Password hash exists:', !!user.password);

  const passwordMatch = await bcrypt.compare(req.body.password, user.password);

  if (!passwordMatch) {
    res.sendStatus(401);
    return;
  }

  const userWithNoPassword = {
    user_id: user.user_id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
  res.json({user: userWithNoPassword, token});
};

const getMe = async (req, res) => {
  console.log('getMe', res.locals.user);
  if (res.locals.user) {
    res.json({message: 'token ok', user: res.locals.user});
  } else {
    res.sendStatus(401);
  }
};

const postUser = async (req, res) => {
  console.log('request', req.body);

  const {name, username, email, passwd} = req.body;

  const hashedPassword = await bcrypt.hash(passwd, 10);

  const userId = await addUser({
    name,
    username,
    email,
    password: hashedPassword,
    role: 'user',
  });

  if (!userId) {
    return res.status(400).json({message: 'user registeration failed!'});
  }

  res.status(201).json({message: 'User added succesfully', User: userId});
};

const postLogout = (req, res) => {
  res.json({message: 'Logout successfull!'});
};

export {postLogin, getMe, postUser, postLogout};
