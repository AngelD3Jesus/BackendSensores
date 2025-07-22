const express = require('express');
const router = express.Router();
const { recibirSensor } = require('../controllers/sensor.controller');

router.post('/alertas', recibirSensor);

module.exports = router;
