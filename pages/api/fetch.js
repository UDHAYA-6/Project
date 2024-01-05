import { ConnectToDatabase } from "../../Mongodb/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { from, to } = req.query;

    try {
      const cl = await ConnectToDatabase();
      const client = await cl.connect();
      const db = client.db("ukdb");
      const data = await db.collection("Bus").findOne({
        Via: { $all: [from, to] },
      });
      if (data) {
        const dt = [data];
        res.status(200).json(dt);
      } else {
        res.status(404).json({ msg: "No such data found" });
      }
    } catch (error) {
      res.status(500).json({
        msg: "Internal Server Error",
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ msg: "Invalid method" });
  }
}
