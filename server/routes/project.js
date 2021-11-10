// Importando router
import { Router } from 'express';

// Importar el controlador de proyectos
import projectController from '@server/controllers/projectController';

// Creando la instancia de un router
const router = new Router();

// "/projects/index"
router.get(['/', '/index'], projectController.index);

// "/projects" "/projects/add"
router.get('/add', projectController.add);

export default router;
