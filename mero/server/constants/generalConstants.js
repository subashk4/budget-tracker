const { StatusCodes } = require('http-status-codes');

const httpStatus = {
  OK: StatusCodes.OK,
  CREATED: StatusCodes.CREATED,
  ACCEPTED: StatusCodes.ACCEPTED,
  NO_CONTENT: StatusCodes.NO_CONTENT,
  BAD_REQUEST: StatusCodes.BAD_REQUEST,
  NOT_FOUND: StatusCodes.NOT_FOUND,
  UNAUTHORIZED: StatusCodes.UNAUTHORIZED,
  INTERNAL_SERVER_ERROR: StatusCodes.INTERNAL_SERVER_ERROR,
};

module.exports = httpStatus;
