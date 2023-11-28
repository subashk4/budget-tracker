const Joi = require('joi');

const userSchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).trim().lowercase().required(),
  lastName: Joi.string().alphanum().min(3).max(30).trim().lowercase().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .trim()
    .lowercase()
    .required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  contactNumber: Joi.string().required(),
  displayAddress: Joi.string().alphanum().min(5).max(30).trim().lowercase().required(),
  userType: Joi.string().valid('admin', 'buyer', 'seller'),
});

const propertySchema = Joi.object({
  propertyName: Joi.string().min(5).max(100).trim().lowercase().required(),
  propertyType: Joi.string().valid('rent', 'sale').required(),
  address: Joi.string().min(5).max(30).trim().lowercase().required(),
  description: Joi.string().trim().lowercase().required(),
  valuation: Joi.number().required(),
  isSold: Joi.boolean().required(),
  owner: Joi.string(),
});

module.exports = { userSchema, propertySchema };
