import createPreview from "./createPreview";

import path from "path";
import fs from "fs";

// createPreview();

function generateDirectoryArray(directoryPath: string) {
  console.log(directoryPath);

  const result: any[] = [];

  const files = fs.readdirSync(directoryPath);
  console.log(files);

  for (const item of files) {
    const itemPath = path.join(directoryPath, item);

    const stat = fs.statSync(itemPath);
    if (stat.isDirectory()) {
      const directoryObj = {
        text: item,
        items: generateDirectoryArray(itemPath),
      };
      result.push(directoryObj);
    } else if (stat.isFile() && item.endsWith(".md")) {
      console.log(item);
    }
    return result;
  }
}

const targetPath = path.resolve(__dirname, "../Words");

console.log(generateDirectoryArray(targetPath));
