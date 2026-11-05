import sharp from 'sharp';

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  console.log(
    'tässä välissä ei tee muuta kuin tallenna thumbnail ja next (async/awair)'
  );
  console.log(req.file.path);
  //console.log(req.file.filename);
  // TODO: use file path to create 160x160 png thumbnail with sharp

  //PUT A SUFFIX _thumb
  await sharp(req.file.path)
    .resize(160, 160)
    .toFile('uploads/' + req.file.filename + '_thumb.jpeg');

  next();
};

export {createThumbnail};
