import express from "express";
import list from "./list.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors';


// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const app = express();
dotenv.config();
const port = process.env.PORT;
app.use(express.json({ limit: '5mb' }));
app.use(cors());

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

app.post('/listings', async (req, res) => {
  const listStatus = await list(req.body);
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000/list');
  console.log(`listStatus is ${listStatus}`)
  res.status(listStatus).send('Listing received!');
});

app.get("/listings", (req, res) => {
  res.status(200).json({ message: "omg hi" });
});
