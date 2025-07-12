import authService from '../services/auth.service.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/Users.js';

//controlador login
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

//controlador crear usuarios
export const register = async (req, res) => {
  const { name, email, password, role, dni } = req.body;
  try {
    const user = await authService.registerUser({ name, email, password, role, dni });
    res.status(201).json({ message: 'Usuario registrado correctamente', user_id: user.user_id });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar', error: error.message });
  }
};

//controlador patch
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.user_id; // viene del token
    const data = req.body; 
    let hashedPassword = null;//declaro variable    
    if (data.password) {
      hashedPassword = await bcrypt.hash(data.password, 10);//si manda pasword se hashea
    }
    const affectedRows = await authService.patchUser(userId, data, hashedPassword);//manda variables al service
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'No se encontró el usuario o no hubo cambios' });
    }
    res.json({ message: 'Perfil actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el perfil: ' + error.message });
  }
};
//controlador eliminar usuario por body , para uso rol administrador
export const deleteProfile = async (req, res) => {
  try {
    
    const userId = req.body.user_id; // viene del token
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    await user.destroy();
    res.json({ message: 'Perfil eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el perfil: ' + error.message });
  }
};

//controlador eliminar por id, eliminar la propia cuenta
export const deleteThis = async (req, res) => {
  try {
    
    const userId = req.user.user_id; // viene del token
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    await user.destroy();
    res.json({ message: 'Perfil eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el perfil: ' + error.message });
  }
}

// controlador logout
export const logout = (req, res) => {
  try {
    const response = authService.logout(res);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Error al cerrar sesión', error: error.message });
  }
};
