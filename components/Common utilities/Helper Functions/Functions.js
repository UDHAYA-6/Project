//import Buses from "../../../Data/Bus";
import Buses from "@/components/Common utilities/Data/Bus.json";
const Bus = Buses;
const UpdateBusStructure = (
  Bus_no,
  BusName,
  Arrival,
  Departure,
  LowerSeater,
  LowerSleeper,
  UpperPrice,
  Source,
  Destination,
  Via
) => {
  const lowerSleeperSeats = Bus.Seats.Lower.sleeper;
  const lowerSeaterSeats = Bus.Seats.Lower.Seater;
  const upperSeatsRight = Bus.Seats.Upper.Right;
  const upperSeatsleft = Bus.Seats.Upper.Left;

  lowerSleeperSeats.forEach((seat) => {
    seat.seatPrice = { $numberInt: LowerSleeper.toString() };
  });
  lowerSeaterSeats.forEach((seat) => {
    seat.seatPrice = { $numberInt: LowerSeater.toString() };
  });
  upperSeatsRight.forEach((seat) => {
    seat.seatPrice = { $numberInt: UpperPrice.toString() };
  });
  upperSeatsleft.forEach((seat) => {
    seat.seatPrice = { $numberInt: UpperPrice.toString() };
  });
  Bus.Bus_no = Bus_no;
  Bus.Source = Source;
  Bus.Destination = Destination;
  Bus.Via = Via;
  Bus.BusName = BusName;
  Bus.Arrival = Arrival;
  Bus.Departure = Departure;

  return Bus;
};

const Category = (seatNumber) => {
  let category;
  if (seatNumber.startsWith("LS")) {
    category = "Lower.Seater";
  } else if (seatNumber.startsWith("SB")) {
    category = "Lower.sleeper";
  } else if (seatNumber.startsWith("UR")) {
    category = "Upper.Right";
  } else if (seatNumber.startsWith("UL")) {
    category = "Upper.Left";
  } else {
    console.error(`Unknown category for seat: ${seatNumber}`);
  }
  return category;
};

const Lowerseater = (womenLowerSeater) => {
  return womenLowerSeater
    .filter((item) => {
      return (
        item.seatStatus === "Booked" &&
        item.passengerDetails &&
        item.passengerDetails.gender === "Female"
      );
    })
    .map((femaleSeat) => {
      const seatNumber = femaleSeat.seat_num;
      const prefix = seatNumber.substring(0, 2);
      const numberPart = seatNumber.substring(2);
      const K = Number(numberPart);
      return `${prefix}${K <= 9 ? K + 9 : K - 9}`;
    });
};

const Upperright = (womenUpperRightDeck) => {
  return womenUpperRightDeck
    .filter((item) => {
      return (
        item.seatStatus === "Booked" &&
        item.passengerDetails &&
        item.passengerDetails.gender == "Female"
      );
    })
    .map((femaleSeat) => {
      const seatNumber = femaleSeat.seat_num;
      const prefix = seatNumber.substring(0, 2);
      const numberPart = seatNumber.substring(2);
      const K = Number(numberPart);
      return `${prefix}${K <= 5 ? K + 5 : K - 5}`;
    });
};

const styles = {
  width: 300,
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiInputBase-input": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    borderColor: "white",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
};

const TicketStyle = {
  "& .MuiInputLabel-root": {
    color: "blue",
  },
  "& .MuiInputBase-input": {
    color: "blue",
  },
  "& .MuiOutlinedInput-root": {
    borderColor: "blue",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "blue",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "blue",
  },
};

const Loginstyle = {
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiInputBase-input": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    borderColor: "white",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
};

function processInput(input) {
  const prefix = input.substring(0, 2).toUpperCase();
  switch (prefix) {
    case "LS":
      return 700;
    case "SB":
      return 1200;
    case "UR":
    case "UL":
      return 1100;
    default:
      return "U";
  }
}

export { processInput };

export { Loginstyle };
export { TicketStyle };
export { styles };
export { Upperright };
export { Lowerseater };
export { Category };
export { UpdateBusStructure };
