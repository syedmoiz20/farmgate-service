import express from "express";
import { getAllListings, list } from "./list.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const app = express();
app.use(express.json({ limit: '5mb' }));
app.use(cors({
  origin: 'http://localhost:3000'
}));

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

app.post('/listings', async (req, res) => {
  const listStatus = await list(req.body);
  console.log(`listStatus is ${listStatus}`)
  res.status(listStatus).send('Listing received!'); 
});

app.get("/listings", async (req, res) => {
  const listings = await getAllListings();
  res.status(200).json(listings)
  // res.status(200).json([{
  //   image: {
  //     data: '[123,34,48,34,58,50,53,53,44,34,49,34,58,50,49,54,44,34,50,34,58,50,53,53,44,34,51,34,58,50,50,52,44,34,52,34,58,48,44,34,53,34,58,49,54,44,34,54,34,58,55,52,44,34,55,34,58,55,48,44,34,56,34,58,55,51,44,34,57,34,58,55,48,44,34,49,48,34,58,48,44,34,49,49,34,58,49,44,34,49,50,34,58,49,44,34,49,51,34,58,49,44,34,49,52,34,58,48,44,34,49,53,34,58,57,54,44,34,49,54,34,58,48,44,34,49,55,34,58,57,54,44,34,49,56,34,58,48,44,34,49,57,34,58,48,44,34,50,48,34,58,50,53,53,44,34,50,49,34,58,50,49,57,44,34,50,50,34,58,48,44,34,50,51,34,58,54,55,44,34,50,52,34,58,48,44,34,50,53,34,58,51,44,34,50,54,34,58,50,44,34,50,55,34,58,50,44,34,50,56,34,58,51,44,34,50,57,34,58,50,44,34,51,48,34'
  //   },
  //   id: '0',
  //   title: 'beans',
  //   description: 'big beans',
  //   rating: '5',
  //   price: 2
  // }])
});
