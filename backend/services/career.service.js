import sequelize from '../config/db.js';
import Career from '../models/Career.js';


class CareerService {

async getAllCareer() {
  const career = await Career.findAll({
   attributes : ['id_course','name' ]
  });
  return career;
}
}

export default new CareerService();