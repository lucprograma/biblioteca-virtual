import jwt from 'jsonwebtoken';

const chktoken = (req, res, next) => {
     //console.log('Cookies recibidas:', req.cookies);
  const token = req.cookies.token;
  //console.log('Token recibido:', token);
  if (!token) return res.status(403).send('Token no proporcionado');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica y decodifica
    req.user = decoded; // Agregamos el usuario al request
    //console.log('Usuario autenticado:', req.user);  
    next(); // Sigue al siguiente middleware/controlador
  } catch (error) {
    return res.status(403).send('Token inválido: ' + error.message);
  }
};

export default chktoken;
