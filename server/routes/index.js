// Importando el router de home
import homeRouter from './home';
// Importando router de users
import userRouter from './user';

// Agregando las rutas a la aplicación 
const addRoutes = (app) => {
  app.use('/', homeRouter);
  app.use('/user', userRouter);
  return app;
};

export default {
 addRoutes,
}
