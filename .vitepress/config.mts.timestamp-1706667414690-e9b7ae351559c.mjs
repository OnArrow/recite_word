// .vitepress/config.mts
import { defineConfig } from "file:///D:/Jack/personal/recite_word/node_modules/.pnpm/vitepress@1.0.0-rc.40_@algolia+client-search@4.22.1_@types+node@20.11.10_search-insights@2.13.0/node_modules/vitepress/dist/node/index.js";

// Script/getDirectories.ts
import path from "path";
import fs from "fs";
var __vite_injected_original_dirname = "D:\\Jack\\personal\\recite_word\\Script";
var excludeArr = ["Video", "Images", "Script", "node_modules"];
var excludeArrMap = excludeArr.map(
  (item) => path.resolve(__vite_injected_original_dirname, `../${item}`)
);
console.log(excludeArrMap);
function generateDirectoryArray(dirPath) {
  const result = [];
  const files2 = fs.readdirSync(dirPath);
  for (const file of files2) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      const directoryObj = {
        text: file,
        collapsed: true,
        items: generateDirectoryArray(filePath)
      };
      result.push(directoryObj);
    } else if (stat.isFile() && file.endsWith(".md")) {
      const fileName = file.replace(".md", "");
      let fileLink = path.join(dirPath, file);
      const convertedPath = fileLink.replace(/\\/g, "/");
      const finalPath = convertedPath.replace(/^.*Words/, "/Words");
      const fileObj = {
        text: fileName,
        link: finalPath
      };
      result.push(fileObj);
    }
  }
  return result;
}
var directoryPath = path.resolve(__vite_injected_original_dirname, "..");
var files = fs.readdirSync(directoryPath);
console.log(files);
var directoryArray = generateDirectoryArray(directoryPath);

// .vitepress/config.mts
var config_default = defineConfig({
  title: "English",
  description: "A website for English by Jack",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Todo", link: "/Todo" }
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
      { icon: "github", link: "https://github.com/vuejs/vitepress" }
    ]
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcubXRzIiwgIlNjcmlwdC9nZXREaXJlY3Rvcmllcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXEphY2tcXFxccGVyc29uYWxcXFxccmVjaXRlX3dvcmRcXFxcLnZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcSmFja1xcXFxwZXJzb25hbFxcXFxyZWNpdGVfd29yZFxcXFwudml0ZXByZXNzXFxcXGNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0phY2svcGVyc29uYWwvcmVjaXRlX3dvcmQvLnZpdGVwcmVzcy9jb25maWcubXRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVwcmVzc1wiO1xuXG5pbXBvcnQgeyBkaXJlY3RvcnlBcnJheSB9IGZyb20gXCIuLi9TY3JpcHQvZ2V0RGlyZWN0b3JpZXNcIjtcblxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCBmcyBmcm9tIFwiZnNcIjtcblxuLy8gaHR0cHM6Ly92aXRlcHJlc3MuZGV2L3JlZmVyZW5jZS9zaXRlLWNvbmZpZ1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgdGl0bGU6IFwiRW5nbGlzaFwiLFxuICBkZXNjcmlwdGlvbjogXCJBIHdlYnNpdGUgZm9yIEVuZ2xpc2ggYnkgSmFja1wiLFxuICB0aGVtZUNvbmZpZzoge1xuICAgIC8vIGh0dHBzOi8vdml0ZXByZXNzLmRldi9yZWZlcmVuY2UvZGVmYXVsdC10aGVtZS1jb25maWdcbiAgICBuYXY6IFtcbiAgICAgIHsgdGV4dDogXCJIb21lXCIsIGxpbms6IFwiL1wiIH0sXG4gICAgICB7IHRleHQ6IFwiVG9kb1wiLCBsaW5rOiBcIi9Ub2RvXCIgfSxcbiAgICBdLFxuXG4gICAgLy8gc2lkZWJhcjogW1xuICAgIC8vICAge1xuICAgIC8vICAgICB0ZXh0OiBcIkV4YW1wbGVzXCIsXG4gICAgLy8gICAgIGl0ZW1zOiBbXG4gICAgLy8gICAgICAgeyB0ZXh0OiBcIk1hcmtkb3duIEV4YW1wbGVzXCIsIGxpbms6IFwiL21hcmtkb3duLWV4YW1wbGVzXCIgfSxcbiAgICAvLyAgICAgICB7IHRleHQ6IFwiUnVudGltZSBBUEkgRXhhbXBsZXNcIiwgbGluazogXCIvYXBpLWV4YW1wbGVzXCIgfSxcbiAgICAvLyAgICAgXSxcbiAgICAvLyAgIH0sXG4gICAgLy8gXSxcblxuICAgIHNpZGViYXI6IGRpcmVjdG9yeUFycmF5LFxuXG4gICAgc29jaWFsTGlua3M6IFtcbiAgICAgIHsgaWNvbjogXCJnaXRodWJcIiwgbGluazogXCJodHRwczovL2dpdGh1Yi5jb20vdnVlanMvdml0ZXByZXNzXCIgfSxcbiAgICBdLFxuICB9LFxufSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXEphY2tcXFxccGVyc29uYWxcXFxccmVjaXRlX3dvcmRcXFxcU2NyaXB0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxKYWNrXFxcXHBlcnNvbmFsXFxcXHJlY2l0ZV93b3JkXFxcXFNjcmlwdFxcXFxnZXREaXJlY3Rvcmllcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovSmFjay9wZXJzb25hbC9yZWNpdGVfd29yZC9TY3JpcHQvZ2V0RGlyZWN0b3JpZXMudHNcIjtpbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgZnMgZnJvbSBcImZzXCI7XHJcblxyXG4vLyBjb25zb2xlLmxvZyhfX2Rpcm5hbWUpO1xyXG5cclxuY29uc3QgZXhjbHVkZUFycjogc3RyaW5nW10gPSBbXCJWaWRlb1wiLCBcIkltYWdlc1wiLCBcIlNjcmlwdFwiLCBcIm5vZGVfbW9kdWxlc1wiXTtcclxuY29uc3QgZXhjbHVkZUFyck1hcCA9IGV4Y2x1ZGVBcnIubWFwKChpdGVtKSA9PlxyXG4gIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIGAuLi8ke2l0ZW19YClcclxuKTtcclxuY29uc29sZS5sb2coZXhjbHVkZUFyck1hcCk7XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZURpcmVjdG9yeUFycmF5KGRpclBhdGgpIHtcclxuICBjb25zdCByZXN1bHQ6IGFueVtdID0gW107XHJcbiAgLy8gY29uc29sZS5sb2coZGlyUGF0aCk7XHJcblxyXG4gIGNvbnN0IGZpbGVzID0gZnMucmVhZGRpclN5bmMoZGlyUGF0aCk7XHJcblxyXG4gIC8vIFx1OTA0RFx1NTM4Nlx1NzZFRVx1NUY1NVx1NEUyRFx1NzY4NFx1NkJDRlx1NEUyQVx1NjU4N1x1NEVGNi9cdTY1ODdcdTRFRjZcdTU5MzlcclxuICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIHtcclxuICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKGRpclBhdGgsIGZpbGUpO1xyXG4gICAgY29uc3Qgc3RhdCA9IGZzLnN0YXRTeW5jKGZpbGVQYXRoKTtcclxuXHJcbiAgICAvLyBcdTU5ODJcdTY3OUNcdTY2MkZcdTY1ODdcdTRFRjZcdTU5MzlcdUZGMENcdTUyMTlcdTkwMTJcdTVGNTJcdTU5MDRcdTc0MDZcdTVCNTBcdTc2RUVcdTVGNTVcclxuICAgIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkpIHtcclxuICAgICAgY29uc3QgZGlyZWN0b3J5T2JqID0ge1xyXG4gICAgICAgIHRleHQ6IGZpbGUsXHJcbiAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxyXG4gICAgICAgIGl0ZW1zOiBnZW5lcmF0ZURpcmVjdG9yeUFycmF5KGZpbGVQYXRoKSxcclxuICAgICAgfTtcclxuICAgICAgcmVzdWx0LnB1c2goZGlyZWN0b3J5T2JqKTtcclxuICAgIH1cclxuICAgIC8vIFx1NTk4Mlx1Njc5Q1x1NjYyRlx1NjU4N1x1NEVGNlx1NEUxNFx1NjYyRiBNYXJrZG93biBcdTY1ODdcdTRFRjZcdUZGMENcdTc1MUZcdTYyMTBcdTVCRjlcdTVFOTRcdTc2ODRcdTVCRjlcdThDNjFcclxuICAgIGVsc2UgaWYgKHN0YXQuaXNGaWxlKCkgJiYgZmlsZS5lbmRzV2l0aChcIi5tZFwiKSkge1xyXG4gICAgICBjb25zdCBmaWxlTmFtZSA9IGZpbGUucmVwbGFjZShcIi5tZFwiLCBcIlwiKTtcclxuICAgICAgbGV0IGZpbGVMaW5rID0gcGF0aC5qb2luKGRpclBhdGgsIGZpbGUpO1xyXG5cclxuICAgICAgLy8gXHU2NkZGXHU2MzYyXHU1M0NEXHU2NTlDXHU2NzYwXHU0RTNBXHU2QjYzXHU2NTlDXHU2NzYwXHJcbiAgICAgIGNvbnN0IGNvbnZlcnRlZFBhdGggPSBmaWxlTGluay5yZXBsYWNlKC9cXFxcL2csIFwiL1wiKTtcclxuXHJcbiAgICAgIC8vIFx1NTIyMFx1OTY2NFx1NzZEOFx1N0IyNlx1NTQ4Q1x1NjgzOVx1NzZFRVx1NUY1NVx1OTBFOFx1NTIwNlxyXG4gICAgICBjb25zdCBmaW5hbFBhdGggPSBjb252ZXJ0ZWRQYXRoLnJlcGxhY2UoL14uKldvcmRzLywgXCIvV29yZHNcIik7XHJcblxyXG4gICAgICBjb25zdCBmaWxlT2JqID0ge1xyXG4gICAgICAgIHRleHQ6IGZpbGVOYW1lLFxyXG4gICAgICAgIGxpbms6IGZpbmFsUGF0aCxcclxuICAgICAgfTtcclxuICAgICAgcmVzdWx0LnB1c2goZmlsZU9iaik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5jb25zdCBkaXJlY3RvcnlQYXRoID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuLlwiKTsgLy8gXHU4QkY3XHU1QzA2XHU4REVGXHU1Rjg0XHU2NkZGXHU2MzYyXHU0RTNBXHU0RjYwXHU3Njg0XHU1QjlFXHU5NjQ1XHU4REVGXHU1Rjg0XHJcblxyXG5jb25zdCBmaWxlcyA9IGZzLnJlYWRkaXJTeW5jKGRpcmVjdG9yeVBhdGgpO1xyXG5jb25zb2xlLmxvZyhmaWxlcyk7XHJcblxyXG5leHBvcnQgY29uc3QgZGlyZWN0b3J5QXJyYXkgPSBnZW5lcmF0ZURpcmVjdG9yeUFycmF5KGRpcmVjdG9yeVBhdGgpO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlTLFNBQVMsb0JBQW9COzs7QUNBM0IsT0FBTyxVQUFVO0FBQzVULE9BQU8sUUFBUTtBQURmLElBQU0sbUNBQW1DO0FBS3pDLElBQU0sYUFBdUIsQ0FBQyxTQUFTLFVBQVUsVUFBVSxjQUFjO0FBQ3pFLElBQU0sZ0JBQWdCLFdBQVc7QUFBQSxFQUFJLENBQUMsU0FDcEMsS0FBSyxRQUFRLGtDQUFXLE1BQU0sSUFBSSxFQUFFO0FBQ3RDO0FBQ0EsUUFBUSxJQUFJLGFBQWE7QUFFekIsU0FBUyx1QkFBdUIsU0FBUztBQUN2QyxRQUFNLFNBQWdCLENBQUM7QUFHdkIsUUFBTUEsU0FBUSxHQUFHLFlBQVksT0FBTztBQUdwQyxhQUFXLFFBQVFBLFFBQU87QUFDeEIsVUFBTSxXQUFXLEtBQUssS0FBSyxTQUFTLElBQUk7QUFDeEMsVUFBTSxPQUFPLEdBQUcsU0FBUyxRQUFRO0FBR2pDLFFBQUksS0FBSyxZQUFZLEdBQUc7QUFDdEIsWUFBTSxlQUFlO0FBQUEsUUFDbkIsTUFBTTtBQUFBLFFBQ04sV0FBVztBQUFBLFFBQ1gsT0FBTyx1QkFBdUIsUUFBUTtBQUFBLE1BQ3hDO0FBQ0EsYUFBTyxLQUFLLFlBQVk7QUFBQSxJQUMxQixXQUVTLEtBQUssT0FBTyxLQUFLLEtBQUssU0FBUyxLQUFLLEdBQUc7QUFDOUMsWUFBTSxXQUFXLEtBQUssUUFBUSxPQUFPLEVBQUU7QUFDdkMsVUFBSSxXQUFXLEtBQUssS0FBSyxTQUFTLElBQUk7QUFHdEMsWUFBTSxnQkFBZ0IsU0FBUyxRQUFRLE9BQU8sR0FBRztBQUdqRCxZQUFNLFlBQVksY0FBYyxRQUFRLFlBQVksUUFBUTtBQUU1RCxZQUFNLFVBQVU7QUFBQSxRQUNkLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQ0EsYUFBTyxLQUFLLE9BQU87QUFBQSxJQUNyQjtBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQ1Q7QUFFQSxJQUFNLGdCQUFnQixLQUFLLFFBQVEsa0NBQVcsSUFBSTtBQUVsRCxJQUFNLFFBQVEsR0FBRyxZQUFZLGFBQWE7QUFDMUMsUUFBUSxJQUFJLEtBQUs7QUFFVixJQUFNLGlCQUFpQix1QkFBdUIsYUFBYTs7O0FEbERsRSxJQUFPLGlCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsRUFDUCxhQUFhO0FBQUEsRUFDYixhQUFhO0FBQUE7QUFBQSxJQUVYLEtBQUs7QUFBQSxNQUNILEVBQUUsTUFBTSxRQUFRLE1BQU0sSUFBSTtBQUFBLE1BQzFCLEVBQUUsTUFBTSxRQUFRLE1BQU0sUUFBUTtBQUFBLElBQ2hDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFZQSxTQUFTO0FBQUEsSUFFVCxhQUFhO0FBQUEsTUFDWCxFQUFFLE1BQU0sVUFBVSxNQUFNLHFDQUFxQztBQUFBLElBQy9EO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbImZpbGVzIl0KfQo=