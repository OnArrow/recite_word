import { defineConfig } from "vitepress";

import { directoryArray } from "../Script/getDirectories";

import path from "path";
import fs from "fs";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "English",
  description: "A website for English by Jack",

  themeConfig: {
    logo: "/English.svg",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Todo", link: "/Todo" },
    ],

    sidebar: directoryArray,

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
    search: {
      provider: "local",
    },
  },
});
