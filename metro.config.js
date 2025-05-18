const {getDefaultConfig} = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = getDefaultConfig(__dirname);

config.resolver = {
  ...config.resolver,
  extraNodeModules: {
    '@components': path.resolve(__dirname, 'src/components'),
    '@screens': path.resolve(__dirname, 'src/screens'),
    '@utils': path.resolve(__dirname, 'src/utils'),
    '@contexts': path.resolve(__dirname, 'src/contexts'),
    '@navigation': path.resolve(__dirname, 'src/navigation'),
    '@assets': path.resolve(__dirname, 'assets'),
    '@constants': path.resolve(__dirname, 'src/constants'),
    '@api': path.resolve(__dirname, 'src/api'),
    '@store': path.resolve(__dirname, 'src/store'),
    '@config': path.resolve(__dirname, 'src/config'),
  },
};

module.exports = config;
