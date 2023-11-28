const passport = require('passport');

const httpStatus = require('../constants/generalConstants');
const { responseSuccess, responseError } = require('../helpers/responseHelper');
const { generateToken, validateToken } = require('../utils/generateToken');
// const { formatTkn } = require('../utils/formatTkn');
const roles = require('../constants/roles');
const User = require('../models/user');
const Token = require('../models/token');

exports.signup = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = new User(req.body);
    await user.save();
    return responseSuccess(res, httpStatus.CREATED, 'signup', 'user signup success', user);
  } catch (error) {
    // console.log(error.message);
    return responseError(res, httpStatus.OK, 'error', error.message);
  }
};

exports.setToken = async (req, res, next) => {
  try {
    console.log('call c');
    const { user, token } = await req.user.generateToken();

    // console.log({ user, token });

    // gen a refresh token
    const refreshTkn = await generateToken({ _id: user._id }, '1d');
    const refreshToken = new Token({ token: refreshTkn });
    await refreshToken.save();
    // console.log({ user, token, refreshToken });
    // console.log(user);
    if (!user) throw new Error();

    res.setHeader('authorization', token);
    return responseSuccess(res, httpStatus.OK, 'user login', 'user login success', {
      user,
      token,
      refreshToken: refreshToken.token,
    });
  } catch (error) {
    console.error(error.stack);
    return responseError(res, httpStatus.BAD_REQUEST, 'user login', 'user login falied');
  }
};

exports.verifyRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.headers['token'].split(' ')[1];
    if (!refreshToken) throw new Error();

    const { token } = await Token.findOne({ token: refreshToken });
    if (!token) throw new Error();

    const { _id: userId } = await validateToken(token);
    const user = await User.findOne({ _id: userId });
    if (!user) throw new Error();

    const accessToken = await generateToken({ id: user._id, role: user.userType }, '15m');

    return responseSuccess(res, httpStatus.OK, 'refresh token', 'refresh token success', {
      token: accessToken,
    });
  } catch (error) {
    console.error(error.stack);
    return responseError(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      'refresh token',
      'generate refresh token failed'
    );
  }
};
