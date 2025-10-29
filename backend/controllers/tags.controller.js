// controllers/tags.controller.js
import TagsService from '../services/tags.service.js';

// GET /api/tags
export async function getAllTags(req, res) {
  try {
    const tags = await TagsService.getAllTags();
    return res.status(200).json(tags);
  } catch (error) {
    console.error('Error en getAllTags:', error);
    return res.status(500).json({ message: 'Error al obtener los tags' });
  }
}

// POST /api/tags
export async function createTag(req, res) {
  try {
    const name = (req.body?.name || '').trim();
    if (!name) {
      return res.status(400).json({ message: 'El nombre del tag es obligatorio' });
    }

    const tag = await TagsService.registerTag({ name });

    return res.status(201).json({
      message: 'Tag creado correctamente',
      tag_id: tag.tag_id,
      name: tag.name,
    });
  } catch (error) {
    
    console.error('Error en createTag:', error);
    return res.status(500).json({ message: error.message });
  }
}
