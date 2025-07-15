import sequelize from '../config/db.js';
import News from '../models/News.js';


class NewsService {
async addNews({ title, content, author_id }) {
    try {
      //console.log('Datos recibidos en servicio addnews:', { title, content, author_id });
        const news = await News.create({
            title,
            content,
            author_id
            });
        //console.log('Noticia creada:', news.toJSON());       
        return news;
    } catch (error) {
        throw new Error('Error al crear noticia: ' + error.message);
    }
  }

   async patchNews(news_id, data) {
      try {
        const fields = [];
        const values = [];
        if (data.title) {
          fields.push('title = ?');
          values.push(data.title);
        }
        if (data.content) {
          fields.push('content = ?');
          values.push(data.content);
        }
        if (data.author_id) {
          fields.push('author_id = ?');
          values.push(data.author_id);
        }
       
  
        if (fields.length === 0) {
          throw new Error('No se enviaron campos válidos para actualizar la noticia');
        }      
        
        const sql = ` UPDATE news SET ${fields.join(', ')}, published_at = CURRENT_TIMESTAMP WHERE news_id = ? `; 
        values.push(news_id);
        const [result] = await sequelize.query(sql, { replacements: values });
        return result;
      } catch (err) {
        throw new Error('Error al actualizarla noticia service: ' + err.message);
      }
    }
   
async deleteNews(news_id) {
    try {
      const news = await User.findByPk(news_id);
      if (!news) throw new Error('Noticia no encontrada service');
      await News.destroy();
      return { message: 'Noticia eliminada correctamente service' };
    } catch (error) {
      throw new Error('Error al eliminar el usuario service: ' + error.message);
    }
  }
 //service get news por id
async getNewsById(news_id) {
    try {
      const news = await News.findByPk(news_id);
      if (!news) throw new Error('Noticia no encontrada service');
      return news;
    } catch (error) {
      throw new Error('Error al obtener la noticia por ID service: ' + error.message);
    }
  }
//service get news todo
 async getAllNews() {
    try {
      const news = await News.findAll();
      if (!news || news.length === 0) throw new Error('No se encontraron noticias service');
      return news;
    } catch (error) {
      throw new Error('Error al obtener todas las noticias service: ' + error.message);
    }
  }


}
export default new NewsService();