const express = require('express');
const router = express.Router();

const propertyController = require('../controllers/propertyController');
const { validatePropertySchema } = require('../middlewares/validate');
const { isSeller, isBuyer, isAdmin, isValidBuyer } = require('../middlewares/passport');

router
  .route('/api/property')
  .get(isBuyer, propertyController.getProperties)
  .post(isSeller, validatePropertySchema, propertyController.createProperty)
  .delete(isAdmin, propertyController.deleteAllProperties);

router
  .route('/api/property/:id')
  .get(isBuyer, propertyController.getProperty)
  .patch(isSeller, validatePropertySchema, propertyController.updateProperty)
  .delete(isSeller, propertyController.deleteProperty);

router.get(
  '/api/trending',
  isBuyer,
  (req, res, next) => {
    req.query.valuation = 10000;
    next();
  },
  propertyController.hotProperties
);

router.get('/api/searchProperty', isBuyer, propertyController.searchProperty);

router.get('/api/bookProperty/:id', isBuyer, propertyController.bookProperty);

router.get('/api/buyProperty/:id', isValidBuyer, propertyController.buyProperty);
module.exports = router;
