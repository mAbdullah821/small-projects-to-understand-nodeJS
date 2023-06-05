const express = require('express');
const userControllers = require('../controllers/user-controllers');

const router = express.Router();

router.get('/logout/:type', userControllers.logout);

module.exports = router;
