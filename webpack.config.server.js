const { resolve } = require('path');
const nodeExternals = require('webpack-node-externals');

const {
  getConfig,
  getBaseConfig,
  getFileLoader,
} = require('./webpack.config.base');

const getServerConfig = (name, config) => {
  return getConfig(
    getBaseConfig(),
    {
      name,

      target: 'node',

      module: {
        rules: [getFileLoader(false)],
      },

      output: {
        path: resolve(__dirname, 'build', name),
      },

      externals: [nodeExternals()],
    },
    config,
  );
};

const serverConfig = getServerConfig('server', {
  entry: './src/server',
});

const renderConfig = getServerConfig('render', {
  entry: './src/render',
});

module.exports = serverConfig;
