import classNames from "classnames";

import classes from "./TicketList.module.scss";

import TicketItem from "./TicketItem";
import { useTicketNearBy } from "../hooks/useTicketNearBy";

const TicketList = ({ tickets }) => {
  const { getDistanceNearBy } = useTicketNearBy();
  return (
    <ul
      className={classNames(
        classes["ticket-list"],
        classes["ticket-list-columns"]
      )}
    >
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
