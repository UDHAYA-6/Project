import { MongoClient } from "mongodb";
const uri =
  "mongodb+srv://user1:user1idp@cluster0.8qbnl0l.mongodb.net/?retryWrites=true&w=majority";
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
