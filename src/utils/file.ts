import fs from "fs";

export async function isFileExists(filename: string): Promise<boolean> {
  try {
    await fs.promises.stat(filename);
  } catch {
    return false;
  }

  return true;
}
