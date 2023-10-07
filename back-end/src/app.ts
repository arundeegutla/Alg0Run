import express from "express";
import bodyParser from "body-parser";

import { getProfile, getProfileByToken } from "./controllers/profile";
import { createProfile } from "./services/user";
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define your API routes here

app.post("/", async (req, res) => {
  // const r = await getProfile("skf5ViXIrFge6X13T5s2XB6JWEJ3");
  const r = await createProfile("id123", "bigman1")
  res.send(r);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
