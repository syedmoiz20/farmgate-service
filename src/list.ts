import Listing from "./models/Listing.js";
import Jimp from 'jimp';

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
  const jimpImage = await Jimp.read(Buffer.from(Object.values(input.image))).then((image) => {
    // console.log(`Image size: ${image.getWidth()} x ${image.getHeight()}`);
    return image.resize(400, 600);
  });
  console.log(`Image size: ${jimpImage.getWidth()} x ${jimpImage.getHeight()}`);
  const listing = new Listing({
    ...input,
    // image: Buffer.from(Object.values(input.image))
    image: await jimpImage.getBufferAsync(Jimp.MIME_JPEG)
  });
  console.log(`service is uploading this: ${JSON.stringify(listing)}`);
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
