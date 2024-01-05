import { ConnectToDatabase } from "@/Mongodb/mongodb";
import { ObjectId } from "mongodb";
import { Category } from "@/components/Helper Functions/Functions";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { Get, id } = req.body;
    console.log(Get);
    try {
      const cl = await ConnectToDatabase();
      const client = await cl.connect();
      const db = client.db("ukdb");
      const collection = await db.collection("Bus");

      for (const seatData of Get) {
        const { seatNumber, name, age, gender } = seatData;

        const category = Category(seatNumber);
        const updateResult = await collection.updateOne(
          { _id: new ObjectId(id), [`Seats.${category}.seat_num`]: seatNumber },
          {
            $set: {
              [`Seats.${category}.$[seat].passengerDetails`]: {
                name,
                age,
                gender,
              },
              [`Seats.${category}.$[seat].seatStatus`]: "Booked",
            },
          },
          { arrayFilters: [{ "seat.seat_num": seatNumber }] }
        );

        if (updateResult.modifiedCount !== 1) {
          console.error(`Failed to update seat: ${seatNumber}`);
        }
      }

      client.close();
      res.status(200).json({ msg: "Seats updated successfully" });
    } catch (error) {
      console.error("Error updating seats:", error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  } else if (req.method === "PUT") {
    const { seatNumber, Id } = req.body;
    const cl = await ConnectToDatabase();
    const client = await cl.connect();
    const db = client.db("ukdb");
    const collection = await db.collection("Bus");
    const category = Category(seatNumber);
    const result = await collection.updateOne(
      { _id: new ObjectId(Id), [`Seats.${category}.seat_num`]: seatNumber },
      {
        $set: {
          [`Seats.${category}.$.seatStatus`]: "Available",
        },
        $unset: {
          [`Seats.${category}.$.passengerDetails`]: 1,
        },
      }
    );
    console.log(result);
    if (result.matchedCount === 1) {
      res.status(200).json({ msg: "success" });
    } else {
      res.status(404).json({ msg: "failed" });
    }
  } else {
    res.status(405).json({ msg: "Invalid method" });
  }
}
