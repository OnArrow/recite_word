import { defineConfig } from "vitepress";

import path from "path";
import fs from "fs";

function generateDirectoryArray(dirPath) {
  const result: any[] = [];

  const files = fs.readdirSync(dirPath);

  // 遍历目录中的每个文件/文件夹
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    // 如果是文件夹，则递归处理子目录
    if (stat.isDirectory()) {
      const directoryObj = {
        text: file,
        items: generateDirectoryArray(filePath),
      };
      result.push(directoryObj);
    }
    // 如果是文件且是 Markdown 文件，生成对应的对象
    else if (stat.isFile() && file.endsWith(".md")) {
      const fileName = file.replace(".md", "");
      let fileLink = path.join(dirPath, file);
      console.log(fileLink);

      const fileObj = {
        text: fileName,
        link: fileLink,
      };
      result.push(fileObj);
    }
  }

  return result;
}

const directoryPath = path.resolve(__dirname, "../Words"); // 请将路径替换为你的实际路径

const directoryArray = generateDirectoryArray(directoryPath);

console.log(directoryArray);

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
