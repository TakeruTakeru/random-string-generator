import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import css from "rollup-plugin-css-only";
import terser from "@rollup/plugin-terser";

const outputDirname = "dist";

export default [
  {
    input: "src/initializer.js",
    output: {
      file: `${outputDirname}/initializer.js`,
      format: "iife",
      name: "initializer",
    },
    plugins: [
      commonjs(),
      nodeResolve(),
      css({ output: "styles.css" }),
      terser(),
      copy({
        targets: [
          { src: "src/popup.html", dest: outputDirname },
          { src: "src/options.html", dest: outputDirname },
          { src: "manifest.json", dest: outputDirname },
          { src: "icons", dest: outputDirname },
        ],
        hook: "writeBundle",
      }),
    ],
  },
  {
    input: "src/background.js",
    output: {
      file: `${outputDirname}/background.js`,
      format: "iife",
      name: "background",
    },
    plugins: [commonjs(), nodeResolve(), terser()],
  },
];
