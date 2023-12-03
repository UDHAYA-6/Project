import { ConnectToDatabase } from "../../Mongodb/mongodb";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { Email, Pass } = req.body;
    console.log({ Email, Pass });
    try {
      const cl = await ConnectToDatabase();
      const client = await cl.connect();
      const db = client.db("Transport");
      const user = await db
        .collection("Users")
        .findOne({ Email: Email, Password: Pass });
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(405).json({ msg: "No user found" });
      }
      client.close();
    } catch (error) {
      client.close();
      console.error(error);
      res.status(500).json({ msg: "Server Error" + error.message });
    }
  } else {
    res.status(405).json({ msg: "Method Not Allowed" });
  }
}
