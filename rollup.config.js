import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
export default {
  input: "src/index.js",
  output: {
    file: "dist/index.js",
    esModule: false,
    exports: 'named',
    format: "umd",
    name: 'react-hgs',
    globals: {
      react: 'react'
    }
  },
  context: "window",
  external: ["react", "react-dom"],
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**",
    }),
  ],
};
