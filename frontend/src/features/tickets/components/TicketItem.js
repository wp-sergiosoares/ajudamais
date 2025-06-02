import { Link } from "react-router-dom";
import classes from "./TicketItem.module.scss";

import TicketHeader from "../../../components/common/TicketHeader/TicketHeader";
import TicketDetails from "../../../components/common/TicketDetails/TicketDetails";

const TicketItem = ({ ticket, distance }) => {
  const { _id, title, category, createdAt, cidade } = ticket;

  return (
    <li key={_id}>
      <Link to={`/pedido/${_id}`} className={classes["ticket-link"]}>
        <div className={classes["ticket-container"]}>
          <TicketHeader title={title} />

          <TicketDetails
            category={category}
            cidade={cidade}
            createdAt={createdAt}
            distance={distance}
          />
        </div>
      </Link>
    </li>
  );
};

export default TicketItem;
