import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI;
let CachedClient = null;
async function ConnectToDatabase() {
  if (CachedClient) return CachedClient;
  const client = new MongoClient(uri);

  try {
    CachedClient = client;
    return client;
  } catch {
    throw new Error(
      "Unable to connect to mongodb,Check your internet connection"
    );
  }
}

export { ConnectToDatabase };
