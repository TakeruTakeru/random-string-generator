import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";

const outputDirname = "dist";

export default [
  {
    input: "src/options.js",
    output: {
      file: `${outputDirname}/options.js`,
      format: "iife",
      name: "options",
    },
    plugins: [
      commonjs(),
      nodeResolve(),
      copy({
        targets: [
          { src: "src/options.html", dest: outputDirname },
          { src: "manifest.json", dest: outputDirname },
          { src: "icons", dest: outputDirname },
        ],
        hook: "writeBundle",
      }),
    ],
  },
  {
    input: "src/popup.js",
    output: {
      file: `${outputDirname}/popup.js`,
      format: "iife",
      name: "popup",
    },
    plugins: [
      commonjs(),
      nodeResolve(),
      copy({
        targets: [{ src: "src/popup.html", dest: outputDirname }],
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
    plugins: [commonjs(), nodeResolve()],
  },
];
