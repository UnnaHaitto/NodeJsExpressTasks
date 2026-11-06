import promisePool from '../../utils/database';

const getUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_users');
  console.log('rows: ', rows);
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE user_id = ?',
    [id]
  );
  console.log('rows: ', rows);
  if (rows.length === 0) {
    return false;
  }

  return rows[0];
};

const removeUser = async (id) => {
  const [rows] = await promisePool.execute(
    'DELET FROM wsk_users WHERE user_id = ?',
    [id]
  );

  if (rows.length === 0) {
    return false;
  }

  return {message: 'Success!'};
};

const addUser = async (user) => {
  const {name, username, email, password} = user;

  const sql =
    'INSERT INTO wsk_users (name, username, email, password) VALUES (?, ?, ?, ?)';

  const values = [name, username, email, password];

  const [rows] = await promisePool.execute(sql, values);

  console.log('rows: ', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }

  return {user_id: rows[0].insertId};
};

const putUser = async (id, content) => {
  const sql = promisePool.format('UPDATE wsk_users SET ? WHERE user_id = ?', [
    content,
    id,
  ]);

  const [rows] = await promisePool.execute(sql);

  if (rows[0].affectedRows === 0) {
    return false;
  }

  return {message: 'success'};
};

export {getUsers, findUserById, removeUser, putUser, addUser};
