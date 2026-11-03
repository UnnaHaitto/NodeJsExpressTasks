const logger = (req, res, next) => {
  console.log('Middleware suoritettiin!');
  next();
};

export default logger;
