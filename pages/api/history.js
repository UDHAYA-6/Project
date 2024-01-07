import { ConnectToDatabase } from "@/Mongodb/mongodb";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const Email = req.body;
    try {
      const cl = await ConnectToDatabase();
      const client = await cl.connect();
      const db = await client.db("ukdb");
      const data = await db
        .collection("Users")
        .find({ Email: Email.Email })
        .toArray();
      console.log(data);
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ msg: "No data found" });
      }
    } catch (error) {
      res.status(405).json({ msg: "Invalid method request" });
    }
  }
}
