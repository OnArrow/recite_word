import createPreview from "./createPreview";

import path from "path";
import fs from "fs";

createPreview();

const directoryPath = path.resolve(__dirname, "../Lesson");

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  files.forEach((file) => {
    const oldFileName = path.join(directoryPath, file);
    const newFileName = path.join(directoryPath, `new_${file}`);

    // fs.rename(oldFileName, newFileName, (err) => {
    //   if (err) {
    //     console.error("Error renaming file:", err);
    //     return;
    //   }
    //   console.log(`Renamed ${oldFileName} to ${newFileName}`);
    // });
    console.log(oldFileName);
  });
});
