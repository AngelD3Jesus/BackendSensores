const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

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