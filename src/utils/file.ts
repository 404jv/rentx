import fs from "fs";

async function isFileExists(filename: string): Promise<boolean> {
  try {
    await fs.promises.stat(filename);
  } catch {
    return false;
  }

  return true;
}

export const deleteFile = async (filename: string): Promise<void> => {
  const fileExists = await isFileExists(filename);

  if (fileExists) {
    await fs.promises.unlink(filename);
  }
};
