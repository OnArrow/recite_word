import { defineConfig } from "vitepress";

import { directoryArray } from "../Script/getDirectories";

import path from "path";
import fs from "fs";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "English",
  description: "A website for English by Jack",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Todo", link: "/Todo" },
    ],

    // sidebar: [
    //   {
    //     text: "Examples",
    //     items: [
    //       { text: "Markdown Examples", link: "/markdown-examples" },
    //       { text: "Runtime API Examples", link: "/api-examples" },
    //     ],
    //   },
    // ],

    sidebar: directoryArray,

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
