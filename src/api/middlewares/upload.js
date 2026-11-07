import sharp from 'sharp';
import multer from 'multer';

const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // max 10 MB
  },
  fileFilter: (req, file, cb) => {
    // only allow images and videos
    if (
      file.mimetype.startsWith('image/') ||
      file.mimetype.startsWith('video/')
    ) {
      cb(null, true);
    } else {
      const error = new Error('Only images and videos are allowed!');
      error.status = 400;
      cb(error, false);
    }
  },
});

const requireFile = (req, res, next) => {
  if (!req.file) {
    const error = new Error('A file is required!');
    error.status = 400;
    return next(error);
  }

  next();
};

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

export {createThumbnail, upload, requireFile};
