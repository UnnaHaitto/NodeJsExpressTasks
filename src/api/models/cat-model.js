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

const findCatById = (id) => {
  return cats.find((cat) => cat.cat_id === id);
};

const listAllCats = () => {
  return cats;
};

export {cats, findCatById, listAllCats};
