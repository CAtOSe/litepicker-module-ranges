const webpack = require('webpack');
const path = require('path');
const getPackageJson = require('./getPackageJson');

const {
  version,
  name,
  license,
} = getPackageJson('version', 'name', 'license');

const banner = `
    Litepicker module ranges v${version} (https://github.com/wakirin/Litepicker-module-ranges)
    Package: ${name} (https://www.npmjs.com/package/litepicker-module-ranges)
    License: ${license} (https://github.com/wakirin/Litepicker-module-ranges/blob/master/LICENCE.md)
    Copyright 2019-${new Date().getFullYear()} Rinat G.
    
    Hash: [hash]
    Generated on: ${Date.now()}
    `;


module.exports = {
  entry: {
    'index.js': path.join(__dirname, '../src/index.ts'),
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name]',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'dts-css-modules-loader',
            options: {
              namedExport: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]',
              },
              localsConvention: 'camelCaseOnly'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js'
              }
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      'litepicker': 'litepicker/dist/js/main'
    }
  },
  externals: {
    litepicker: 'Litepicker',
  },
  plugins: [
    new webpack.BannerPlugin(banner)
  ],
};
