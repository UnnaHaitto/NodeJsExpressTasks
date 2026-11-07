// Note: db functions are async and must be called with await from the controller
// How to handle errors in controller?
import promisePool from '../../utils/database.js';

const listAllCats = async (role, currentUserId) => {
  let sql = '';

  if (role === 'user') {
    sql = promisePool.format(
      'SELECT wsk_cats.*, wsk_users.name AS owner_name FROM wsk_cats INNER JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id WHERE wsk_users.user_id = ?',
      [currentUserId]
    );
  } else if (role === 'admin') {
    sql =
      'SELECT wsk_cats.*, wsk_users.name AS owner_name FROM wsk_cats INNER JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id';
  }
  const [rows] = await promisePool.query(sql);

  console.log('rows', rows);
  if (rows.length === 0) {
    return rows;
  }
  return rows;
};

const findCatById = async (id, currentUserId, role) => {
  let sql = '';

  let params = [];

  if (role === 'user') {
    sql = `SELECT wsk_cats.*, wsk_users.name FROM wsk_cats INNER JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id WHERE wsk_cats.cat_id = ? AND wsk_cats.owner = ?`;

    params = [id, currentUserId];
  } else if (role === 'admin') {
    sql = `SELECT wsk_cats.*, wsk_users.name FROM wsk_cats INNER JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id WHERE wsk_cats.cat_id = ?`;

    params = [id];
  }

  const [rows] = await promisePool.execute(sql, params);

  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addCat = async (cat, currentUserId, role) => {
  const {cat_name, weight, owner, filename, birthdate} = cat;

  let sql = '';

  let params = [];

  if (role === 'user') {
    sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate) VALUES (?, ?, ?, ?, ?)`;

    params = [cat_name, weight, currentUserId, filename, birthdate];
  } else if (role === 'admin') {
    sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate) VALUES (?, ?, ?, ?, ?)`;

    params = [cat_name, weight, owner, filename, birthdate];
  }

  const [rows] = await promisePool.execute(sql, params);

  console.log('rows', rows);
  if (rows.affectedRows === 0) {
    return false;
  }

  return {cat_id: rows.insertId};
};

const modifyCat = async (id, cat, currentUserId, role) => {
  let sql = '';

  let params = [];

  if (role === 'user') {
    sql = `UPDATE wsk_cats SET ? WHERE cat_id = ? AND owner = ?`;

    params = [cat, id, currentUserId];
  } else if (role === 'admin') {
    sql = `UPDATE wsk_cats SET ? WHERE cat_id = ?`;

    params = [cat, id];
  }

  const [rows] = await promisePool.query(sql, params);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const removeCat = async (id, currentUserId, role) => {
  let sql = '';

  let params = [];

  if (role === 'user') {
    sql = 'DELETE FROM wsk_cats WHERE cat_id = ? AND owner = ?';

    params = [id, currentUserId];
  } else if (role === 'admin') {
    sql = 'DELETE FROM wsk_cats WHERE cat_id = ?';

    params = [id];
  }

  const [rows] = await promisePool.execute(sql, params);
  console.log('rows', rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const catByUserId = async (userId) => {
  const [rows] = await promisePool.execute(
    'SELECT wsk_cats.*, wsk_users.name FROM wsk_cats INNER JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id WHERE wsk_cats.owner = ?',
    [userId]
  );

  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows;
};

const getCatUserId = async (cat_id) => {
  const [rows] = await promisePool.execute(
    'SELECT owner FROM wsk_cats WHERE cat_id = ?;',
    [cat_id]
  );

  if (rows.length === 0) {
    return false;
  }

  return rows[0].owner;
};

export {
  listAllCats,
  findCatById,
  addCat,
  modifyCat,
  removeCat,
  catByUserId,
  getCatUserId,
};
