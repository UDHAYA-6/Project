import { ConnectToDatabase } from "@/Mongodb/mongodb";
export default async function handler(req, res) {
  if (req.method == "POST") {
    const { dt } = req.body;
    try {
      const cl = await ConnectToDatabase();
      const client = await cl.connect();
      const db = await client.db("ukdb");
      const data = await db.collection("Bus").insertOne(dt);
      console.log(data);
      if (data.acknowledged) {
        res.status(200).json({ msg: "New bus inserted successfully" });
      } else {
        res.status(400).json({ msg: "failed to insert the new bus" });
      }
    } catch (error) {
      res
        .status(404)
        .json({ msg: "Error while connecting to the database: " + error });
    }
  } else {
    res.status(405).json({ msg: "Method not allowed" });
  }
}
