import { defineConfig } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import vue from 'rollup-plugin-vue'

export default defineConfig({
  input: './src/DatePicker.vue',
  external: ['vue', 'z-date-matrix'],
  output: {
    format: 'esm',
    file: 'dist/index.js',
    sourcemap: false,
  },
  plugins: [
    commonjs(),
    nodeResolve(),
    vue(),
  ],
})