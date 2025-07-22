const Alerta = require('../models/alerta');

let ioInstance;

// Recibir instancia de socket.io
const setSocketInstance = (io) => {
  ioInstance = io;
};

// POST /api/alertas
const recibirSensor = async (req, res) => {
  try {
    const { sensor, valor, dispositivo } = req.body;

    if (!sensor || typeof valor !== 'number' || !dispositivo) {
      return res.status(400).json({ error: 'Datos inválidos' });
    }

    // Umbrales para humo y gas
    const umbrales = {
      humo: 2000,
      gas: 2500
    };

    // Si el sensor es temperatura, guardar sin alertas
    if (sensor === 'temperatura') {
      const nuevaLectura = new Alerta({
        sensor,
        valor,
        mensaje: `Temperatura registrada`,
        dispositivo
      });

      await nuevaLectura.save();
      return res.status(200).json({ lectura: nuevaLectura });
    }

    // Para sensores de humo o gas con alertas
    if (valor >= umbrales[sensor]) {
      const nuevaAlerta = new Alerta({
        sensor,
        valor,
        mensaje: `¡${sensor.toUpperCase()} detectado!`,
        dispositivo
      });

      await nuevaAlerta.save();

      if (ioInstance) {
        ioInstance.emit(`alerta${sensor.charAt(0).toUpperCase() + sensor.slice(1)}`, {
          sensor,
          valor,
          mensaje: nuevaAlerta.mensaje,
          fecha: nuevaAlerta.fecha,
          dispositivo
        });
      }

      return res.status(200).json({ alerta: nuevaAlerta });
    }

    res.status(200).json({ mensaje: 'Sin alerta' });
  } catch (error) {
    console.error('Error en alerta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// GET /api/alertas/ultimas/:tipo
const obtenerUltimasAlertasPorTipo = async (req, res) => {
  try {
    const tipo = req.params.tipo;

    const alertas = await Alerta.find({ sensor: tipo })
      .sort({ fecha: -1 }) // más recientes primero
      .limit(5);

    res.status(200).json(alertas);
  } catch (error) {
    console.error('Error al obtener alertas por tipo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// GET /api/alertas/semana
const obtenerAlertasUltimaSemana = async (req, res) => {
  try {
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() - 7); // Últimos 7 días

    const alertas = await Alerta.find({
      fecha: { $gte: fechaLimite }
    }).sort({ fecha: -1 });

    res.status(200).json(alertas);
  } catch (error) {
    console.error('Error al obtener alertas semanales:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  recibirSensor,
  setSocketInstance,
  obtenerUltimasAlertasPorTipo,
  obtenerAlertasUltimaSemana
};
