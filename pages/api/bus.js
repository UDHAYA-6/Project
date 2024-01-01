import { ConnectToDatabase } from "@/Mongodb/mongodb";
export default async function handler(req, res) {
  if (req.method === "GET") {
    const cl = await ConnectToDatabase();
    const client = await cl.connect();
    const db = await client.db("ukdb");
    const data = await db.collection("Bus").find({}).toArray();
    console.log("buses", data);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ msg: "No data found" });
    }
  } else {
    res.status(405).json({ msg: "Method invalid" });
  }
}
