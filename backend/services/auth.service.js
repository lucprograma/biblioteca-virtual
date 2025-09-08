import sequelize from '../config/db.js';
import User from '../models/Users.js';
import bcrypt from 'bcryptjs';
import transporter from '../extra_services/nodemailer.js';

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
      console.log('Datos recibidos en servicio registerUser:', { name, email, password, role, course, dni });
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
      const disablequery = "UPDATE users SET is_active = FALSE WHERE user_id = ?";
      const result = await sequelize.query(disablequery, { replacements: [userId]});
      return result;
    }catch(error){
      console.log(error);
    }
  }


  async patchUser(userId, data, hashedPassword) {
    try {
      const fields = [];
      const values = [];
      const patchUser = {

        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
        course: data.course,
        dni: data.dni,
        has_certificate: data.has_certificate

      }

      for (const [key, value] of Object.entries(patchUser)){

            value !== undefined ? (
              key === 'password' ?
                fields.push(`password = ?`) & values.push(value) :
                fields.push(`${key} = ?`) & values.push(value)
            ) : '';
        }

      if (fields.length === 0) {
        throw new Error('No se enviaron campos válidos para actualizar');
      }      
      
      const sql = ` UPDATE users SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?`; 
      values.push(userId);
      const [result] = await sequelize.query(sql, { replacements: values });

      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async activateUser(userId){

    try {
      const sql = `
      UPDATE users SET is_active = NOT is_active, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?;
      SELECT email, is_active FROM users WHERE user_id = ?;
      `;
      const [result] = await sequelize.query(sql, {
        replacements: [userId, userId],
        multipleStatements: true
      });

      let [email, state] = [ result[1][0]['email'], result[1][0]['is_active'] ];

      await transporter.sendMail({
        from: 'profesoresinstituto2@hotmail.com',
        to: `${email}`,
        subject: `Cuenta ${state ? '' : 'des'}activada`,
        text: `Biblioteca Digital del I.S.F.D. y T. Nº 2 de Azul.
              Tu cuenta de usuario ha sido ${state ? '' : 'des'}activada.
              Ya ${state ? '' : 'no'} podés acceder a tu Carnet Digital Estudiantil y participar en los foros bibliográficos.
              ${state ?
                'Ir a la Biblioteca Digital: localhost:5173.com (ejemplo)' :
                'Solicita la activación de tu cuenta al centrodeestudiantes@ejemplo.com enviando tu número de DNI.'}
              `,
        html: `
          <div>
            <h1>Biblioteca Digital del I.S.F.D. y T. Nº 2 de Azul</h1>
              <strong>Tu cuenta de usuario ha sido ${state ? '' : 'des'}activada.</strong>
              <p>Ya ${state ? '' : 'no'} podés acceder a tu Carnet Digital Estudiantil y participar en los foros bibliográficos.</p>
              <p>${state ?
                'Ir a la <a href="http://localhost:5173/">Biblioteca Digital</a>' :
                'Solicita la activación de tu cuenta al <a href="centrodeestudiantes@ejemplo.com">centrodeestudiantes@ejemplo.com</a> enviando tu número de DNI.'}</p>
          </div>
        `
      });
      
      return result;
    } catch (err){
      throw new Error(err.message);
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
