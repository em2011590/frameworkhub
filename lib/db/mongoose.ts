import mongoose from "mongoose";



interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };
global.mongoose = cached;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (!cached.promise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.warn("MONGODB_URI is not defined. Using fallback mode.");
      return mongoose;
    }
    cached.promise = Promise.race([
      mongoose.connect(uri, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 5000,
        connectTimeoutMS: 5000,
      }),
      new Promise<typeof mongoose>((_, reject) =>
        setTimeout(() => reject(new Error("Database connection timeout")), 6000)
      ),
    ]);
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error("Database connection failed:", error);
    cached.promise = null;
    throw error;
  }
}
