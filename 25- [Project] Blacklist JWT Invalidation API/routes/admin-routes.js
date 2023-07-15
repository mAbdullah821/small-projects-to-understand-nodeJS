const express = require('express');
const adminControllers = require('../controllers/admin-controllers');
const router = express.Router();

router.get('/invalidate/:type/:userId', adminControllers.invalidateUsers);

module.exports = router;
