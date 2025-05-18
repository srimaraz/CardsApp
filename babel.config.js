module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@navigation': './src/navigation',
          '@assets': './assets',
          '@constants': './src/constants',
          '@api': './src/api',
          '@store': './src/store',
          '@config': './src/config',
        },
      },
    ],
  ],
};
