const { appendFileSync } = require('fs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        'modules': false,
                                        'useBuiltIns': 'usage',
                                        'targets': {"chrome": "80"},
                                        'corejs': 3
                                    }
                                ]
                            ],
                            "plugins": [
                                [
                                    "module-resolver", 
                                    {
                                        "root": ["./"],
                                        "alias": {
                                            "@client" : "./client",
                                            
                                        }
                                    }
                                ]
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/app.css'
        })
    ]
}