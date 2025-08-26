import sequelize from '../config/db.js';
import User from '../models/Users.js';
import bcrypt from 'bcryptjs';

class AuthService {

//busca por id
async getUserById(id) {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] }
  });
  return user;
}

//trae todos usuarios
async getAllUsers() {
  const users = await User.findAll({
    attributes: { exclude: ['password'] }
  });
  return users;
}

async getLastLogins() {
  const logins = await User.findAll({
    attributes : ['user_id','last_login' ]
  })

  return logins;
}



//funcion registro
async registerUser({ name, email, password, role,course, dni }) {
    try {
      console.log('Datos recibidos en servicio registerUser:', { name, email, password, role,course, dni });
      const exists = await User.findOne({ where: { email } });
      if (exists) throw new Error('El email ya está registrado');
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        course,
        dni
       
      });       
      console.log('Usuario creado:', user.toJSON());
      return user;
    } catch (error) {
      throw new Error('Error en registerUser: ' + error.message);
    }
  }

  //funcion patch

  async DisableUser(userId){
    try{
      const disablequery = "UPDATE users SET is_active = FALSE WHERE user_id = " +userId;
      const result = await sequelize.query(disablequery);
      return result;
    }catch(error){
      console.log(error);
    }
  }


  async patchUser(userId, data,hashedPassword) {
    try {
      const fields = [];
      const values = [];
      if (data.name) {
        fields.push('name = ?');
        values.push(data.name);
      }
      if (data.email) {
        fields.push('email = ?');
        values.push(data.email);
      }
      if (hashedPassword) {
        fields.push('password = ?');
        values.push(hashedPassword);
      }
      if (data.role) {
        fields.push('role = ?');
        values.push(data.role);
      }
      if (data.course) {
        fields.push('course = ?');
        values.push(data.course);
      }
      if (data.dni) {
        fields.push('dni = ?');
        values.push(data.dni);
      }
      if (typeof data.has_certificate !== 'undefined') {
  fields.push('has_certificate = ?');
  values.push(data.has_certificate === true || data.has_certificate === 'true' ? 1 : 0);
}//tenia error en mysql  al enviar true o false asi que setea por 1 o 0

if (typeof data.is_active !== 'undefined') {
  fields.push('is_active = ?');
  values.push(data.is_active === true || data.is_active === 'true' ? 1 : 0);
}//tenia error en mysql  al enviar true o false asi que setea por 1 o 0

      if (fields.length === 0) {
        throw new Error('No se enviaron campos válidos para actualizar');
      }      
      
      const sql = ` UPDATE users SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ? `; 
      values.push(userId);
      const [result] = await sequelize.query(sql, { replacements: values });
      return result;
    } catch (err) {
      throw new Error('Error al actualizar el perfil: ' + err.message);
    }
  }

async deleteUser(userId) {
    try {
      const user = await User.findByPk(userId);
      if (!user) throw new Error('Usuario no encontrado');
      await user.destroy();
      return { message: 'Usuario eliminado correctamente' };
    } catch (error) {
      throw new Error('Error al eliminar el usuario: ' + error.message);
    }
  }

// logout 
logout(res) {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false, // cambiar a true si usás HTTPS en producción
    sameSite: 'Strict'
  });
  return { message: 'Sesión cerrada correctamente' };
}


}

export default new AuthService();
