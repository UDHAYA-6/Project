import { ConnectToDatabase } from "../../Mongodb/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { Name, Email, Pass } = req.body;
    console.log({ Name, Email, Pass });
    try {
      const cl = await ConnectToDatabase();
      const client = await cl.connect();
      const db = client.db("Transport");
      const data = await db.collection("Users").findOne({ Email: Email });
      if (data) {
        res.status(405).json({ msg: "User already found" });
        console.log("user already found");
      } else {
        console.log("no user found");
        await db
          .collection("Users")
          .insertOne({ Name: Name, Email: Email, Password: Pass });
        res.status(200).json({ msg: "Successfully registered" });
      }
      client.close();
    } catch (error) {
      res.status(405).json({ msg: "Failed to register" + error });
    }
  }
}
