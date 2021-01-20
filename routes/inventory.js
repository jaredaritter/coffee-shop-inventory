// NODE MODULES
const express = require('express');
const router = express.Router()

// CONTROLLER MODULES
const coffee_controller = require('../controllers/coffeeController');
const origin_controller = require('../controllers/originController');
const roast_controller = require('../controllers/roastController');

/// COFFEE ROUTES ///

// GET INDEX
router.get('/', coffee_controller.index);

// CRUD
// CREATE
router.get('/coffee/create', coffee_controller.coffee_create_get);
router.post('/coffee/create', coffee_controller.coffe_create_post);
// UPDATE
router.get('/coffee/:id/update', coffee_controller.coffee_update_get);
router.get('/coffee/:id/update', coffee_controller.coffee_update_post);
// DESTROY/DELETE
router.get('/coffee/:id/delete', coffee_controller.coffee_delete_get);
router.get('/coffee/:id/delete', coffee_controller.coffee_deleete_post);
// READ (GOES AT END TO PREVENT OVERRIDING OTHER ROUTES)
router.get('/coffee/:id', coffee_controller.coffee_detail)
router.get('/coffees', coffee_controller.coffee_list);


/// ORIGIN ROUTES ///

/// ROAST ROUTES ///

// FINAL EXPORT
module.exports = router;