import dotenv from "dotenv";
import { app } from "./app.js";
import "./config/db.js";
import cloudinary from "cloudinary";
import validateEnvironment from "./config/validateEnv.js";

import morgan from "morgan";

dotenv.config();

// Validate environment variables before starting server
validateEnvironment();

const PORT = process.env.PORT || 5100;

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.listen(PORT, () =>
  console.log(
    `App is listening on http://localhost:${PORT}/ ${process.env.NODE_ENV}`
  )
);
