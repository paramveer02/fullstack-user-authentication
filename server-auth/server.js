import dotenv from "dotenv";
import { app } from "./app.js";
import "./config/db.js";
import validateEnvironment from "./config/validateEnv.js";

import morgan from "morgan";

dotenv.config();

// Validate environment variables before starting server
validateEnvironment();

const PORT = process.env.PORT || 5100;

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.listen(PORT, () =>
  console.log(
    `App is listening on http://localhost:${PORT}/ ${process.env.NODE_ENV}`
  )
);
