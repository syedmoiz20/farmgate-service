import express from "express";
import { getAllListings, list } from "./list.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

dotenv.config();
const port: string = process.env.PORT as string;
const uri: string = process.env.MONGO_CONNECT as string;

const start = async () => {
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

app.post("/listings", async (req, res) => {
  const listStatus = await list(req.body);
  console.log(`listStatus is ${listStatus}`);
  res.status(listStatus).send("Listing received!");
});

app.get("/listings", async (req, res) => {
  const { status, listings } = await getAllListings();
  res.status(status).json(listings);
});

app.post("/login", async(req, res) => {
  
})
