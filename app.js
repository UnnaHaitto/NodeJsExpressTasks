import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

const cats = [
  {
    cat_id: 1,
    name: 'Misu',
    birth_date: '10.10.2026',
    weight: 10,
    owner: 'Maisa',
    img: 'https://loremflickr.com/320/240/cat',
  },
  {
    cat_id: 2,
    name: 'Misu',
    birth_date: '10.10.2016',
    weight: 30,
    owner: 'Mikko',
    img: 'https://loremflickr.com/320/240/cat',
  },
  {
    cat_id: 3,
    name: 'Molli',
    birth_date: '10.10.2022',
    weight: 14,
    owner: 'Jukka',
    img: 'https://loremflickr.com/320/240/cat',
  },
];

app.get('/kissa', (req, res) => {
  res.send('Welcome to my REST API!');
});

app.get('/api/v1/cats', (req, res) => {
  res.json(cats);
});

// GET http://localhost:3000/api/resource/99
// property name (id) is set in the route definition
app.get('/api/v1/cats/:id', (req, res) => {
  //console.log(req);
  console.log('path variables', req.params);

  for (let cat of cats) {
    if (req.params.id == cat.cat_id) {
      res.json(cat);
    }
  }

  if (req.params.id === '99') {
    const myData = {
      title: 'This is a specific item, id: ' + req.params.id,
      description: 'Just some dummy data here',
    };
    res.json(myData);
  } else {
    res.sendStatus(404);
  }
});

app.use(express.static('public'));

//Köynnistää HTTP- palvelimen kuuntelemaan porttia
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
