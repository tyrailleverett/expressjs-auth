import "dotenv/config";
import app from "./app";
import { prisma } from "./db/prisma";

const port = process.env.PORT;
const hostname = process.env.HOSTNAME;
const isDev = process.env.NODE_ENV === "development";

prisma.$queryRaw`SELECT 1`
    .then(() => {
        isDev && console.log("Successfully connected to DB.");
        app.listen(port, () => {
            isDev &&
                console.log(`Server listening on http://${hostname}:${port}`);
        });
    })
    .catch((err: any) => {
        console.log("Unable to connect to DB.");
        console.log(err);
    });
