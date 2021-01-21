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
// CREATE NEW COFFEE
router.get('/coffee/create', coffee_controller.coffee_create_get);

router.post('/coffee/create', coffee_controller.coffee_create_post);

// UPDATE EXISTING COFFEE
router.get('/coffee/:id/update', coffee_controller.coffee_update_get);

router.post('/coffee/:id/update', coffee_controller.coffee_update_post);

// DELETE EXISTING COFFEE
router.get('/coffee/:id/delete', coffee_controller.coffee_delete_get);

router.post('/coffee/:id/delete', coffee_controller.coffee_delete_post);

// READ (GOES AT END TO PREVENT OVERRIDING OTHER ROUTES)
router.get('/coffee/:id', coffee_controller.coffee_detail);

router.get('/coffees', coffee_controller.coffee_list);

/// ORIGIN ROUTES ///
// CREATE NEW ORIGIN
router.get('/origin/create', origin_controller.origin_create_get);

router.post('/origin/create', origin_controller.origin_create_post);

// UPDATE EXISTING ORIGIN
router.get('/origin/:id/update', origin_controller.origin_update_get);

router.post('/origin/:id/update', origin_controller.origin_update_post);

// DELETE EXISTING ORIGIN
router.get('/origin/:id/delete', origin_controller.origin_delete_get);

router.post('/origin/:id/delete', origin_controller.origin_delete_post);

// READ
router.get('/origin/:id', origin_controller.origin_detail);

router.get('/origins', origin_controller.origin_list);

/// ROAST ROUTES ///
// CREATE NEW ROAST
router.get('/roast/create', roast_controller.roast_create_get);

router.post('/roast/create', roast_controller.roast_create_post);

// UPDATE EXISTING ROAST
router.get('/roast/:id/update', roast_controller.roast_update_get);

router.post('roast/:id/update', roast_controller.roast_update_post);

// DELETE EXISTING ROAST
router.get('/roast/:id/delete', roast_controller.roast_delete_get);

router.post('/roast/:id/delete', roast_controller.roast_delete_post);

// READ (AT END TO PREVENT OVERRIDING OTHER ROUTES)
router.get('/roast/:id', roast_controller.roast_detail);

router.get('/roasts', roast_controller.roast_list);

// FINAL EXPORT
module.exports = router;
