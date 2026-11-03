import {
  findCatById,
  addCat,
  removeCat,
  modifyCat,
  listAllCats,
} from '../models/cat-model.js';

const getAllCats = (req, res) => {
  console.log('ollaan nyt controllerissa');

  const cats = listAllCats();

  // esimerkki siitä että middleware on muokannut req-oliota
  res.json({
    message: 'Kaikki kissat',
    time: req.requestTime,
    cats: cats,
  });
};

const getCatById = (req, res) => {
  const id = Number(req.params.id);

  const cat = findCatById(id);

  if (!cat) {
    return res.status(404).json({message: 'Kissaa ei löytynyt!'});
  }

  res.json(cat);
};

const postCat = (req, res) => {
  console.log('request', req.file);
  console.log('request', req.body);
  //console.log(req.file.filename);
  //req.body.filename = req.file.filename;

  const result = addCat(req.body);
  if (result) {
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
  //const id = addCat(req.body);
  //res.status(201).json({message: 'Kissa lisätty', cat_id: id});
};

const deleteCat = (req, res) => {
  const result = removeCat(Number(req.params.id));
  if (result) {
    res.json({message: 'Kissa poistettu'});
  } else {
    res.status(404).json({message: 'Kissaa ei löytynyt!'});
  }
};

const putCat = (req, res) => {
  // in real life, all input data (req.body) should be validated before using it
  const result = modifyCat(Number(req.params.id), req.body);
  if (result) {
    res.json({message: 'Cat updated!'});
  } else {
    res.status(404).json({error: 404, message: 'Not found.'});
  }
};

export {getAllCats, getCatById, postCat, deleteCat, putCat};
