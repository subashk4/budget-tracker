db.comments.aggregate([
  {
    $lookup: {
      from: 'user',
      localField: 'owner',
      foreignField: '_id',
      as: 'owner details',
    },
  },
]);
