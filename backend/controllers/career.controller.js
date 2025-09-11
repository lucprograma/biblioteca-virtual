import CareerService from '../services/career.service.js';

export async function getAllCareer(req, res) {
  try {
    const careers = await CareerService.getAllCareer();
    return res.status(200).json(careers);
  } catch (error) {
    console.error('Error en getAllCareer:', error);
    return res.status(500).json({ message: 'Error al obtener las carreras' });
  }
}
