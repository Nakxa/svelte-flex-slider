import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import sveltePreprocess from 'svelte-preprocess';

export default {
  input: 'src/index.js',
  output: [
    { file: 'dist/index.js', format: 'es' },
    { file: 'dist/index.cjs.js', format: 'cjs' }
  ],
  plugins: [
    svelte({
      preprocess: sveltePreprocess(),
      compilerOptions: {
        dev: false,
        css: 'injected'
      },
      emitCss: false
    }),
    resolve(),
    commonjs()
  ],
  external: ['svelte']
};