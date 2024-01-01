import { ConnectToDatabase } from "@/Mongodb/mongodb";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { Email, Password } = req.body;
    console.log({ Email, Password });
    try {
      const cl = await ConnectToDatabase();
      const client = await cl.connect();
      const db = client.db("ukdb");
      const data = await db
        .collection("admin")
        .findOne({ Email: Email, Password: Password });
      console.log("data", data);
      if (data) {
        res.status(200).json({ msg: "Successfully logged in" });
      } else {
        const data2 = await db.collection("admin").findOne({ Email: Email });
        console.log(data2);
        if (data2) {
          res.status(404).json({ msg: "Password Incorrect" });
        } else {
          res.status(400).json({ msg: "No such  user found" });
        }
      }
    } catch (error) {
      res.status(405).json({ msg: "Invalid request method" });
    }
  }
}
