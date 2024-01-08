import { ConnectToDatabase } from "@/Mongodb/mongodb";
import { ObjectId } from "bson";
export default async function handler(req, res) {
  if (req.method === "GET") {
    const cl = await ConnectToDatabase();
    const client = await cl.connect();
    const db = await client.db("ukdb");
    const data = await db.collection("Bus").find({}).toArray();
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ msg: "No data found" });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    console.log("iddddddddd", id);
    const cl = await ConnectToDatabase();
    const client = await cl.connect();
    const db = await client.db("ukdb");
    const data = await db
      .collection("Bus")
      .deleteOne({ _id: new ObjectId(id) });
    if (data.deletedCount === 1) {
      res.status(200).json({ msg: "Successfully deleted a bus" });
    } else {
      res.status(400).json({ msg: "The data is not deleted" });
    }
  } else if (req.method === "POST") {
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
  }
}
