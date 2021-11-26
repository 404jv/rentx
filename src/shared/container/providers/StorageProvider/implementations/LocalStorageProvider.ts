import fs from "fs";
import { resolve } from "path";

import upload from "@config/upload";
import { isFileExists } from "@utils/file";

import { IStorageProvider } from "../IStorageProvider";

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    const currentLocal = resolve(upload.tmpFolder, file);
    const moveTo = resolve(`${upload.tmpFolder}/${folder}`, file);

    await fs.promises.rename(currentLocal, moveTo);

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    const fileName = resolve(`${upload.tmpFolder}/${folder}`, file);

    const isFile = await isFileExists(fileName);

    if (isFile === false) return;

    await fs.promises.unlink(fileName);
  }
}

export { LocalStorageProvider };
