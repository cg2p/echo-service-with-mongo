const express = require('express');
const router = express.Router();

// Require the controllers
const ping_controller = require('../controllers/ping.controller');

router.get('/', ping_controller.ping);
router.post('/echo', ping_controller.echo);

module.exports = router;
