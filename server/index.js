require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { SERVER_PORT } = process.env;
const {
  seed,
  getStates,
  getParks,
  createPark,
  deletePark,
} = require("./controller.js");

app.use(express.json());
app.use(cors());

app.post("/seed", seed);

app.get("/states", getStates);
app.post("/parks", createPark);
app.get("/parks", getParks);
app.delete("/parks/:id", deletePark);

app.listen(SERVER_PORT, () => console.log(`server is up on ${SERVER_PORT}`));
