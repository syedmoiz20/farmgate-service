import express from "express";
import list from "./list.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Listing from "./models/Listing.js";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const app = express();
dotenv.config();
const port = process.env.PORT;
app.use(express.json());

const start = async () => {
  const uri = process.env.MONGO_CONNECT;
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(uri);
    console.log(`successfully connected`);
  } catch (error) {
    console.log(error);
  }
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};

start();

app.post("/listings", (req, res) => {
  const listStatus = list(req.body);
  res.status(listStatus).send("Listing received!");
});

app.get("/listings", (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: "omg hi" });
});
