import Listing from "./models/Listing.js";
import Jimp from "jimp";

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
  const jimpImage = await Jimp.read(
    Buffer.from(Object.values(input.image))
  ).then((image) => {
    return image.resize(400, 600);
  });
  const listing = new Listing({
    ...input,
    image: await jimpImage.getBufferAsync(Jimp.MIME_JPEG),
  });
  let status = 0;
  await listing
    .save()
    .then((listing: any) => {
      status = 201;
    })
    .catch((error) => {
      console.log(error);
      status = 400;
    });
  return status;
};

export const getAllListings = async () => {
  let status: number;
  const listings = await Listing.find({})
    .then((listings) => {
      status = 200;
      return listings;
    })
    .catch((error) => {
      console.log(error);
      status = 404;
      return []
    });
  console.log(`listings: ${JSON.stringify(listings)}`)
  return {
    status,
    listings
  }
};
