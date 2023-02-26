import "dotenv/config";
import app from "./app";
import prisma from "./db/prisma";

const port = process.env.SERVER_PORT;
const isDev = process.env.NODE_ENV === "development";

prisma.$queryRaw`SELECT 1`
  .then(() => {
    console.log("Successfully connected to DB.");
    app.listen(port, () => {
      if (isDev) {
        console.log(`Server listening on http://localhost:${port}`);
      }
    });
  })
  .catch((err: any) => {
    console.log("Unable to connect to DB.");
    console.log(err);
  });
