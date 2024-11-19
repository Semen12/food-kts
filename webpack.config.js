import path from 'path';
import { fileURLToPath } from 'url';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import plugin from 'eslint-plugin-react';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// Сначала определяем __filename и __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcPath = path.resolve(__dirname, 'src');
import Dotenv from 'dotenv-webpack';
import TsCheckerPlugin from 'fork-ts-checker-webpack-plugin';
// Теперь можно использовать __dirname для определения buildPath
const buildPath = path.resolve(__dirname, 'dist');

const isProd = process.env.NODE_ENV === 'production';
const getSettingsForStyles = (withModules = false) => {
  // Заменяем в нашей функции style-loader на mini-css-extract-plugin
  return [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    !withModules
      ? 'css-loader'
      : {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]',
              namedExport: false,
            },
          },
        },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
    {
      loader: 'sass-loader',
      options: {
        additionalData: `
              @use "@styles/styles.scss" as *;
              @use "@styles/_fonts.scss" as *;
              @use "@styles/_reset.scss" as *;
              @use "@styles/_mixin.scss" as *;
            `,
      },
    },
  ];
};
export default {
  entry: path.resolve(__dirname, 'src/main.tsx'),
  target: !isProd ? 'web' : 'browserslist',
  devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
  output: {
    path: buildPath,
    filename: 'bundle.js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'), // путь до нашего шаблона
    }),
    new Dotenv(),
    !isProd && new ReactRefreshPlugin(),
    //Добавим плагин в plugins
    isProd &&
      new MiniCssExtractPlugin({
        // Для того чтобы файл со стилями не кэшировался в браузере добавим filename
        filename: '[name]-[hash].css',
      }),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: 'babel-loader',
    
        },
        exclude: /node_modules/, // Рекомендуется исключить node_modules
      },
      {
        test: /\.svg$/,
        use: '@svgr/webpack',
        exclude: /node_modules/,
      },

      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
       
      },
      {
        test: /\.s?css$/,
        exclude: [/\.module\.s?css$/, /node_modules/],
        use: getSettingsForStyles(),
      },
      /* {
        test: /\.s[ac]ss$/i, // Поддержка Sass
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader // Для prod
            : 'style-loader', // Для dev
          'css-loader', // Для обработки CSS
          {
            loader: 'sass-loader', // Для обработки Sass
            options: {
              additionalData: `
                @use "@styles/styles.scss" as *;
                @use "@styles/_fonts.scss" as *;
                @use "@styles/_reset.scss" as *;
                @use "@styles/_mixin.scss" as *;
              `,
            },
          },
        ],
      },
 */
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/', // Папка, куда будут помещены шрифты
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg)$/,
        type: 'asset',
        parser: {
            dataUrlCondition: {
                maxSize: 10 * 1024
            }
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@config': path.resolve(__dirname, 'src/config/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@services': path.resolve(__dirname, 'src/services/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@store': path.resolve(__dirname, 'src/store/'),
      '@types': path.resolve(__dirname, 'src/types/'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
    },
  },
  devServer: {
    host: '127.0.0.1', // хост нашего сервера
    port: 3000, // порт, по которому к нему можно обращаться
    hot: true,
    historyApiFallback: true,
    webSocketServer: 'ws',
  },
};
