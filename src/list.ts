import Listing from "./models/Listing.js";
import fs from 'fs';

type listingInput = {
  title: string;
  user: string;
  location: string;
  type: string;
  quantity: number;
  unit: string;
  date: Date;
  image: Buffer;
};

export const list = async (input: listingInput) => {
  const listing = new Listing({
    ...input,
    image: Buffer.from(Object.values(input.image))
  });
  console.log(`service is uploading this: ${JSON.stringify(listing)}`);
  listing.image
  let status = 0;
  await listing
    .save()
    .then((listing: any) => {
      status = 201;
    })
    .catch((error) => {
      console.log(error);
      status = 401;
    });
  return status;
};

export const getAllListings = async () => {
  const listings = await Listing.find({});
  return listings;
};
