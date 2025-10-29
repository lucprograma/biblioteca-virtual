import sequelize from './db.js';
import { startCronCheckUp } from '../../controllers/auth.controller.js';

function authConectionDB(app) {

    sequelize.authenticate()
    .then(() => {

        console.log('Conexión exitosa a MySQL, levantando servidor...');
        app.listen(3000, "0.0.0.0", () => {

            console.log('Servidor escuchando en http://localhost:3000');
            startCronCheckUp();
        });
    })
    .catch((err) => {
        console.error('Error de conexión a la BD:', err.message);
    });
}

export default authConectionDB;