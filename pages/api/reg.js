import { ConnectToDatabase } from "../../Mongodb/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { Name, Email, Pass } = req.body;
    try {
      const cl = await ConnectToDatabase();
      const client = await cl.connect();
      const db = client.db("ukdb");
      const data = await db.collection("Users").findOne({ Email: Email });
      if (data) {
        res.status(409).json({ msg: "User already found" });
      } else {
        await db
          .collection("Users")
          .insertOne({ Name: Name, Email: Email, Password: Pass });
        res.status(200).json({ msg: "Successfully registered" });
      }
      client.close();
    } catch (error) {
      res.status(405).json({ msg: "Failed to register:" + error });
    }
  }
}
