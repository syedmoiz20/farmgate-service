import User from "./models/User.js";
import crypto, { pbkdf2Sync } from "crypto";

type userInput = {
  name: string;
  email: string;
  password: string;
};

const hashPassword = (password: string, salt?: Buffer) => {
  if (!salt) salt = crypto.randomBytes(128);
  const iterations = 10000;
  const hash = pbkdf2Sync(password, salt, 10000, 512, "sha512");
  return { salt, hash, iterations };
};

export const signup = async (input: userInput) => {
  const { hash, salt } = hashPassword(input.password);
  const user = new User({
    ...input,
    createdDate: Date.now(),
    password: hash,
    salt: salt,
  });
  let status = 0;
  await user
    .save()
    .then((user: any) => {
      status = 201;
    })
    .catch((error) => {
      console.log(error);
      status = 400;
    });
  return status;
};

const matchPassword = async (
  password: string,
  salt: Buffer,
  encryptedPassword: Buffer
): Promise<boolean> => {
  const { hash } = hashPassword(password, salt);
  return hash.equals(encryptedPassword);
};

export const authenticateUser = async (
  email: string,
  submittedPassword
): Promise<any> => {
  const user = await User.findOne({ email });
  if (!user) {
    console.log(`User not found with email: ${email}`);
    return {
      await: false,
      status: 200,
    };
  }
  let authed: boolean;
  try {
    authed = await matchPassword(submittedPassword, user.salt, user.password);
    return {
      authed,
      status: 200,
    };
  } catch {
    return {
      authed: false,
      status: 200,
    };
  }
};
