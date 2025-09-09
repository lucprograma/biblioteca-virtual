// Controlador para crear noticias
export const addNews = async (req, res) => {  
  const author_id = req.user.user_id;           
  const { title, content } = req.body;
  
  // Multer guarda el archivo en req.file
  const image = req.file ? `uploads/news/${req.file.filename}` : null;

  try {
    const news = await newsService.addNews({ title, content, author_id, image });
    res.status(201).json({ message: 'Noticia Creada', title, image });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear Noticia', error: error.message });
  }
};

// Controlador para actualizar noticias
export const updateNews = async (req, res) => {
  try {  
    const news_id = req.body?.news_id; // obtener id de noticia por body
    const data = { ...req.body }; // datos del body

    if (req.file) {
      data.image = `uploads/news/${req.file.filename}`;
    }

    const affectedRows = await newsService.patchNews(news_id, data);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'No se pudo actualizar la noticia' });
    }
    res.json({ message: 'Noticia actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar noticia: ' + error.message });
  }
};
