// Importando router
import { Router } from 'express';

// Importando al controlador home
import homeController from '@server/controllers/homeController';

// Creando la instancia de un router
const router = new Router();

// GET ´/´
router.get(['/', '/index'], homeController.index);

// GET '/greeting'
router.get('/greeting', homeController.greeting);

// GET '/about'
router.get('/about', homeController.about)

// Exportando el router que maneja las subrutas
// para el controlador Home
export default router;
