const User = require('../models/user');
const { responseSuccess, responseError } = require('../helpers/responseHelper');
const httpStatus = require('../constants/generalConstants');
const roles = require('../constants/roles');

exports.updateUser = async (req, res, next) => {
  // const _id = req.params.id;
  const _id = req.user._id;
  const { firstname, lastname, contactNumber, displayAddress, ...others } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      { _id },
      { $set: { firstname, lastname, contactNumber, displayAddress } },
      { new: true }
    );
    // console.log(user);
    if (!user) throw new Error();

    return responseSuccess(res, httpStatus.OK, 'update user', 'update user success', user);
  } catch (error) {
    return responseError(res, httpStatus.BAD_REQUEST, 'update user', 'update user failed');
  }
};

exports.deleteUser = async (req, res, next) => {
  const _id = req.user._id;
  // const _id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) throw new Error();
    return responseSuccess(res, httpStatus.CREATED, 'delete user', 'delete user success', user);
  } catch (error) {
    return responseError(res, httpStatus.BAD_REQUEST, 'delete user', 'delete user failed');
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) throw new Error();
    return responseSuccess(res, httpStatus.OK, 'get user', 'get user success', users);
  } catch (error) {
    return responseError(res, httpStatus.BAD_REQUEST, 'get user', 'get user failed');
  }
};

exports.getUser = async (req, res, next) => {
  try {
    // const _id = req.params.id;
    const _id = req.user._id;
    const user = await User.findById(_id);
    if (!user) throw new Error();
    return responseSuccess(res, httpStatus.OK, 'get user', 'get user success', user);
  } catch (error) {
    return responseError(res, httpStatus.BAD_REQUEST, 'get user', 'get user failed');
  }
};

exports.deleteAllUsers = async (req, res, next) => {
  try {
    const users = await User.deleteMany({ userType: { $ne: roles.ADMIN } });

    if (!users) throw new Error();

    return responseSuccess(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      'delete users',
      'delete users success',
      users
    );
  } catch (error) {
    return responseError(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      'delete users',
      'delete users failed'
    );
  }
};
