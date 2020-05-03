const express = require('express');
const router = express.Router();

// Require the controllers
const echo_controller = require('../controllers/echo.controller');

router.get('/', echo_controller.ping);
router.post('/echo', echo_controller.echo);
router.post('/reverse', echo_controller.reverse);

module.exports = router;
