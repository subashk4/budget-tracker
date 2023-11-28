require('dotenv').config();
const mongoose = require('mongoose');

const { responseSuccess, responseError } = require('../helpers/responseHelper');
const httpStatus = require('../constants/generalConstants');
const Property = require('../models/property');
const User = require('../models/user');
const { getCoordinates } = require('../utils/getCoordinates');
const { kmConversion } = require('../utils/unit');

exports.createProperty = async (req, res, next) => {
  try {
    // console.log(req.body);
    const _id = req.user._id;
    const address = req.body.address;
    // const response = await getCoordinates(address);
    // const { longitude, latitude } = response.data[0];
    // console.log(longitude, latitude);

    //delete address from req.body
    delete req.body.address;
    // console.log(typeof address);

    const property = new Property({
      ...req.body,
      owner: _id,
      location: {
        location_geoJSON: {
          type: 'Point',
          coordinates: [85.31666564941406, 27.71666717529297],
        },
        address,
      },
    });
    await property.save();

    return responseSuccess(res, httpStatus.CREATED, 'add property', 'new property created', property);
  } catch (error) {
    console.error(error.stack);
    return responseError(res, httpStatus.BAD_REQUEST, 'add property', error.message);
  }
};

exports.getProperties = async (req, res, next) => {
  try {
    const pageOptions = {
      limit: parseInt(req.query.limit) || 5,
      skip: parseInt(req.query.page) > 0 ? parseInt(req.query.page - 1) : 0,
    };
    const properties = await Property.find()
      .limit(pageOptions.limit)
      .skip(pageOptions.limit * pageOptions.skip);

    if (!properties) throw new Error();
    return responseSuccess(res, httpStatus.OK, 'Get Property', 'List of properties', properties);
  } catch (error) {
    console.log(error.stack);
    return responseError(res, httpStatus.BAD_REQUEST, 'get property', 'properties listing failed');
  }
};

exports.getProperty = async (req, res, next) => {
  try {
    const _id = req.params.id;
    // const property = await Property.findById(_id);
    const property = await Property.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(_id) } },
      { $lookup: { from: 'users', localField: 'owner', foreignField: '_id', as: 'owner_details' } },
      {
        $project: {
          owner_details: {
            _id: 0,
            userType: 0,
            password: 0,
            emailVerifiedAt: 0,
            isFirstLogin: 0,
            lastLoginAt: 0,
            tokens: 0,
            created_at: 0,
          },
        },
      },
    ]);

    // console.log(property);
    if (!property) throw new Error();

    return responseSuccess(res, httpStatus.OK, 'Get Property', 'List of properties', property);
  } catch (error) {
    console.error(error.stack);
    return responseError(res, httpStatus.BAD_REQUEST, 'get property', 'properties listing failed');
  }
};

// exports.updateProperty = async (req, res, next) => {
//   try {
//     const _id = req.params.id;
//     const allowedUpdates = ['propertyType', 'propertyName', 'description', 'location', 'valuation', 'isSold', 'owner'];
//     const updates = Object.keys(req.body);
//     const isValid = updates.every((update) => allowedUpdates.includes(update));

//     if (!isValid) throw new Error();

//     const property = await Property.findById(_id);
//     if (!property) throw new Error();
//     // console.log(property);
//     updates.forEach((update) => (property[update] = req.body[update]));
//     // await updatedProperty.save();
//     return responseSuccess(res, httpStatus.NO_CONTENT, 'update property', 'property updated', updatedPropety);
//   } catch (error) {
//     // console.log(error);
//     return responseError(res, httpStatus.BAD_REQUEST, 'error', 'update property failed');
//   }
// };

exports.updateProperty = async (req, res, next) => {
  console.log('update property');
  try {
    const userId = req.user._id;
    const propertyId = req.params.id;

    // console.log({ userId, propertyId });

    const { propertyName, propertyType, address, description, valuation, isSold } = req.body;
    console.log(address);
    // const property = await Property.findOne({ _id: propertyId, owner: userId });
    // console.log(property);
    // res.status(200).send(property);
    const updatedProperty = await Property.findOneAndUpdate(
      { _id: propertyId, owner: userId },
      {
        $set: {
          propertyName,
          propertyType,
          address,
          description,
          valuation,
          isSold,
          'location.address': address,
        },
      },
      { new: true }
    );

    console.log(updatedProperty);
    if (!updatedProperty) throw new Error();

    return responseSuccess(
      res,
      httpStatus.CREATED,
      'update property',
      'update property success',
      updatedProperty
    );
  } catch (error) {
    console.log(error);
    return responseError(res, httpStatus.OK, 'update property', 'update property failed');
  }
};

exports.deleteProperty = async (req, res, next) => {
  try {
    // console.log(req.user);
    const propertyId = req.params.id;
    const userId = req.user._id;

    const property = await Property.findOneAndDelete({ _id: propertyId, owner: userId });

    if (!property) throw new Error();

    return responseSuccess(
      res,
      httpStatus.ACCEPTED,
      'delete property',
      'property deleted successful',
      property
    );
  } catch (error) {
    console.log(error);
    return responseError(res, httpStatus.BAD_REQUEST, 'error', 'delete property failed');
  }
};

exports.deleteAllProperties = async (req, res, next) => {
  try {
    const property = await Property.deleteMany({});

    if (!property) throw new Error();

    return responseSuccess(
      res,
      httpStatus.OK,
      'delete property',
      'delete property success',
      property
    );
  } catch (error) {
    return responseError(res, httpStatus.OK, 'delete property', 'delete property failed', property);
  }
};

exports.searchProperty = async (req, res, next) => {
  try {
    // const location = req.query.location;
    const { location, price } = req.query;
    const valuation = price || 0;

    const radius = req.query.radius || 16.093;

    // convert radius in km to mile
    const mile = kmConversion(radius);
    // const meter = radius * 1000;

    const response = await getCoordinates(location);
    const { longitude, latitude } = response.data[0];
    // console.log(longitude, latitude);

    const property = await Property.find({
      'location.location_geoJSON': {
        $geoWithin: { $centerSphere: [[longitude, latitude], mile / 3963.2] },
      },
      valuation: { $gt: valuation },
    });
    // console.log(property);
    // const property = await Property.aggregate([
    //   {
    //     near: {
    //       type: 'Point',
    //       coordinates: [longitude, latitude],
    //     },
    //     distanceField: 'dist.calculated',
    //     maxDistance: meter,
    //     spherical: true,
    //   },
    // ]);
    if (!property) throw new Error();

    return responseSuccess(
      res,
      httpStatus.OK,
      'search location',
      'search location success',
      property
    );
  } catch (error) {
    // console.error(error.stack);
    return responseError(res, httpStatus.BAD_REQUEST, 'search location', 'search location failed');
  }
};

exports.bookProperty = async (req, res, next) => {
  try {
    const propertyId = req.params.id;
    const userId = req.user._id;
    // console.log({ propertyId, userId });

    //! not working
    const property = await Property.findByIdAndUpdate(
      { _id: propertyId, owner: { $ne: userId } },
      { $addToSet: { booked_users: userId } },
      { new: true }
    );
    // const property = await Property.aggregate([
    //   {
    //     $match: { _id: mongoose.Types.ObjectId(propertyId), owner: { $ne: userId } },
    //   },
    //   { $addToSet: { booked_users: userId } },
    // ]);

    if (property.length < 1) throw new Error();

    responseSuccess(res, httpStatus.ACCEPTED, 'book property', 'book property success', property);
  } catch (error) {
    console.error(error.stack);
    return responseError(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      'book property',
      'book property failed'
    );
  }
};

exports.buyProperty = async (req, res, next) => {
  try {
    const price = parseInt(req.query.price);
    const userId = req.user._id;
    const propertyId = req.params.id;

    const property = await Property.findOne({ _id: propertyId });

    // console.log(property.valuation === price);

    if (price !== property.valuation) {
      return responseError(
        res,
        httpStatus.INTERNAL_SERVER_ERROR,
        'bid not successful',
        ' please match the valuation'
      );
    }

    if (property.isSold) {
      return responseError(
        res,
        httpStatus.INTERNAL_SERVER_ERROR,
        'buy property',
        'property sold out'
      );
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      { _id: propertyId },
      { $set: { isSold: true, owner: userId, booked_users: [] } },
      { new: true }
    );
    // property.isSold = true;
    // property.owner = userId;
    // property.booked_users = [];
    // await property.save();

    const updatedOwner = await User.findByIdAndUpdate(
      { _id: userId },
      {
        properties: { $addToSet: { propertyId: mongoose.Types.ObjectId(propertyId) } },
      },
      { new: true }
    );

    return responseSuccess(res, httpStatus.ACCEPTED, 'buy property', 'purchase property success', {
      user: updatedOwner,
      property: updatedProperty,
    });
  } catch (error) {
    console.error(error.stack);
    responseError(res, httpStatus.INTERNAL_SERVER_ERROR, 'buy property', 'property purchase failed');
  }
};

exports.hotProperties = async (req, res, next) => {
  const { valuation } = req.query;
  try {
    const pageOptions = {
      limit: parseInt(req.query.limit) || 5,
      skip: parseInt(req.query.page) > 0 ? parseInt(req.query.page - 1) : 0,
    };
    const properties = await Property.find({ valuation: { $gt: valuation } })
      .limit(pageOptions.limit)
      .skip(pageOptions.limit * pageOptions.skip)
      .sort({ valuation: -1 });

    if (!properties) throw new Error();
    return responseSuccess(
      res,
      httpStatus.OK,
      'get trending properties',
      'list of trending properties',
      properties
    );
  } catch (error) {
    console.log(error.stack);
    return responseError(
      res,
      httpStatus.BAD_REQUEST,
      'get trending property',
      'properties listing failed'
    );
  }
};
