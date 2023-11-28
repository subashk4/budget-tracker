exports.responseSuccess = (res, statusCode, title, message, data) => {
  res.status(statusCode).send({
    title,
    message,
    data,
  });
};

exports.responseError = (res, statusCode, title, message) => {
  res.status(statusCode).send({
    title,
    message,
  });
};
