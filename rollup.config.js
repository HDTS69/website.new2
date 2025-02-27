import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';

// Use a simple entry point that's guaranteed to exist
const entryPoint = 'next.config.js';

console.log(`Using entry point: ${entryPoint}`);

export default {
  input: entryPoint,
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: true
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    postcss({
      extensions: ['.css'],
      minimize: true
    }),
    terser()
  ]
}; 