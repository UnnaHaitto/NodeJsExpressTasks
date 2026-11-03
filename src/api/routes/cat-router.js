import express from 'express';
import {
  deleteCat,
  getAllCats,
  getCatById,
  postCat,
  putCat,
} from '../controllers/cat-controller.js';
import logger from '../middlevares/logger.js';

const catRouter = express.Router();

// Kaikki /api/v1/cats reitit
catRouter.route('/').get(logger, getAllCats).post(postCat);
// Kaikki /api/v1/cats/:id reitit
catRouter.route('/:id').get(getCatById).delete(deleteCat).put(putCat);

export default catRouter;
