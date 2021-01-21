const express = require('express');
const router = express.Router();

const some_controller = require('../controllers/someController');

router.get('/', some_controller.someControllerFunction);

module.exports = router;
