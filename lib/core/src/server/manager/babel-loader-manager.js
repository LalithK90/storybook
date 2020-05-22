import { includePaths, excludePaths } from '../config/utils';
import { plugins } from '../common/babel';

export default () => ({
  test: /\.(mjs|tsx?|jsx?)$/,
  use: [
    {
      loader: require.resolve('babel-loader'),
      options: {
        sourceType: 'unambiguous',
        presets: [
          [
            require.resolve('@babel/preset-env'),
            { shippedProposals: true, useBuiltIns: 'usage', corejs: '3' },
          ],
          require.resolve('@babel/preset-react'),
        ],
        plugins: [
          ...plugins,
          // Shoud only be done on manager. Template literals are not meant to be
          // transformed for frameworks like ember
          require.resolve('@babel/plugin-transform-template-literals'),
        ],
      },
    },
  ],
  include: [...includePaths, /node_modules/],
  exclude: [...excludePaths, /dist/],
});