const Comment = require('../models/comments');
const { responseSuccess, responseError } = require('../helpers/responseHelper');
const httpStatus = require('../constants/generalConstants');

exports.createComment = async (req, res, next) => {
  try {
    const { text, property } = req.body;
    const id = req.user._id;

    const comment = new Comment({ text, property, owner: id });
    await comment.save();

    return responseSuccess(res, httpStatus.CREATED, 'create comment', 'create comment success', comment);
  } catch (error) {
    return responseError(res, httpStatus.BAD_REQUEST, 'create comment', 'create comment failed');
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const { text } = req.body;
    const comment = await Comment.findOneAndUpdate(_id, { $set: { text } });

    if (!comment) throw new Error();

    return responseSuccess(res, httpStatus.NO_CONTENT, 'update comment', 'update comment success', comment);
  } catch (error) {
    return responseError(res, httpStatus.BAD_REQUEST, 'update comment', 'update comment failed');
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const comment = await Comment.findOneAndDelete(_id);

    if (!comment) throw new Error();

    return responseSuccess(res, httpStatus.NO_CONTENT, 'delete comment', 'delete comment success', comment);
  } catch (error) {
    return responseError(res, httpStatus.BAD_REQUEST, 'delete comment', 'delete comment failed');
  }
};

exports.getComments = async (req, res, next) => {
  try {
    const comments = await Comment.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: '_id',
          as: 'owner_details',
        },
      },
      {
        $lookup: {
          from: 'properties',
          localField: 'property',
          foreignField: '_id',
          as: 'property_details',
        },
      },
      {
        $project: {
          _id: 0,
          text: 1,
          owner_details: {
            firstname: 1,
            lastname: 1,
          },
          property_details: {
            propertyType: 1,
            propertyName: 1,
            valuation: 1,
          },
        },
      },
    ]);

    if (!comments) throw new Error();

    return responseSuccess(res, httpStatus.OK, 'fetch comments', 'fetch comments success', comments);
  } catch (error) {
    return responseError(req, httpStatus.BAD_REQUEST, 'fetch comments', 'fetch comments failed');
  }
};

exports.getComment = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const comments = await Comment.findByIdAndUpdate(_id);

    if (!comments) throw new Error();

    return responseSuccess(res, httpStatus.OK, 'fetch comments', 'fetch comments success', comments);
  } catch (error) {
    return responseError(req, httpStatus.BAD_REQUEST, 'fetch comments', 'fetch comments failed');
  }
};
