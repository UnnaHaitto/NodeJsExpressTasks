import {
  findCatById,
  addCat,
  removeCat,
  modifyCat,
  listAllCats,
  catByUserId,
  getCatUserId,
} from '../models/cat-model.js';

const getAllCats = async (req, res) => {
  //console.log('ollaan nyt controllerissa');

  try {
    const cats = await listAllCats();
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

  if (user_id !== cat.owner) {
    return res
      .status(403)
      .json({message: 'You do not have access to this cat.'});
  }

  if (!cat) {
    return res.status(404).json({message: 'Kissaa ei löytynyt!'});
  }

  res.json(cat);
};

const postCat = async (req, res) => {
  console.log('request', req.file);
  console.log('request', req.body);
  //console.log(req.file.filename);
  req.body.filename = req.file ? req.file.filename : req.body.filename;

  const result = await addCat(req.body);
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
  const user_id = res.locals.user.user_id;

  const cats_user_id = await getCatUserId(Number(req.params.id));

  if (user_id !== cats_user_id) {
    return res
      .status(403)
      .json({message: 'You do not have access to this cat.'});
  }

  const result = await removeCat(Number(req.params.id));
  if (result) {
    res.json({message: 'Kissa poistettu'});
  } else {
    res.status(404).json({message: 'Kissaa ei löytynyt!'});
  }
};

const putCat = async (req, res) => {
  const user_id = res.locals.user.user_id;

  const cats_user_id = await getCatUserId(Number(req.params.id));

  if (user_id !== cats_user_id) {
    return res
      .status(403)
      .json({message: 'You do not have access to this cat.'});
  }

  // in real life, all input data (req.body) should be validated before using it
  const result = await modifyCat(Number(req.params.id), req.body);
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
