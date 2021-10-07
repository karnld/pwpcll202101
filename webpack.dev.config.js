const path = require('path');
module.exports = {
    // Modo cofigurador
    mode: 'development',
    // Archivo de entrada
    entry: './client/index.js',
    // Especificando la salida
    output: {
        //Salida
        path: path.join(__dirname, 'public'),
        //Nombre de salida
        filename: 'js/bundle.js',
        // Ruta del path publico para fines del servidor de desarrollo
        publicPath: '/'
    },
    devServer: {
        static: path.join(__dirname, 'public'),
        port: 8085,
        host: 'localhost'
    }
}