import careerService from '../services/career.service.js';
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

export const NewCareer = async (req, res) => {
  
  const { name } = req.body;

  try {
    //const exists = await Career.findOne({ where: { course }, attributes: ["name"] });
    //if (exists) return res.status(400).json({ message: 'El Nombre ya está registrado' });

   

    const Career = await CareerService.registerCareer({
      name
    });

    res.status(201).json({ message: 'Carrera registrada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCareer = async (req, res) => {
  try {
   
    const { id } = req.params;
    const data = req.body;
  
    const affectedRows = await CareerService.patchCourse(id, data);

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'no hubo cambios' });
    }

    return res.status(200).json({ message: 'Carrera actualizada correctamente' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

