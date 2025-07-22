const express = require('express');
const router = express.Router();
const {
  recibirSensor,
  obtenerUltimasAlertasPorTipo,
  obtenerAlertasUltimaSemana
} = require('../controllers/sensor.controller');

// Recibe datos del sensor (POST)
router.post('/alertas', recibirSensor);

// Últimas 5 alertas por tipo (GET)
router.get('/alertas/ultimas/:tipo', obtenerUltimasAlertasPorTipo);

// Todas las alertas de la última semana (GET)
router.get('/alertas/semana', obtenerAlertasUltimaSemana);

module.exports = router;

