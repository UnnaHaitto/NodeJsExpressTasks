import promisePool from '../../utils/database.js';

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
  const connection = await promisePool.getConnection();

  try {
    await connection.beginTransaction();
    await connection.execute('DELETE FROM wsk_cats WHERE owner = ?;', [id]);
    const sql = connection.format('DELETE FROM wsk_users WHERE user_id = ?;', [
      id,
    ]);

    const [result] = await connection.execute(sql);

    if (result.affectedRows === 0) {
      await connection.rollback();
      return {message: 'User not deleted!'};
    }

    await connection.commit();

    return {message: 'User deleted'};
  } catch (error) {
    await connection.rollback();
    console.log('Error: ', error.message);
    return {message: error.message};
  } finally {
    connection.release();
  }
};

const addUser = async (user) => {
  const {name, username, email, password, role} = user;

  const sql =
    'INSERT INTO wsk_users (name, username, email, password, role) VALUES (?, ?, ?, ?, ?)';

  const values = [name, username, email, password, role];

  const [rows] = await promisePool.execute(sql, values);

  console.log('rows: ', rows);
  if (rows.affectedRows === 0) {
    return false;
  }

  return {user_id: rows.insertId};
};

const putUser = async (id, content) => {
  const sql = promisePool.format('UPDATE wsk_users SET ? WHERE user_id = ?', [
    content,
    id,
  ]);

  const [rows] = await promisePool.execute(sql);

  if (rows.affectedRows === 0) {
    return false;
  }

  return {message: 'success'};
};

const findUserByUsername = async (user) => {
  const sql = 'SELECT * FROM wsk_users WHERE username = ?';

  const value = [user];

  const [rows] = await promisePool.execute(sql, value);

  if (rows.length === 0) {
    return false;
  }

  return rows[0];
};

export {
  getUsers,
  findUserById,
  removeUser,
  putUser,
  addUser,
  findUserByUsername,
};
