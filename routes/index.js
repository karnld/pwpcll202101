var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', author: 'Karen López', appName: 'WebApp', company: 'Awesome software' });
});

/* Agregando una nueva ruta */
router.get('/greeting', function(req, res, next){
  res.status(200).json({message: 'Hola Campeon de la fullstack Web'})
})

module.exports = router;
