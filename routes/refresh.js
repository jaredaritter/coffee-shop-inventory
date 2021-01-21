const express = require('express');
const router = express.Router();

const refresh_router = require('../controllers/refreshController');

router.get('/', refresh_router.index);

router.get('/otherExport', refresh_router.otherExport);

module.exports = router;
