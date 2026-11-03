import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;
import router from './api/index.js';

//Köynnistää HTTP- palvelimen kuuntelemaan porttia
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.use(express.static('public'));

app.use(express.json());

app.use('/api/v1', router);
