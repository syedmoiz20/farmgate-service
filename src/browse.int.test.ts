import mongoose from 'mongoose';
import dotenv from "dotenv";
import { getAllListings } from './list.js';

// import { getAllListings } from ;
dotenv.config();

beforeAll(async () => {
  const uri: string = process.env.MONGO_CONNECT as string;
  await mongoose.connect(uri);
});

describe('getAllListings', () => {
  it('should return all listings from MongoDB', async () => {
    const { listings, status } = await getAllListings();
    expect(listings).toBeDefined();
    expect(status).toEqual(200);
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});
