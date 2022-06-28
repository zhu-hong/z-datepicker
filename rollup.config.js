import { defineConfig } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import vue from 'rollup-plugin-vue'

export default defineConfig({
  input: './src/components/DatePicker.vue',
  output: {
    format: 'esm',
    file: 'dist/index.js',
    sourcemap: false,
  },
  plugins: [
    commonjs(),
    nodeResolve(),
    postcss({
      extract: 'style.css',
    }),
    vue({
      css: false,
    }),
  ],
})