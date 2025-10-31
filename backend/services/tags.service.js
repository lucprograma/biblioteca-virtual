import sequelize from '../config/db.js';
import Tags from '../models/Tags.js';
//import bcrypt from 'bcryptjs';


class TagsService {

    async getAllTags() {
        const tags = await Tags.findAll({
          attributes: { exclude: [''] }
        });
        return tags;
      }


async registerTag({ name }) {
    try {
      console.log('Dato recibido en servicio registerTag:', { name });

      // Verificar si ya existe un tag con ese nombre
      const exists = await Tags.findOne({ where: { name } });
      if (exists) throw new Error('El tag ya existe');

      // Crear el nuevo tag
      const tag = await Tags.create({ name });

      console.log('Tag creado:', tag.toJSON());

      return tag;
    } catch (error) {
      throw new Error('Error en registerTag: ' + error.message);
    }
  }


}

export default new TagsService();