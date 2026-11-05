const cats = [
  {
    cat_id: 3,
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
    cat_id: 1,
    name: 'Molli',
    birth_date: '10.10.2012',
    weight: 14,
    owner: 'Jukka',
    img: 'https://loremflickr.com/320/240/cat',
  },
];
const listAllCats = () => {
  return cats;
};

const findCatById = (id) => {
  // 2. Etsitään kissa taulukosta
  // find palauttaa ensimmäisen löytyneen olion tai undefined
  return cats.find((item) => item.cat_id == id);
};

const addCat = (cat) => {
  const {cat_name, weight, owner, filename, birthdate} = cat;
  const newId = cats[0].cat_id + 1;
  cats.unshift({
    cat_id: newId,
    cat_name,
    weight,
    owner,
    filename,
    birthdate,
  });
  return newId;
};

const removeCat = (id) => {
  const index = cats.findIndex((cat) => id === cat.cat_id);
  cats.splice(index, 1);
  // palauttaa true, jos poisto onnistui
  return index !== -1;
};

const modifyCat = (id, newDetails) => {
  const index = cats.findIndex((cat) => id === cat.cat_id);
  // create new object and combine properties/values of two objects inside it
  cats[index] = {...cats[index], ...newDetails};
  // palauttaa true, jos muokkaus onnistui
  return index !== -1;
};

export {listAllCats, findCatById, addCat, removeCat, modifyCat, cats};
