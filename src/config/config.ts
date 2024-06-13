import dotenv from "dotenv";

dotenv.config();

const MONGO_IP = process.env.MONGO_IP;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_USERNAME = process.env.DB_USER;
const MONGO_PASSWORD = process.env.DB_PASSWORD;

const PORT = process.env.PORT;

const SECRET = process.env.SECRET_JWT;

// const MONGO_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const MONGO_URL = process.env.MONGO_URL;

export const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: PORT,
  },

  auth: {
    secret: SECRET,
    expiresIn: "1d",
  },
};
