import TicketItem from "./TicketItem";
import { useTicketNearBy } from "../hooks/useTicketNearBy";

const TicketList = ({ tickets }) => {
  const { getDistanceNearBy } = useTicketNearBy();
  return (
    <ul className="ticket-list ticket-list-columns">
      {tickets.map((ticket) => (
        <TicketItem
          key={ticket.id}
          ticket={ticket}
          distance={
            getDistanceNearBy(ticket) != null
              ? `${getDistanceNearBy(ticket)} m`
              : "?"
          }
        />
      ))}
    </ul>
  );
};

export default TicketList;
