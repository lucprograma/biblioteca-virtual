import { Tag } from '../models/index.js';


class TagService {

  async getAllTags() {
      const tags = await Tag.findAll(
        {
          order: [[ 'name' ]]
        }
      );
            
      return tags;
    }


  async registerTag({ name }) {
      try {
        console.log('Dato recibido en servicio registerTag:', { name });

        // Verificar si ya existe un tag con ese nombre
        const exists = await Tag.findOne({ where: { name } });
        if (exists) throw new Error('El tag ya existe');

        // Crear el nuevo tag
        const tag = await Tag.create({ name });

        console.log('Tag creado:', tag.toJSON());

        return tag;
      } catch (error) {
        throw new Error('Error en registerTag: ' + error.message);
      }
  }


  async updateTag({ newName, id }) {
    
    try {

      const exists = await Tag.findOne({ where: { name: newName }});
      if (exists) throw new Error('El nombre ya existe.');

      const tag = await Tag.update(
        { name: newName },
        { where: { tag_id: id } }
      );
      
      return tag;
    } catch(err) {
      throw new Error('Error en actualizar el nombre del tag: ' + err.message)
    }
  }


  async deleteTag({ id }) {
    
    try {
      
      const exists = await Tag.findOne({ where: { tag_id: id }});
      if (!exists) throw new Error('El tag no existe.');

      const tag = await Tag.destroy(
        { where: { tag_id:  id  } }
      );
      console.log(tag)
      return tag;
    } catch(err) {
      throw new Error('Error al eliminar el tag: ' + err.message)
    }
  }

}

export default new TagService();