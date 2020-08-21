const { resolve } = require('path');
const nodeExternals = require('webpack-node-externals');

const {
  getConfig,
  getBaseConfig,
  getFileLoader,
} = require('./webpack.config.base');

const serverConfig = getConfig(getBaseConfig(), {
  name: 'server',

  entry: {
    main: './src/server/main',
    // worker: './src/worker',
  },

  target: 'node',

  module: {
    rules: [getFileLoader(false)],
  },

  output: {
    path: resolve(__dirname, 'build/server'),
  },

  externals: [nodeExternals()],
});

module.exports = serverConfig;
