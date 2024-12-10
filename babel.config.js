module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@screens': './src/screens',
          '@theme': './src/theme',
          '@hooks': './src/utils/hooks',
          '@utils': './src/utils',
          '@navigation': './src/navigation',
          '@store': './src/store',
          '@config': './src/config',
          '@root': './',
        },
      },
    ],
  ],
};
