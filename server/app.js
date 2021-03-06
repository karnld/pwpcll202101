/* eslint-disable no-console */
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import winston from '@server/config/winston';

// Importando el Router principal

import router from '@server/routes/index';

// Importing configurations
import configTemplateEngine from '@s-config/template-engine';

// Webpack modules
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevConfig from '../webpack.dev.config';

// Consultar el modo en que se está ejecutando la operación
const env = process.env.NODE_ENV || 'development';

// Se crea la aplicación express
const app = express();

// Verificando el modo de ejecición de la aplicación
if (env === 'development') {
  console.log('> Excecuting in Development Mode: Webpack Hot Realoading');
  // Paso 1. Agregando la ruta del HMR
  // reload=true: habilita la recarga del front-end cuando hay cambios en el códgo fuente del front end
  // timeour=1000: Tiempo de espera entre recarga y recarga de la página
  webpackDevConfig.entry = [
    'webpack-hot-middleware/client?reload=true&timeout=1000',
    webpackDevConfig.entry,
  ];

  // PAso 2. Agregamos el plugin
  webpackDevConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  // Paso 3. Crear el compilador de webpack
  const compiler = webpack(webpackDevConfig);

  // Paso 4. Agregando el middleware a la cadena de Middlewares a la cadena de la aplicación
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackDevConfig.output.publicPath,
    })
  );

  // Paso 5. Agregando webpack hot middleware
  app.use(webpackHotMiddleware(compiler));
} else {
  console.log('>Excecuting in Production Mode...');
}

// view engine setup
configTemplateEngine(app);

app.use(morgan('dev', { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Instalando el enrutador principal a
// la aplicación express
router.addRoutes(app);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  // log
  winston.error(
    `Code: 404, Message: Page Not Found, URL: ${req.originalUrl}, Method: ${req.method}`
  );
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // logeando con winston
  winston.error(
    `status: ${err.status || 500}, Message: ${err.message}, Method: ${
      req.method
    }, IP:${req.ip}`
  );

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
