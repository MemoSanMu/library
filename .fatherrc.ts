import { IBundleOptions } from 'father-build/src/types';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';

const config: IBundleOptions = {
  esm: 'babel', // es module es6
  cjs: 'babel', // CommonJS node
  runtimeHelpers: true,
  extractCSS: true,
  lessInBabelMode: true,
  // umd 格式 文件依赖包集成
  umd: {
    name: 'library',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },
  extraRollupPlugins: [typescriptPaths({ tsConfigPath: './tsconfig.json' })],
};

export default config;
