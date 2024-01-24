import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import AutoFixOffIcon from "@mui/icons-material/AutoFixOff";
import LuggageIcon from "@mui/icons-material/Luggage";
import Typography from "@mui/material/Typography";
import ButtonAppBar from "@/components/Genral NavBar/nav";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import PsychologyIcon from "@mui/icons-material/Psychology";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import SkateboardingIcon from "@mui/icons-material/Skateboarding";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import AddAlertIcon from "@mui/icons-material/AddAlert";
export default function CustomizedTimeline() {
  return (
    <>
      <ButtonAppBar />
      <Timeline
        position="alternate"
        style={{
          backgroundColor: "white",
          height: "fit-content",
          width: "100%",
          margin: "0%",
        }}
      >
        <center>
          <Typography
            variant="h3"
            style={{ margin: "1rem", fontFamily: "monospace" }}
          >
            Terms and Conditions
          </Typography>
        </center>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            align="right"
            variant="h6"
            style={{ fontWeight: "bold", fontFamily: "Times new roman" }}
          >
            Ticket Purchase and Validity
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="success">
              <ConfirmationNumberIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography style={{ width: "80%", textAlign: "justify" }}>
              Passengers must purchase a valid ticket before boarding the bus.
              Tickets are non-transferable and can only be used by the person
              whose name is on the ticket. Tickets are valid only for the
              specified date, time, and route.
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            variant="h6"
            style={{ fontWeight: "bold", fontFamily: "Times new roman" }}
          >
            Boarding and Alighting
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary">
              <SkateboardingIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography
              style={{ width: "80%", textAlign: "justify", float: "right" }}
            >
              Passengers should arrive at the boarding point at least 15 minutes
              before the scheduled departure time. Passengers must board the bus
              only from designated boarding points. Passengers should alight the
              bus only at designated stops.
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            align="right"
            variant="h6"
            style={{ fontWeight: "bold", fontFamily: "Times new roman" }}
          >
            Conduct and Behavior
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="warning">
              <PsychologyIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography style={{ width: "80%", textAlign: "justify" }}>
              Passengers are expected to behave in a respectful and courteous
              manner towards fellow passengers and bus staff. Any form of unruly
              behavior, harassment, or misconduct is strictly prohibited.
              Smoking, consumption of alcohol or illegal substances, and any
              form of illegal activity are strictly prohibited on the bus.
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            variant="h6"
            style={{ fontWeight: "bold", fontFamily: "Times new roman" }}
          >
            Baggage and Belongings
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="error">
              <LuggageIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography
              style={{ width: "80%", textAlign: "justify", float: "right" }}
            >
              Passengers are allowed a specific amount of luggage, and oversized
              or excessive baggage may require additional fees. Bus company is
              not responsible for any loss or damage to passengers' belongings.
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            align="right"
            variant="h6"
            style={{ fontWeight: "bold", fontFamily: "Times new roman" }}
          >
            Seat Reservation
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="success">
              <EventSeatIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography style={{ width: "80%", textAlign: "justify" }}>
              Seat reservations are subject to availability. Passengers are
              expected to occupy the seat assigned to them.
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            variant="h6"
            style={{ fontWeight: "bold", fontFamily: "Times new roman" }}
          >
            Schedule Changes and Delays
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary">
              <DepartureBoardIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography
              style={{ width: "80%", textAlign: "justify", float: "right" }}
            >
              The bus company reserves the right to alter schedules due to
              unforeseen circumstances or operational reasons. Passengers will
              be informed of any schedule changes or delays in a timely manner.
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            align="right"
            variant="h6"
            style={{ fontWeight: "bold", fontFamily: "Times new roman" }}
          >
            Refunds and Cancellations
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="warning">
              <EventBusyIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography style={{ width: "80%", textAlign: "justify" }}>
              Refunds are subject to the bus company's refund policy. Passengers
              should check and understand the cancellation policy before
              booking.
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            variant="h6"
            style={{ fontWeight: "bold", fontFamily: "Times new roman" }}
          >
            Health and Safety
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="error">
              <HealthAndSafetyIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography
              style={{ width: "80%", textAlign: "justify", float: "right" }}
            >
              Passengers are required to follow all safety instructions provided
              by bus staff. The bus company is not liable for any injuries or
              accidents that occur due to non-compliance with safety
              instructions.
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            align="right"
            variant="h6"
            style={{ fontWeight: "bold", fontFamily: "Times new roman" }}
          >
            Emergency Procedures
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="success">
              <MedicalServicesIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography style={{ width: "80%", textAlign: "justify" }}>
              Passengers should familiarize themselves with emergency
              procedures, including the location of emergency exits and safety
              equipment.
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            variant="h6"
            style={{ fontWeight: "bold", fontFamily: "Times new roman" }}
          >
            Liability and Indemnification
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary">
              <AddAlertIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography
              style={{ width: "80%", textAlign: "justify", float: "right" }}
            >
              The bus company is not liable for any loss, damage, or injury
              incurred by passengers, except where negligence on the part of the
              company is proven. Passengers agree to indemnify the bus company
              against any claims arising from their actions or behavior.
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            align="right"
            variant="h6"
            style={{ fontWeight: "bold", fontFamily: "Times new roman" }}
          >
            Force Majeure
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="warning">
              <AutoFixOffIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography style={{ width: "80%", textAlign: "justify" }}>
              The bus company is not responsible for delays, cancellations, or
              changes in service due to circumstances beyond its control, such
              as natural disasters, strikes, or government regulations.
            </Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </>
  );
}
