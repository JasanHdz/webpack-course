const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env) => {
  let plugins = [
    new ExtractTextPlugin("css/[name][hash].css"),
  ]
  if (env.NODE_ENV === 'production') {
    plugins.push(
      new CleanWebpackPlugin(['dist'], {root: __dirname})
    )
  }

  return {
    mode: 'production',
    entry: {
      invie: ['babel-polyfill', path.resolve(__dirname, 'src/invie.js')],
      index: ['babel-polyfill', path.resolve(__dirname, 'src/index.js')],
    },
    output: {
      filename: 'js/[name].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: path.resolve(__dirname, 'dist')+'/',
      chunkFilename: 'js/[id].[chunkhash].js',
    },
    devServer: {
      port: 9000,
      publicPath: path.resolve(__dirname, '/'),
      contentBase: path.join(__dirname, '/dist/'),
      open: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-proposal-object-rest-spread"]
          }
        },
        // usar para produccion.
        {
          test: /\.css$/,
          exclude: /(node_modules|bower_components)/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: "css-loader",
                // options: {
                //   minimize: true,
                //   modules: true
                // }
              }
            ]
          })
        },
        {
          test: /\.(jpg|png|gif|svg)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'images/[name].[hash].[ext]'
            }
          }
        }
      ]
    },
    plugins
  }

}

