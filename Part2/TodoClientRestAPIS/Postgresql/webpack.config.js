// const webpack = require('webpack');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
// import WebpackPwaManifest from 'webpack-pwa-manifest'

const config = {
    entry:  __dirname + '/js/index.jsx',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    devServer: {
        inline: true,
        contentBase: './',
        port: 3001
    },
    watch: true,
    module: {
        rules: [
          {
            test: /\.jsx?/,
            exclude: /node_modules/,
            use: 'babel-loader'
          },

            {
                test: /\.css?$/,
                loaders: [ 'style-loader', 'css-loader' ],
            },
            {
                test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader : 'file-loader'
            }
          ],

          //plugins
          
      },
      plugins: [
        // new WebpackPwaManifest({
        //   name: 'My Progressive Web App',
        //   short_name: 'MyPWA',
        //   description: 'My awesome Progressive Web App!',
        //   background_color: '#ffffff',
        //   crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
        //   icons: [
        //     // {
        //     //   src: path.resolve('todo.png'),
        //     //   sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
        //     // },
        //     // {
        //     //   src: path.resolve('todo.png'),
        //     //   size: '1024x1024' // you can also use the specifications pattern
        //     // }
        //   ]
        // })
        new SWPrecacheWebpackPlugin(
            {
              cacheId: 'my-domain-cache-id',
              dontCacheBustUrlsMatching: /\.\w{8}\./,
              filename: 'service-worker.js',
              minify: true,
              navigateFallback:'index.html',
              staticFileGlobsIgnorePatterns: [/\.map$/, /manifest\.json$/]
            }
          ),
          new WebpackPwaManifest({
            name: 'My Applications Friendly Name',
            short_name: 'Application',
            description: 'Description!',
            background_color: '#01579b',
            theme_color: '#01579b',
            'theme-color': '#01579b',
            start_url: '/',
            // icons: [
            //   {
            //     src: path.resolve('src/images/icon.png'),
            //     sizes: [96, 128, 192, 256, 384, 512],
            //     // destination: path.join('assets', 'icons')
            //   }
            // ]
          })
      ]    


};
module.exports = config;