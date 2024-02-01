import createPreview from "./createPreview";

import path from "path";
import fs from "fs";

createPreview();

function renameFilesInDirectory(directoryPath) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    files.forEach((file) => {
      const oldFilePath = path.join(directoryPath, file);
      console.log(oldFilePath);

      fs.stat(oldFilePath, (err, stats) => {
        if (err) {
          console.error("Error getting file stats:", err);
          return;
        }

        if (stats.isDirectory()) {
          // 如果是子目录，递归调用函数
          renameFilesInDirectory(oldFilePath);
        } else {
          // 如果是文件，修改文件名
          const newFileName = `new_${file}`;
          const newFilePath = path.join(directoryPath, newFileName);
          console.log(newFileName);

          // fs.rename(oldFilePath, newFilePath, (err) => {
          //   if (err) {
          //     console.error('Error renaming file:', err);
          //     return;
          //   }
          //   console.log(`Renamed ${oldFilePath} to ${newFilePath}`);
          // });
        }
      });
    });
  });
}

const directoryPath = path.resolve(__dirname, "../Lesson/");
renameFilesInDirectory(directoryPath);
