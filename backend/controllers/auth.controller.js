import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/Users.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { user_id: user.user_id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
    httpOnly: true,
    secure: false, 
    sameSite: 'Strict',
    maxAge: 60 * 60 * 1000 // 1 hora antes de expirar
  });

    res.json({ msg: 'Login exitoso' });

  } catch (error) {
    res.status(500).json({ message: 'Error en login', error: error.message });
  }
};

export const register = async (req, res) => {
  const { name, email, password, role, dni } = req.body;

  try {
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: 'El email ya está registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      dni
    });

    res.status(201).json({ message: 'Usuario registrado correctamente', user_id: user.user_id });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar', error: error.message });
  }
};
