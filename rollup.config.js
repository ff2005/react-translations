import { terser } from "rollup-plugin-terser";
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import packageJson from './package.json';

export default {
  input: './index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson['main:min'],
      format: "cjs",
      sourcemap: true,
      plugins: [
        terser()
      ],
    },
    {
      file: packageJson['main:esm'],
      format: 'esm',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'es',
      sourcemap: true,
      exports: 'named',
    },
  ],
  external: ['react'],
  plugins: [
    external(),
    resolve(),
    commonjs(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
    }),
  ],
};