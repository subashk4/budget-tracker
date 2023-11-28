const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { Strategy: LocalStrategy } = require('passport-local');
// require('dotenv').config();

const User = require('../models/user');
const { responseError } = require('../helpers/responseHelper');
const httpStatus = require('../constants/generalConstants');
const roles = require('../constants/roles');

//! passport local strategy
passport.use(
  'local',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      // debug('passport local');
      // console.log('passport local');
      try {
        // console.log('call b');
        const user = await User.findOne({ email });
        // console.log(user);
        if (!user) done(null, false, { title: 'error', message: 'invalid email or password' });

        const isVerified = await user.validatePassword(password);
        if (!isVerified)
          done(null, false, { title: 'error', message: 'invalid email or password' });

        // console.log(user);
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

//? passport-jwt strategy

const options = {};
options.secretOrKey = process.env.SECRET;
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

passport.use(
  'jwt',
  new JwtStrategy(options, async function (jwt_payload, done) {
    // console.log('jwt strategy');
    try {
      const user = await User.findOne({ _id: jwt_payload._id });
      if (!user) done(null, false, { title: 'error', message: 'invalid token' });
      done(null, user);
    } catch (error) {
      done(error);
    }
  })
);

exports.isAuthenticated = async (req, res, next) => {
  // console.log('call a');
  await passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return responseError(res, httpStatus.OK, 'error', err.message);
    }
    if (info && info.title) {
      const { title, message } = info;
      return responseError(res, httpStatus.OK, title, message);
    }
    req.user = user;
    next();
  })(req, res, next);
};

exports.isAuthorized = async (req, res, next) => {
  // console.log('is Authorized');
  await passport.authenticate('jwt', { session: false }, (err, user, info) => {
    // console.log({ err, user, info });
    if (err) {
      return responseError(res, httpStatus.UNAUTHORIZED, 'error', err.message);
    }
    if (!user) {
      return responseError(res, httpStatus.UNAUTHORIZED, info.title, info.message);
    }
    req.user = user;
    next();
  })(req, res, next);
};

exports.isAdmin = async (req, res, next) => {
  await passport.authenticate('jwt', { session: false }, (err, user, info) => {
    // console.log({ err, user, info });
    if (err) {
      return responseError(res, httpStatus.UNAUTHORIZED, 'error', err.message);
    }
    if (!user) {
      return responseError(res, httpStatus.UNAUTHORIZED, info.title, info.message);
    }

    if (user.userType !== roles.ADMIN) {
      return responseError(res, httpStatus.UNAUTHORIZED, 'error', 'unauthorized user access');
    }

    req.user = user;
    next();
  })(req, res, next);
};

exports.isSeller = async (req, res, next) => {
  await passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return responseError(res, httpStatus.INTERNAL_SERVER_ERROR, 'error', err.message);
    }

    if (!user) {
      return responseError(res, httpStatus.UNAUTHORIZED, info.title, info.message);
    }

    if (user.userType !== roles.SELLER) {
      if (user.userType === roles.ADMIN) {
        req.user = user;
        return next();
      }
      return responseError(res, httpStatus.UNAUTHORIZED, 'error', 'unauthorized user access');
    }

    req.user = user;
    next();
  })(req, res, next);
};

exports.isBuyer = async (req, res, next) => {
  // console.log('is buyer');
  await passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return responseError(res, httpStatus.INTERNAL_SERVER_ERROR, 'error', err.message);
    }

    if (!user) {
      return responseError(res, httpStatus.UNAUTHORIZED, info.title, info.message);
    }

    // console.log(user.userType !== roles.BUYER);

    //buyer seller admin
    if (
      !(
        user.userType === roles.BUYER ||
        user.userType === roles.SELLER ||
        user.userType === roles.ADMIN
      )
    ) {
      return responseError(res, httpStatus.UNAUTHORIZED, 'error', 'unauthorized access');
    }
    req.user = user;
    next();
  })(req, res, next);
};

exports.isValidBuyer = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return responseError(res, httpStatus.INTERNAL_SERVER_ERROR, 'error', err.message);
    }

    if (!user) {
      return responseError(res, httpStatus.UNAUTHORIZED, info.title, info.message);
    }

    if (user.userType !== roles.BUYER) {
      return responseError(res, httpStatus.UNAUTHORIZED, 'error', 'unauthorized access');
    }

    req.user = user;
    next();
  })(req, res, next);
};
