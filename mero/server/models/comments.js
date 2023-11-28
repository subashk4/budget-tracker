const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentsSchema = new Schema(
  {
    text: {
      type: String,
      trim: true,
    },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    property: { type: Schema.Types.ObjectId, ref: 'Property' },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const Comment = mongoose.model('Comment', commentsSchema);

module.exports = Comment;
