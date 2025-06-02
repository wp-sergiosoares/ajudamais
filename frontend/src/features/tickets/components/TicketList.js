import classNames from "classnames";

import classes from "./TicketList.module.scss";

import TicketDetails from "./TicketDetails";
import { useTicketNearBy } from "../hooks/useTicketNearBy";

const TicketList = ({ tickets }) => {
  const { getDistanceNearBy } = useTicketNearBy();
  return (
    // <ul className="ticket-list ticket-list-columns">
    <ul
      className={classNames(
        classes["ticket-list"],
        classes["ticket-list-columns"]
      )}
    >
      {tickets.map((ticket) => (
        <TicketDetails
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
