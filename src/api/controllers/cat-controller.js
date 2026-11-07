import {
  findCatById,
  addCat,
  removeCat,
  modifyCat,
  listAllCats,
  catByUserId,
} from '../models/cat-model.js';

const getAllCats = async (req, res, next) => {
  //console.log('ollaan nyt controllerissa');

  const role = res.locals.user.role;

  const user_id = res.locals.user.user_id;

  try {
    const cats = await listAllCats(role, user_id);
    res.json(cats);
  } catch (error) {
    console.error('Error fetching cats: ', error);

    const newError = new Error('Error while fetching cats!');
    newError.status = 500;
    return next(newError);
  }

  // esimerkki siitä että middleware on muokannut req-oliota
  /*
  res.json({
    message: 'Kaikki kissat',
    time: req.requestTime,
    cats: cats,
  });*/
};

const getCatById = async (req, res, next) => {
  const role = res.locals.user.role;

  const user_id = res.locals.user.user_id;

  const cat = await findCatById(req.params.id, user_id, role);

  if (!cat) {
    const error = new Error('No cat was found by that id!');
    error.status = 404;
    return next(error);
  }

  res.json(cat);
};

const postCat = async (req, res, next) => {
  console.log('request', req.file);
  console.log('request', req.body);
  //console.log(req.file.filename);

  if (!req.body) {
    const error = new Error('No cat data!');
    error.status = 400;
    return next(error);
  }

  if (!req.file) {
    const error = new Error('Invalid or missing file!');
    error.status = 400;
    return next(error);
  }

  req.body.filename = req.file ? req.file.filename : req.body.filename;

  const role = res.locals.user.role;

  const user_id = res.locals.user.user_id;

  console.log('Values sent to addCat:', {
    body: req.body,
    user_id,
    role,
    filename: req.file?.filename,
  });

  const result = await addCat(req.body, user_id, role);
  if (result.error) {
    return next(new Error(result.error));
  }

  res.status(201);
  res.json({message: 'New cat added.', result});
  //const id = addCat(req.body);
  //res.status(201).json({message: 'Kissa lisätty', cat_id: id});
};

const deleteCat = async (req, res, next) => {
  const role = res.locals.user.role;

  const user_id = res.locals.user.user_id;

  const result = await removeCat(Number(req.params.id), user_id, role);

  if (result.error) {
    return next(new Error(result.error));
  }

  res.json({message: 'Kissa poistettu'});
};

const putCat = async (req, res, next) => {
  const role = res.locals.user.role;

  const user_id = res.locals.user.user_id;

  // in real life, all input data (req.body) should be validated before using it
  const result = await modifyCat(
    Number(req.params.id),
    req.body,
    user_id,
    role
  );

  if (result.error) {
    return next(new Error(result.error));
  }

  res.json({message: 'Cat updated!'});
};

const getCatByUserId = async (req, res, next) => {
  const user_id = res.locals.user.user_id;

  const given_user_id = Number(req.params.userId);

  if (user_id !== given_user_id) {
    const error = new Error("You do not have access to this/these cat('s).");
    error.status = 403;
    return next(error);
  }

  const cat = await catByUserId(given_user_id);

  if (!cat) {
    const error = new Error('No cats found by that user id!');
    error.status = 404;
    return next(error);
  }

  res.json(cat);
};

export {getAllCats, getCatById, postCat, deleteCat, putCat, getCatByUserId};
