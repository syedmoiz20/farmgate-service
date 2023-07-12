import mongoose from "mongoose";
import Listing from "./models/Listing.js";

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

const list = (input: listingInput) => {
  const listing = new Listing(input);
  console.log(`input within list function:\n ${JSON.stringify(input)}`);
  listing
    .save()
    .then((listing) => {
      console.log(`succeeded in listing ${JSON.stringify(listing)}`);
      return 201;
    })
    .catch((error) => {
      console.error(error);
      return 400;
    });
  return 400;
};

export default list;
