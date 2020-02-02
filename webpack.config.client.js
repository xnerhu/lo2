const { resolve } = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const LoadablePlugin = require('@loadable/webpack-plugin');

const {
  getConfig,
  getBaseConfig,
  dev,
  PORT,
  getFileLoader,
} = require('./webpack.config.base');

const stats = process.env.BUNDLE_STATS === 'enabled';

const entries = ['./src/client'];

if (dev) {
  entries.push(
    `webpack-hot-middleware/client?path=http://localhost:${PORT}/__webpack_hmr`,
    `react-hot-loader/patch?path=http://localhost:${PORT}`,
  );
}

const plugins = [new LoadablePlugin()];

if (stats) plugins.push(new BundleAnalyzerPlugin());

const splitModules = {
  slate: ['slate', 'slate-react', 'slate-history', 'immer'],
};

const clientConfig = getConfig(getBaseConfig(), {
  name: 'client',
  target: 'web',

  entry: {
    app: entries,
  },

  module: {
    rules: [getFileLoader()],
  },

  output: {
    path: resolve(__dirname, 'build', 'client', 'static'),
    libraryTarget: 'var',
    chunkFilename: '[name].chunk.js',
    hotUpdateMainFilename: 'updates/[hash].hot-update.json',
    hotUpdateChunkFilename: 'updates/[id].[hash].hot-update.js',
  },

  plugins,

  optimization: {
    minimizer: !dev
      ? [
          new TerserPlugin({
            terserOptions: {
              parse: {
                ecma: 8,
              },
              compress: {
                ecma: 5,
                warnings: false,
                comparisons: false,
                inline: 2,
              },
              mangle: {
                safari10: true,
              },
              output: {
                ecma: 5,
                comments: false,
                ascii_only: true, // eslint-disable-line
              },
            },
            parallel: true,
            cache: true,
            sourceMap: dev,
          }),
        ]
      : [],
    namedModules: true,
    noEmitOnErrors: true,
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: module => {
            const package = getPackageName(module);

            const keys = Object.keys(splitModules);
            const chunkName =
              keys.find(r => splitModules[r].indexOf(package) !== -1) ||
              'vendor';

            return chunkName;
          },
        },
      },
    },
  },
});

const getPackageName = module => {
  return module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
};

module.exports = clientConfig;
