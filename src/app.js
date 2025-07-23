const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const alertaRoutes = require('./routes/sensor.routes');
const inventarioRoutes = require('./routes/inventario.routes');
const sensorRoutes = require('./routes/sensor.routes');
const socketHandler = require('./socket');
const { setSocketInstance } = require('./controllers/sensor.controller');
const userRoutes = require('./routes/user.routes');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketHandler(server);
setSocketInstance(io);

const PORT = process.env.PORT || 3100;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rutas
app.use('/api/alertas', alertaRoutes);
app.use('/api/inventario', inventarioRoutes);
app.use('/api/user', userRoutes);
app.use('/api', sensorRoutes); // Para POST /api/alertas desde sensores

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Conectado a MongoDB');
  server.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error('❌ Error de conexión a MongoDB:', err.message);
});