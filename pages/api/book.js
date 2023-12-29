// import { ConnectToDatabase } from "@/Mongodb/mongodb";
// import { ObjectId } from "mongodb";
// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { Get, id } = req.body;
//     try {
//       const cl = await ConnectToDatabase();
//       const client = await cl.connect();
//       const db = client.db("Transport");
//       const collection = await db.collection("Buses");

//       for (const seatData of Get) {
//         const { seatNumber, name, age, gender } = seatData;

//         let category;
//         if (seatNumber.startsWith("LS")) {
//           category = "Lower.Seater";
//         } else if (seatNumber.startsWith("LB")) {
//           category = "Lower.Sleeper";
//         } else if (seatNumber.startsWith("UR")) {
//           category = "Upper.Right";
//         } else if (seatNumber.startsWith("UL")) {
//           category = "Upper.Left";
//         } else {
//           console.error(`Unknown category for seat: ${seatNumber}`);
//           continue;
//         }

//         const updateResult = await collection.updateOne(
//           { _id: new ObjectId(id), [`Seats.${category}.seat_num`]: seatNumber },
//           {
//             $set: {
//               [`Seats.${category}.$[seat].passengerDetails`]: {
//                 name,
//                 age,
//                 gender,
//               },
//             },
//           },
//           { arrayFilters: [{ "seat.seat_num": seatNumber }] }
//         );

//         if (updateResult.modifiedCount !== 1) {
//           console.error(`Failed to update seat: ${seatNumber}`);
//         }
//       }

//       client.close();
//       res.status(200).json({ msg: "Seats updated successfully" });
//     } catch (error) {
//       console.error("Error updating seats:", error);
//       res.status(500).json({ msg: "Internal Server Error" });
//     }
//   } else {
//     res.status(405).json({ msg: "Invalid method" });
//   }
// }

import { ConnectToDatabase } from "@/Mongodb/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { Get, id } = req.body;
    try {
      const cl = await ConnectToDatabase();
      const client = await cl.connect();
      const db = client.db("ukdb");
      const collection = await db.collection("Bus");

      for (const seatData of Get) {
        const { seatNumber, name, age, gender } = seatData;

        let category;
        if (seatNumber.startsWith("LS")) {
          category = "Lower.Seater";
        } else if (seatNumber.startsWith("LB")) {
          category = "Lower.Sleeper";
        } else if (seatNumber.startsWith("UR")) {
          category = "Upper.Right";
        } else if (seatNumber.startsWith("UL")) {
          category = "Upper.Left";
        } else {
          console.error(`Unknown category for seat: ${seatNumber}`);
          continue;
        }

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
  } else {
    res.status(405).json({ msg: "Invalid method" });
  }
}
