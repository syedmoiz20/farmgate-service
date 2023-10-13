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
  const imageBuffer = Buffer.from(JSON.stringify(input.image));
  const listing = new Listing({
    ...input,
    image: Buffer.from(JSON.stringify(input.image))
  });
  fs.writeFile('test/output_beans.jpg', imageBuffer, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
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
  listings.map((listing) => {
    return {
      ...listing,
      // image: image
    }
  })
  return listings;
};
