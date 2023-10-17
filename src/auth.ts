import User from "./models/User.js";
import crypto from "crypto";

type userInput = {
  name: string;
  email: string;
  password: string;
};

import { pbkdf2 } from "crypto";

const hashPassword = async (password: string, salt?: Buffer) => {
  if (!salt) salt = crypto.randomBytes(128);
  const iterations = 10000;
  const hash = await new Promise<Buffer>((resolve, reject) => {
    pbkdf2(password, salt, iterations, 512, "sha512", (err, derivedKey) => {
      if (err) {
        reject(err);
      } else {
        resolve(derivedKey);
      }
    });
  });
  return { salt, hash, iterations };
};

export const signup = async (input: userInput) => {
  const { hash, salt } = await hashPassword(input.password);
  const user = new User({
    ...input,
    createdDate: Date.now(),
    password: hash,
    salt: salt,
  });
  let status = 0;
  console.log(`input data to middleware: ${JSON.stringify(input)}`);
  console.log(`user data being saved to db: ${JSON.stringify(user)}`);
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
  const { hash } = await hashPassword(password, salt);
  return hash === encryptedPassword;
};

export const authenticateUser = async (
  email: string,
  submittedPassword
): Promise<any> => {
  const user = await User.findOne({ email });
  if (user) {
    console.log(`User found: ${user}`);
    return {
      await: false,
      status: 200,
    };
  } else {
    console.log(`User not found with email: ${email}`);
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
      status: 400,
    };
  }
};
