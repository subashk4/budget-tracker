const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/generateToken');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userType: {
      type: String,
      required: [true, 'user role required'],
      default: 'buyer',
      enum: ['admin', 'seller', 'buyer'],
    },
    firstName: {
      type: String,
      required: [true, 'firstname required'],
      trim: true,
      minlength: 3,
      maxlength: 30,
    },

    lastName: {
      type: String,
      required: [true, 'lastname required'],
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      trim: true,
      unique: true,
      // validate: {
      //   validator: function (email) {
      //     return Validator.isEmail();
      //   },
      //   message: (props) => `${props.email} is not a valid email`,
      // },
    },
    password: {
      type: String,
      required: [true, 'password required'],
      trim: true,
      // select: false
    },
    contactNumber: {
      type: String,
      required: false,
    },
    displayAddress: {
      type: String,
      required: [true, 'display address required'],
      trim: true,
    },
    emailVerifiedAt: {
      type: Date,
      required: false,
      default: null,
      select: false,
    },
    isFirstLogin: {
      type: Date,
      required: false,
      default: null,
      select: false,
    },
    lastLoginAt: {
      type: Date,
      required: false,
      default: null,
      select: false,
    },
    tokens: {
      type: [String],
    },
    properties: {
      type: [mongoose.Types.ObjectId],
      ref: 'Property',
      required: false,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 0 } }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});

userSchema.methods.validatePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// userSchema.methods.addToken = async function (token) {
//   const user = this;
//   user.token.push(token);
//   await user.save();
//   return user;
// };

userSchema.methods.generateToken = async function () {
  const user = this;
  const payload = { _id: user._id, userType: user.userType };
  const token = await generateToken(payload, '1d');
  user.tokens.push(token);
  // console.log(user);
  await user.save();
  // console.log({ user, token });
  return { user, token };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
