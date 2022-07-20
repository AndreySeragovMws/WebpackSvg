const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Импортируем плагин
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// Импортируем плагин

let mode = 'development'; // По умолчанию режим development
if (process.env.NODE_ENV === 'production') { // Режим production, если 
  // при запуске вебпака было указано --mode=production
  mode = 'production';
}

const plugins = [
  new HtmlWebpackPlugin({
    template: './src/index.html', // Данный html будет использован как шаблон
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css', // Формат имени файла
  }), // Добавляем в список плагинов
]; // Создаем массив плагинов

module.exports = {

  mode, // Сокращенная запись mode: mode в ES6+
  plugins,
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[hash][ext][query]', // Все ассеты будут
  // складываться в dist/assets
    clean: true,
  },
  
  devServer: {
    hot: true,
  },

  module: {
  	rules: [
      { test: /\.(html)$/, use: ['html-loader'] },
      {
        test: /\.(s[ac]|c)ss$/i, // /\.(le|c)ss$/i если вы используете less
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }, // Добавляем загрузчики стилей
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: mode === 'production' ? 'asset' : 'asset/resource', // В продакшен режиме
        // изображения размером до 8кб будут инлайнится в код
        // В режиме разработки все изображения будут помещаться в dist/assets
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  }
}