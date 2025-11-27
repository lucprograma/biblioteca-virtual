import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/Users.js';
import { CronJob } from 'cron';
import authService from '../services/auth.service.js';
import { where } from 'sequelize';
//controlador get por id o todo


function hasTimeLimitPassed(originalDate) {
  const dateToCheck = new Date(originalDate); // Create a mutable copy
  dateToCheck.setMonth(dateToCheck.getMonth() + 6); // Add six months

  const now = new Date(); // Current date and time

  return dateToCheck <= now; // True if six months has passed
}

//LLAMA A CRON, SETEA LA VERIFICACION Y BAJA DE INACTIVIDAD DE USUARIOS CADA NOCHE A LAS 3 AM

export const startCronCheckUp = async () => {

    const task = new CronJob("0 0 * * 0",
    () => {
      disableInactiveUsers();
    },
    null,
    true,
    "America/Argentina/Buenos_Aires"
)
}

export const disableInactiveUsers = async (req, res) => 
{

  let logins 
  logins = await authService.getLastLogins();
  console.log(logins)
  logins.forEach(login => {
    if(hasTimeLimitPassed(login.last_login)){
      console.log("INTENTANDO DAR DE BAJA AL USUARIO CON ID: " + login.user_id)
      authService.activateUser();
    }; // Si usuario no loggeo hace 6 meses o mas
  });



  }
// Obtener usuarios inactivos
export const getUnactive = async (req, res) => {
  try {
    // Cuando el atributo is_active es falso se obtienen los usuarios
    const unactiveUsers = await User.findAll({
      where: { is_active: false },
      attributes: ['email', 'name', 'user_id', 'is_active'],
    });

    if (unactiveUsers.length === 0) {
      return res.status(404).json({
        message: 'No se encontraron usuarios inactivos',
      });
    }

    console.table(unactiveUsers.map(u => u.toJSON())); // Para ver bien los datos
    return res.status(200).json(unactiveUsers);
  } catch (error) {
    console.error("Error en getUnactive:", error);
    res.status(500).json({ 
      message: 'Error al obtener usuarios', 
      error: error.message 
    });
  }
};

//controlador get por id o todo
export const getUsersAdmin = async (req, res) => {
  try {
    const  user_id  = req.body?.user_id || null;
    if (user_id) {
      const user = await User.findByPk(user_id, {
        attributes: { exclude: ['password'] }
      });
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      return res.json(user);
    } else{
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    if (!users) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
    res.json(users);}

  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
};



//controlador login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email }, attributes: ["email", "password", "role", "user_id", "name", "course", "dni"]});
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { user_id: user.user_id, email: user.email, role: user.role, name: user.name, course: user.course, dni: user.dni },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
    httpOnly: true,
    secure: false, 
    sameSite: 'lax',
    maxAge: 60 * 60 * 1000 // 1 hora antes de expirar
  });

    res.json({ msg: 'Login exitoso' });

  } catch (error) {
    res.status(500).json({ message: 'Error en login', error: error.message });
  }
};

export const register = async (req, res) => {
  
  const { name, email, password, role, course, dni } = req.body;

  try {
    const exists = await User.findOne({ where: { email }, attributes: ["email"] });
    if (exists) return res.status(400).json({ message: 'El email ya está registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      course,
      dni
    });

    res.status(201).json({ message: 'Usuario registrado correctamente', user_id: user.user_id });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar', error: error.message });
  }
};

//controlador patch
export const patchProfile = async (req, res) => {
  try {  
   
    let userId =  req.body?.user_id ||req.user?.user_id ;// viene del token o req body
    console.log('userId:', userId);
    console.log(' body:', req.body);
   
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

export const activateUser = async (req, res) => {
  try {  
   
    let userId = req.body.user_id;
    const affectedRows = await authService.activateUser(userId);

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'No se encontró el usuario o no hubo cambios' });
    }

    res.json({ message: `Usuario ${affectedRows[1][0]['is_active'] ? '' : 'des'}activado correctamente` });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el estado la cuenta: ' + error.message });
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
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el Usuario: ' + error.message });
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