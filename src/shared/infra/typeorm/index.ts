import { createConnection, getConnectionOptions, Connection } from "typeorm";

export default async (): Promise<Connection> => {
  const defaultOption = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOption, {
      database:
        process.env.NODE_ENV === "test" ? "rentx_test" : defaultOption.database,
    })
  );
};
