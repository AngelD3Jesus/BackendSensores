const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validación básica
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Verificar si ya existe el email o username
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario o email ya está en uso' });
    }

    // Crear y guardar el nuevo usuario
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'Usuario creado correctamente' });
  } catch (error) {
    console.error('❌ Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      mustChangePassword: user.mustChangePassword
    });
  } catch (err) {
    res.status(500).json({ message: 'Error en login', error: err.message });
  }
};

const changePassword = async (req, res) => {
  const { username, oldPassword, newPassword, email } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) return res.status(401).json({ message: 'Contraseña actual incorrecta' });

    user.password = newPassword;
    user.email = email; // Actualiza el correo
    user.mustChangePassword = false;
    await user.save();

    res.json({ message: 'Contraseña y correo actualizados correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al cambiar contraseña', error: err.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    user.password = newPassword;
    user.mustChangePassword = true;
    await user.save();

    res.json({ message: 'Contraseña restablecida. Inicia sesión con la nueva contraseña.' });
  } catch (err) {
    res.status(500).json({ message: 'Error al restablecer contraseña', error: err.message });
  }
};

module.exports = {
    register,
  login,
  changePassword,
  forgotPassword
};
