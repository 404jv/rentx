import { app } from "./app";

app.listen(3333, () =>
  console.log(`🚀 Server is running at ${process.env.APP_API_URL}`)
);
