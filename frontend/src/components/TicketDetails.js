import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { useInfo } from "../context/InfoContext";

import { Link } from "react-router-dom";

const TicketDetails = ({ ticket, distance }) => {
  const { _id, title, category, createdAt, cidade } = ticket;

  const { getCategoryLabel } = useInfo();

  return (
    <li key={_id} className={category}>
      <div className="ticket-container">
        <div className="ticket-header">
          <h2 className="ticket-title">
            <Link to={`/pedido/${_id}`}>{title}</Link>
          </h2>
        </div>

        <div className="ticket-content">
          <div>
            <span className="ticket-category">
              {getCategoryLabel(category)}
            </span>
            <span>{distance}</span>
          </div>

          <div>
            {cidade ? <span> {cidade}</span> : <span>Localização</span>}
          </div>

          {/* <div className="ticket-description">{description}</div> */}
        </div>

        <div className="ticket-footer">
          {/* <Link to={`/pedido/${_id}`} className="btn btn-primary btn-small">
            Quero ajudar
          </Link> */}

          <div className="ticket-date">
            {formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
            })}
          </div>
        </div>
      </div>
    </li>
  );
};

export default TicketDetails;
