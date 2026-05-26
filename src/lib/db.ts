import mongoose from "mongoose";
// 1
const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("MONGODB_URL is missing in environment variables");
}
// 2.first go to global.d.ts and create there code and return from here..
let cached = global.mongooseConn;

if (!cached) {
  cached = global.mongooseConn = {
    conn: null,
    promise: null,
  };
}

const connectDb = async () => {
  try {
    // 1. Return existing connection
    if (cached.conn) {
      console.log("✅ Using cached database connection");
      return cached.conn;
    }

    if (cached.promise) {
      console.log("promise conn");
    }

    // 2. Create new connection promise if none exists
    if (!cached.promise) {
      console.log("🚀 Creating new database connection...");

      cached.promise = mongoose.connect(MONGODB_URL).then((c) => c.connection);
    }

    // 3. Await connection
    cached.conn = await cached.promise;
    console.log("✅ MongoDB connected");
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error("❌ Database connection failed:", error);
    throw error;
  }
};

export default connectDb;
