const path = require('path');

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: [path.resolve('.')],
        alias: {
          // This has to be mirrored in tsconfig.json
          '^@app/(.+)': './src/\\1',
        },
      },
    ],
    'react-native-reanimated/plugin'
  ],
};
