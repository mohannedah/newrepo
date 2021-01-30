const errorHandling = (error, req, res, next) => {
  const code =
    error.statusCode == 200 ? error.statusCode == 500 : error.statusCode;
  console.error(error.stack);
  res.status(code).json(error.stack);
  next(error);
};

const notFound = (req, res, next) => {
  const error = new Error(`Could not find the url ${req.originalUrl}`);
  res.status(404).json({ msg: error });
  next(error);
};

module.exports = notFound;
module.exports = errorHandling;
