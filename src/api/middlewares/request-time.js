const requestTime = (req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
};

export default requestTime;
// Middleware lisää req-olioon uuden ominaisuuden requestTime, jonka myöhemmät käsittelijät voivat lukea.
