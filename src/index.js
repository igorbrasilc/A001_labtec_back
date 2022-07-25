import express from "express";
import cors from "cors";

import router from "./routers/index.js";

import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(process.env.PORT, "localhost", () => {
  console.log("Server running on " + process.env.PORT);
});
