import dns from "dns";
import mongoose from "mongoose";
import { config } from "./app.config";

// Node on Windows can fail SRV lookups with some ISP DNS servers
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const connectDatabase = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Connected to Mongo database");
  } catch (error) {
    console.log("Error connecting to Mongo database");
    process.exit(1);
  }
};

export default connectDatabase;
