import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs'

export default {
  name: 'pagex',
  input: 'pagex.js',
  output: {
    format: 'umd'
  },
  plugins: [
    resolve(),
    commonjs({
      include: ['node_modules/**']
    })
  ]
};
