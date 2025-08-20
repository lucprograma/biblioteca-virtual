import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/Users.js';

<<<<<<< Updated upstream
=======
//controlador get por id o todo


function hasTimeLimitPassed(originalDate) {
  const dateToCheck = new Date(originalDate); // Create a mutable copy
  dateToCheck.setMonth(dateToCheck.getMonth() + 6); // Add one month

  const now = new Date(); // Current date and time

  return dateToCheck <= now; // True if a month has passed
}

//LLAMA A CRON, SETEA LA VERIFICACION Y BAJA DE INACTIVIDAD DE USUARIOS CADA NOCHE A LAS 3 AM

export const startCronCheckUp = async () => {
      console.log("Ejecutando revision periodica de usuarios inactivos");
  cron.schedule("* 3 * * *",()=>{
    console.log("Revisando usuarios inactivos")
    disableInactiveUsers();

  })
}

export const disableInactiveUsers = async (req, res) => 
{

  let logins 
  logins = await authService.getLastLogins();
  console.log(logins)
  logins.forEach(login => {
    if(hasTimeLimitPassed(login.last_login)){
      console.log("INTENTANDO DAR DE BAJA "+login.user_id)
      authService.DisableUser(String(login.user_id))
    }; // Si usuario no loggeo hace 6 meses o mas
  });



  }

//controlador get por id o todo
export const getUsersAdmin = async (req, res) => {
  try {
    const { user_id } = req.body;
    //console.log('ID recibido en getUsersAdmin:', user_id);
    if (user_id) {
      const user = await User.findByPk(user_id, {
        attributes: { exclude: ['password'] }
      });
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      return res.json(user);
    }else{
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
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======

//controlador patch
export const updateProfile = async (req, res) => {
  try {  
   
    let userId =  req.body?.user_id ||req.user?.user_id ;// viene del token o req body
    //console.log('userId:', userId);
    //console.log(' body:', req.body);
   
    //console.log ('ID del usuario a actualizar controlador:', userId);
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


>>>>>>> Stashed changes
