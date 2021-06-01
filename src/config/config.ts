import dotenv from "dotenv";

dotenv.config();

const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  keepAlive: true,
  autoIndex: false,
  retryWrites: true,
};

const MONGO_URL = process.env.MONGO_URT || "mongodb://localhost:27017/login";

const MONGO = {
  options: MONGO_OPTIONS,
  url: MONGO_URL,
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 4000;
const SERVER_TOKEN_EXPIRETIME =
  process.env.SERVER_TOKEN_EXPIRETIME || 1000 * 60 * 60 * 24;
const SERVER_TOKEN_SECRET =
  process.env.SERVER_TOKEN_SECRET || "jsonWebTokenInLogin";

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
  token: {
    expireTime: SERVER_TOKEN_EXPIRETIME,
    secret: SERVER_TOKEN_SECRET,
  },
};

export default {
  SERVER,
  MONGO,
};
