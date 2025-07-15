import newsService from '../services/news.service.js';
import News from '../models/News.js';



//controlador crear noticias
export const addNews = async (req, res) => {  
    const author_id = req.user.user_id;           
  const { title,content } = req.body;
  try {
    const news = await newsService.addNews({ title, content, author_id });
    res.status(201).json({ message: 'Noticia Creada', title });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear Noticia', error: error.message });
  }
};


export const updateNews = async (req, res) => {
  try {  
   
    let news_id =  req.body?.news_id; //obtener id de noticia por body   
    const data = req.body;     
    const affectedRows = await newsService.patchNews(news_id, data);//manda variables al service
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'No se pudo actualizar la noticia' });
    }
    res.json({ message: 'Noticia actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar noticia: ' + error.message });
  }
};

//controlador noticias
export const getNews = async (req, res) => {
  try {
    const news_id = req.body?.news_id;//para buscar por id desde el body
    let news;
    if (news_id) {
      news = await newsService.getNewsById(news_id);
    } else {
      news = await newsService.getNews();
    }
    if (!news || (Array.isArray(news) && news.length === 0)) {
      return res.status(404).json({ message: 'No se encontraron noticias' });
    }
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener noticias: ' + error.message });
  }
};


//controlador delete
export const deleteNews = async (req, res) => {
  try {
    
    const news_id = req.body.news_id; 
    const news = await News.findByPk(news_id);
    if (!news) return res.status(404).json({ message: 'Noticia no encontrada' });
    await news.destroy();
    res.json({ message: 'Noticia eliminada ' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar noticia:' + error.message });
  }
};