import mongoose, { Connection } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// FIX #1: Inline type assertion — no global.d.ts needed
const globalWithMongoose = global as typeof globalThis & {
  mongooseConn?: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
};

let cached = globalWithMongoose.mongooseConn;

if (!cached) {
  cached = globalWithMongoose.mongooseConn = { conn: null, promise: null };
}

export const connectDb = async (): Promise<Connection> => {
  if (cached.conn) {
    if (process.env.NODE_ENV === "development") {
      console.log("✅ Using cached database connection");
    }
    return cached.conn;
  }

  if (!cached.promise) {
    if (process.env.NODE_ENV === "development") {
      console.log("🚀 Creating new database connection...");
    }

    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => mongooseInstance.connection);
  } else {
    if (process.env.NODE_ENV === "development") {
      console.log("⏳ Awaiting existing connection promise...");
    }
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error("❌ MongoDB connection failed:", error);
    throw new Error("Database connection failed. Check your MONGODB_URI.");
  }

  // FIX #2: Explicit type for 'err'
  cached.conn.on("error", (err: Error) => {
    console.error("MongoDB runtime error:", err.message);
  });

  cached.conn.on("disconnected", () => {
    console.warn("MongoDB disconnected. Resetting cache.");
    cached.conn = null;
    cached.promise = null;
  });

  return cached.conn;
};

export default connectDb;