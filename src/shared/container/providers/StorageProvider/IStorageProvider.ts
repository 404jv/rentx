export enum enFolder {
  avatar = "avatar",
  cars = "cars",
}

interface IStorageProvider {
  save(file: string, folder: enFolder): Promise<string>;
  delete(file: string, folder: enFolder): Promise<void>;
}

export { IStorageProvider };
