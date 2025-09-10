export default function checkAdmin(req, res, next) {
  try {
    console.table(req.user)
    if (req.user && req.user.role === 'admin') {
      return next(); // El usuario es admin, continúa
    }
    return res.status(403).json({ message: 'Acceso denegado: solo para administradores' });
  } catch (err) {
    return res.status(500).json({ message: 'Error al verificar el rol' });
  }
};


