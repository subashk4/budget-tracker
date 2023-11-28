const express = require('express');
const router = express.Router();
const {
  createComment,
  updateComment,
  deleteComment,
  getComment,
  getComments,
} = require('../controllers/commentController');

const { isBuyer } = require('../middlewares/passport');

router.route('/api/comment').get(isBuyer, getComments).post(isBuyer, createComment);

router.route('/api/comment/:id').get(isBuyer, getComment).patch(isBuyer, updateComment).delete(isBuyer, deleteComment);

module.exports = router;
