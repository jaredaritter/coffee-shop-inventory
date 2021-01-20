// NODE MODULES
const express = require('express');
const router = express.Router();

// CONTROLLER MODULES
const coffee_controller = require('../controllers/coffeeController');
const origin_controller = require('../controllers/originController');
const roast_controller = require('../controllers/roastController');

// GET INDEX (ARBITRARILY STORED IN COFFEECONTROLLER)
router.get('/', coffee_controller.index);

/// COFFEE ROUTES ///
// CREATE
router.get('/coffee/create', coffee_controller.coffee_create_get);
router.post('/coffee/create', coffee_controller.coffee_create_post);
// UPDATE
router.get('/coffee/:id/update', coffee_controller.coffee_update_get);
router.get('/coffee/:id/update', coffee_controller.coffee_update_post);
// DELETE
router.get('/coffee/:id/delete', coffee_controller.coffee_delete_get);
router.get('/coffee/:id/delete', coffee_controller.coffee_delete_post);
// READ (GOES AT END TO PREVENT OVERRIDING OTHER ROUTES)
router.get('/coffee/:id', coffee_controller.coffee_detail);
router.get('/coffees', coffee_controller.coffee_list);

/// ORIGIN ROUTES ///
// CREATE
router.get('/origin/create', origin_controller.origin_create_get);
router.post('/origin/create', origin_controller.origin_create_post);
// UPDATE
router.get('/origin/:id/update', origin_controller.origin_update_get);
router.post('/origin/:id/update', origin_controller.origin_update_post);
// DELETE
router.get('/origin/:id/delete', origin_controller.origin_delete_get);
router.post('/origin/:id/delete', origin_controller.origin_update_post);
// READ
router.get('/origin/:id', origin_controller.origin_detail);
router.get('/origins', origin_controller.origin_list);

/// ROAST ROUTES ///

// FINAL EXPORT
module.exports = router;
