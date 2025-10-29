// controllers/tags.controller.js
import TagService from '../services/tag.service.js';

// GET /api/tags
export async function getAllTags(req, res) {
  try {
    const tags = await TagService.getAllTags();
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

    const tag = await TagService.registerTag({ name });

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


export async function updateTag(req, res) {

  try {
    const { newName, id } = req.body

    const result = await TagService.updateTag({ newName, id });
    if (!result) res.status(400).json("Error al actualizar tag.")

    res.status(201).json("Nombre de tag actualizado.")
  } catch(err) {

    console.error("Error al actualizar el tag.");
    res.status(500).json({ message: err.message });
  }
}


export async function deleteTag(req, res) {
  try {
    const { id } = req.body;

    const result = await TagService.deleteTag({ id });
    if (!result) res.status(400).json("Error al eliminar el tag.")

    res.status(201).json("Tag eliminada correctamente.")
  } catch(err) {

    console.error("Error al eliminar el tag.");
    res.status(500).json({ message: err.message });
  }
}