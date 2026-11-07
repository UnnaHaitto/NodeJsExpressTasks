import {
  findCatById,
  addCat,
  removeCat,
  modifyCat,
  listAllCats,
  catByUserId,
} from '../models/cat-model.js';

const getAllCats = async (req, res) => {
  //console.log('ollaan nyt controllerissa');

  const role = res.locals.user.role;

  const user_id = res.locals.user.user_id;

  try {
    const cats = await listAllCats(role, user_id);
    res.json(cats);
  } catch (error) {
    console.error('Error fetching cats: ', error);
    res.status(500).json({message: 'Error while fetching cats'});
  }

  // esimerkki siitä että middleware on muokannut req-oliota
  /*
  res.json({
    message: 'Kaikki kissat',
    time: req.requestTime,
    cats: cats,
  });*/
};

const getCatById = async (req, res) => {
  const user_id = res.locals.user.user_id;

  const cat = await findCatById(req.params.id);

  if (!cat) {
    return res.status(404).json({message: 'Kissaa ei löytynyt!'});
  }

  if (user_id !== cat.owner) {
    return res
      .status(403)
      .json({message: 'You do not have access to this cat.'});
  }

  res.json(cat);
};

const postCat = async (req, res) => {
  console.log('request', req.file);
  console.log('request', req.body);
  //console.log(req.file.filename);
  req.body.filename = req.file ? req.file.filename : req.body.filename;

  const role = res.locals.user.role;

  const user_id = res.locals.user.user_id;

  const result = await addCat(req.body, user_id, role);
  if (result) {
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
  //const id = addCat(req.body);
  //res.status(201).json({message: 'Kissa lisätty', cat_id: id});
};

const deleteCat = async (req, res) => {
  const role = res.locals.user.role;

  const user_id = res.locals.user.user_id;

  const result = await removeCat(Number(req.params.id), user_id, role);
  if (result) {
    res.json({message: 'Kissa poistettu'});
  } else {
    res.status(404).json({message: 'Kissaa ei löytynyt!'});
  }
};

const putCat = async (req, res) => {
  const role = res.locals.user.role;

  const user_id = res.locals.user.user_id;

  // in real life, all input data (req.body) should be validated before using it
  const result = await modifyCat(
    Number(req.params.id),
    req.body,
    user_id,
    role
  );
  if (result) {
    res.json({message: 'Cat updated!'});
  } else {
    res.status(404).json({error: 404, message: 'Not found.'});
  }
};

const getCatByUserId = async (req, res) => {
  const user_id = res.locals.user.user_id;

  const given_user_id = Number(req.params.userId);

  if (user_id !== given_user_id) {
    return res
      .status(403)
      .json({message: "You do not have access to this/these cat('s)."});
  }

  const cat = await catByUserId(given_user_id);

  if (!cat) {
    return res.status(404).json({message: 'No cats found by that user id'});
  }

  res.json(cat);
};

export {getAllCats, getCatById, postCat, deleteCat, putCat, getCatByUserId};
