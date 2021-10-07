module.exports = {
    //Archivo de entrada
    entry: './client/index.js', 
    // Archivo de salida
    output: {
        path: '/public', //3 Ruta absoluta de salida
        filename: 'bundle.js' //4 Nombre del archivo de salida
    },
    devServer : {
        static: './public'
    }
}