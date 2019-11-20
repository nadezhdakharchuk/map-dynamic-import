const path = require('path');
const { parsed: localExampleEnv } = require('dotenv').config({ path: path.resolve(process.cwd(), '.env.example') });
const webpack = require('webpack');
const withPlugins = require('next-compose-plugins');
const nextCSS = require('@zeit/next-css');
const nextImages = require('next-images');
const svgr = require('next-svgr');

const nextConfig = {
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(Object.keys(localExampleEnv)));
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]',
        },
      },
    });
    return config;
  },
};

module.exports = withPlugins([[nextCSS], [nextImages], [svgr]], nextConfig);
