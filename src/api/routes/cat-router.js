import express from 'express';
import {
  deleteCat,
  getAllCats,
  getCatById,
  postCat,
  putCat,
  getCatByUserId,
} from '../controllers/cat-controller.js';
import logger from '../middlewares/logger.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {body} from 'express-validator';
import {validationErrors} from '../middlewares/error-handlers.js';

import {createThumbnail, upload, requireFile} from '../middlewares/upload.js';

const catRouter = express.Router();

catRouter.use(authenticateToken);

// Kaikki /api/v1/cats reitit
// reittikohtainen logger esimerkki
//SAVE TO UPLOADS
catRouter
  .route('/')
  .get(logger, getAllCats)
  .post(
    upload.single('file'),
    body('cat_name').trim().notEmpty().isLength({min: 3, max: 50}),
    body('weight').trim().notEmpty().isFloat(),
    body('owner').trim().notEmpty().isInt(),
    body('birthdate').trim().notEmpty().isDate(),
    requireFile,
    validationErrors,
    createThumbnail,
    postCat
  );

// Kaikki /api/v1/cats/:id reitit
catRouter
  .route('/:id')
  .get(getCatById)
  .delete(deleteCat)
  .put(
    body('cat_name').optional().trim().isLength({min: 3, max: 50}),
    body('weight').optional().trim().isFloat(),
    body('owner').optional().trim().isInt(),
    body('birthdate').optional().trim().isDate(),
    validationErrors,
    putCat
  );
catRouter.route('/user/:userId').get(getCatByUserId);

export default catRouter;

//kaikille reiteille middleware

// Multer on yksi tällainen middleware, joka osaa lukea multipart/form-data -pyynnöt ja tallentaa tiedostot serverille

// Myöhemmin lisätään esim. autentikointi, virheenkäsittely.

// upload.single('file'):
// tallentaa tiedoston esim. uploads/-kansioon ja
// lisää req.file-olion, jossa on esim.:

// {
//   fieldname: 'file',           // formin "name"
//   originalname: 'image.jpg',   // alkuperäinen nimi
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   destination: 'uploads/',     // mihin tallennettiin
//   filename: 'a8f9234bd12.jpg', // generoitu nimi levyllä
//   path: 'uploads/a8f9234bd12.jpg',
//   size: 12345
// }

// Kaikki muut kentät (cat_name, weight, …) menevät  req.body-olioon.
