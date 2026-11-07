// Note: db functions are async and must be called with await from the controller
// How to handle errors in controller?
import promisePool from '../../utils/database.js';

const listAllCats = async () => {
  const [rows] = await promisePool.query(
    'SELECT wsk_cats.*, wsk_users.name FROM wsk_cats INNER JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id'
  );

  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows;
};

const findCatById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT wsk_cats.*, wsk_users.name FROM wsk_cats INNER JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id WHERE wsk_cats.cat_id = ?',
    [id]
  );

  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addCat = async (cat) => {
  const {cat_name, weight, owner, filename, birthdate} = cat;
  const sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [cat_name, weight, owner, filename, birthdate];
  const rows = await promisePool.execute(sql, params);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {cat_id: rows[0].insertId};
};

const modifyCat = async (id, cat, currentUserId) => {
  const sql = promisePool.format(
    `UPDATE wsk_cats SET ? WHERE cat_id = ? AND owner = ?`,
    [cat, id, currentUserId]
  );
  const rows = await promisePool.execute(sql);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const removeCat = async (id, currentUserId) => {
  const [rows] = await promisePool.execute(
    'DELETE FROM wsk_cats WHERE cat_id = ? AND owner = ?',
    [id, currentUserId]
  );
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
