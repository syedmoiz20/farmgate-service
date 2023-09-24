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

const list = async (input: listingInput) => {
  const listing = new Listing({
    ...input,
    image: Buffer.from(JSON.stringify(input.image))
  });
  let status = 0;
  await listing
    .save()
    .then((listing) => {
      console.log(`good path`);
      status = 201;
    })
    .catch((error) => {
      console.log(error);
      status = 401;
    });
  return status;
};

export default list;
