import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {findUserByUsername, addUser} from '../models/user-model.js';
import 'dotenv/config';

const postLogin = async (req, res, next) => {
  console.log('postLogin', req.body);
  const user = await findUserByUsername(req.body.username);
  if (!user) {
    const newError = new Error('No user was found!');
    newError.status = 401;
    return next(newError);
  }

  console.log('Password hash exists:', !!user.password);

  const passwordMatch = await bcrypt.compare(req.body.password, user.password);

  if (!passwordMatch) {
    const newError = new Error("Password doesn't match");
    newError.status = 401;
    return next(newError);
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

const getMe = async (req, res, next) => {
  console.log('getMe', res.locals.user);

  if (!res.locals.user) {
    const newError = new Error('User was not found');
    newError.status = 401;
    return next(newError);
  }

  res.json({message: 'token ok', user: res.locals.user});
};

const postUser = async (req, res, next) => {
  console.log('request', req.body);

  if (!req.body) {
    const error = new Error('No user data!');
    error.status = 400;
    return next(error);
  }

  const {name, username, email, password} = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const userId = await addUser({
    name,
    username,
    email,
    password: hashedPassword,
    role: 'user',
  });

  if (userId.error) {
    return next(new Error(userId.error));
  }

  res.status(201).json({message: 'User added succesfully', User: userId});
};

const postLogout = (req, res) => {
  res.json({message: 'Logout successfull!'});
};

export {postLogin, getMe, postUser, postLogout};
