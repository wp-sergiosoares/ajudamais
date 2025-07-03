import { Link } from "react-router-dom";

import TicketHeader from "../../../components/common/TicketHeader/TicketHeader";
import TicketDetails from "../../../components/common/TicketDetails/TicketDetails";

const TicketItem = ({ ticket, distance }) => {
  const { _id, title, category, createdAt, cidade } = ticket;

  return (
    <li key={_id}>
      <Link to={`/pedido/${_id}`} className="ticket-link">
        <div className="ticket-container flex flex-col items-center p-7 rounded-2xl">
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
