const mongoose = require('mongoose');

const { Schema } = mongoose;

const propertySchema = new Schema(
  {
    propertyType: {
      type: String,
      required: true,
      enum: ['sale', 'rent'],
    },
    propertyName: {
      type: String,
      required: [true, 'property name required'],
      trim: true,
      min: 5,
      max: 30,
    },
    description: {
      type: String,
      trim: true,
      min: 5,
      max: 300,
    },
    location: {
      location_geoJSON: {
        type: {
          type: String,
          enum: ['Point'],
          required: true,
        },
        coordinates: {
          type: [Number],
          required: true,
        },
      },
      address: {
        type: String,
        required: [true, 'location name required'],
        trim: true,
      },
    },
    valuation: {
      type: Number,
      required: true,
    },
    isSold: {
      type: Boolean,
      required: false,
      default: false,
    },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    booked_users: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      required: false,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 0 } }
);

// create a 2dsphere index
propertySchema.index({ 'location.location_geoJSON': '2dsphere' });
const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
