import copy from "rollup-plugin-copy";

const outputDirname = "dist";

export default {
  input: {
    options: "src/options.js",
    popup: "src/popup.js",
    background: "src/background.js",
  },
  output: [
    {
      dir: outputDirname,
      entryFileNames: "[name].js",
      name: "[name]",
    },
  ],
  plugins: [
    copy({
      targets: [
        { src: "src/options.html", dest: "dist" },
        { src: "src/popup.html", dest: "dist" },
        { src: "manifest.json", dest: "dist" },
        { src: "icons", dest: "dist" },
      ],
    }),
  ],
};
