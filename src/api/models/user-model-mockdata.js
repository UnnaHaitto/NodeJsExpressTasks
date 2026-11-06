const userItems = [
  {
    user_id: 3609,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@metropolia.fi',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 2001,
    name: 'Matti Doe',
    username: 'mattidoe',
    email: 'matti@metropolia.fi',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 1999,
    name: 'John Joke',
    username: 'johnjoke',
    email: 'john@metropolia.fi',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 900,
    name: 'Maija Doe',
    username: 'maijadoe',
    email: 'Maija@metropolia.fi',
    role: 'user',
    password: 'password',
  },
];

const getUsers = () => {
  return userItems;
};

const findUserById = (id) => {
  return userItems.find((user) => user.user_id == id);
};

const removeUser = (id) => {
  const index = userItems.findIndex((user) => user.user_id == id);

  userItems.splice(index, 1);

  return index !== -1;
};

const addUser = (user) => {
  const {name, username, email, role, password} = user;

  const newId = userItems[0].user_id + 1;

  userItems.unshift({
    user_id: newId,
    name,
    username,
    email,
    role,
    password,
  });

  return newId;
};

const putUser = (id, content) => {
  const index = userItems.findIndex((user) => user.user_id == id);

  userItems[index] = {...userItems[index], ...content};

  return index !== -1;
};

export {userItems, getUsers, findUserById, removeUser, putUser, addUser};
