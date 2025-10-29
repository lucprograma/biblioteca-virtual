import sequelize from '../config/db.js';
import Career from '../models/Career.js';


class CareerService {

async getAllCareer() {
  const career = await Career.findAll({
   attributes : ['id_course','name' ]
  });
  return career;
}

async registerCareer({ name}) {
    try {
      //console.log('Datos recibidos en servicio registerCareer:', { name });
      const exists = await Career.findOne({ where: {name} });
      if (exists) throw new Error('El nombre ya está registrado');
     
   
      const user = await Career.create({
        name
      
      });       
      console.log('Nombre carrera creado:', user.toJSON());

      return Career;
    } catch (error) {
      throw new Error('Error en registerCareer: ' + error.message);
    }
  }



async patchCourse(id, data) {
  try {
    const fields = [];
    const values = [];

    
    if (data.name !== undefined) {
      fields.push('name = ?');
      values.push(data.name);
    }

    if (fields.length === 0) {
      throw new Error('No se enviaron campos válidos para actualizar');
    }

 
    const sql = `
      UPDATE course
      SET ${fields.join(', ')}, created_at = CURRENT_TIMESTAMP
      WHERE id_course = ?
    `;
    
    values.push(id);

    const [result] = await sequelize.query(sql, {
      replacements: values,
    });

    return result;
  } catch (err) {
    throw new Error(err.message);
  }
}

}

export default new CareerService();