import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;
import router from './api/index.js';
import requestTime from './api/middlewares/request-time.js';
import cors from 'cors';

app.use(cors());

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// middlewaret (myös express on sellainen) suoritetaan ennne reittejä
app.use(requestTime);
app.use(express.json());

// Parses URL-encoded form data (like HTML forms)
app.use(express.urlencoded({extended: true}));

app.use('/api/v1', router);

//Köynnistää HTTP- palvelimen kuuntelemaan porttia
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
