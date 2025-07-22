const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const sensorRoutes = require('./routes/sensor.routes');
const socketHandler = require('./socket');
const { setSocketInstance } = require('./controllers/sensor.controller');

dotenv.config(); // ⬅️ Cargar variables del .env

const app = express();
const server = http.createServer(app);
const io = socketHandler(server);
setSocketInstance(io);

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api', sensorRoutes);

// Conexión a la base de datos
connectDB();

// Puerto
const PORT = process.env.PORT || 3100;

server.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
