import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
export default {
  input: "src/index.js",
  output: {
    file: "dist/index.js",
    format: "cjs",
  },
  external: ["react", "react-dom"],
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**",
    }),
  ],
};
