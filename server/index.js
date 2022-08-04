require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const { PORT } = process.env;
const {
  seed,
  getStates,
  getParks,
  createPark,
  deletePark,
} = require("./controller.js");

app.use(express.json());
app.use(cors());

app.use("/", express.static(path.join(__dirname, "../public")));

app.post("/seed", seed);

app.get("/states", getStates);
app.post("/parks", createPark);
app.get("/parks", getParks);
app.delete("/parks/:id", deletePark);

app.listen(PORT, () => console.log(`server is up on ${PORT}`));
