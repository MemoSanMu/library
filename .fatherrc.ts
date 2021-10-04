export default {
  esm: 'babel', // es module es6
  cjs: 'babel', // CommonJS node
  runtimeHelpers: true,
  extractCSS: true,
  lessInBabelMode: true,
  umd: {
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  }, // umd 格式 文件依赖包集成
};
