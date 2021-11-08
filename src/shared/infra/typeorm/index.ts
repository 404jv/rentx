import { createConnection, getConnectionOptions, Connection } from "typeorm";

export default async (host = "database"): Promise<Connection> => {
  const defaultOption = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOption, {
      host: "localhost",
      database:
        process.env.NODE_ENV === "test" ? "rentx_test" : defaultOption.database,
    })
  );
};
