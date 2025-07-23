import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import alertaRoutes from './routes/sensor.routes.js';
import inventarioRoutes from './routes/inventario.routes.js';
import sensorRoutes from './routes/sensor.routes.js';
import socketHandler from './socket.js';
import { setSocketInstance } from './controllers/sensor.controller.js';
import userRoutes from './routes/user.routes.js';


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
mongoose.connect(process.env.MONGO_URI, {
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