const { userSchema, propertySchema } = require('./schemas/validation');

const httpStatus = require('../constants/generalConstants');
const { responseError } = require('../helpers/responseHelper');

exports.validateUserSchema = async (req, res, next) => {
  try {
    console.log(req.body);
    const isValidate = await userSchema.validate(req.body);
    if (isValidate.error) throw new Error(isValidate.error);
    req.body = isValidate.value;
    next();
  } catch (error) {
    // console.error(error.stack);
    responseError(res, httpStatus.OK, 'validation error', error.message);
  }
};

exports.validatePropertySchema = async (req, res, next) => {
  try {
    const isValidate = await propertySchema.validate(req.body);
    if (isValidate.error) throw new Error(isValidate.error);
    req.body = isValidate.value;
    next();
  } catch (error) {
    responseError(res, httpStatus.OK, 'validation error', error.message);
  }
};
