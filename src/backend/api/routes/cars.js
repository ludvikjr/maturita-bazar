const express = require('express');
const router = express.Router();
const auth = require('../auth/auth');

const carController = require('../controllers/cars.js');
const upload = require('../controllers/images');

/**
 * paths to the cars
 */
router.post('/add', [auth, upload.single('carImage')], carController.addCar);
router.post('/', carController.getCars);
router.post('/filtered', carController.getFilteredCars);
router.get('/:id', carController.getCarById);
router.delete('/:id', auth, carController.deleteCar);
router.put('/:id', auth, carController.updateCar);

module.exports = router;
