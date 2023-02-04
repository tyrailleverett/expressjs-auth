import "dotenv/config";
import app from "./app";
import { prisma } from "./db/db";

const port = process.env.PORT ?? 3000;
const hostname = process.env.HOSTNAME ?? "localhost";

prisma.$queryRaw`SELECT 1`
    .then(() => {
        console.log("Successfully connected to DB.");
        app.listen(port, () => {
            console.log(`Server listening on http://${hostname}:${port}`);
        });
    })
    .catch((err) => {
        console.log("Unable to connect to DB.");
        console.log(err);
    });
