// module.exports = {
//   presets: ['module:@react-native/babel-preset', '@babel/preset-typescript'],
// };
module.exports = {
  presets: ['module:@react-native/babel-preset', '@babel/preset-typescript'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          src: './src',
        },
      },
    ],
  ],
};
