const checkAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.role === 'admin') {
      return next(); // El usuario es admin, continúa
    }
    return res.status(403).json({ message: 'Acceso denegado: solo para administradores' });
  } catch (err) {
    return res.status(500).json({ message: 'Error al verificar el rol' });
  }
};

export default checkAdmin;
