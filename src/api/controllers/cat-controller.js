import {
  cats,
  findCatById,
  listAllCats,
  modifyCat,
  removeCat,
} from '../models/cat-model.js';

const getAllCats = (req, res) => {
  res.json(cats);
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
  console.log('request', req.body);
  const id = addCat(req.body);
  res.status(201).json({message: 'Kissa lisätty', cat_id: id});
};

const deleteCat = (req, res) => {
  const result = removeCat(Number(req.params.id));
  if (result) {
    res.json({message: 'Kissa poistettu'});
  } else {
    res.status(404).json({message: 'Kissaa ei löytynyt!'});
  }
};

//const putCat = (req, res) => {

export {getAllCats, getCatById, listAllCats, modifyCat, deleteCat, postCat};
