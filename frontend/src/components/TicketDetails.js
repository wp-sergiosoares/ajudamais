import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { useInfo } from "../context/InfoContext";

import { Link } from "react-router-dom";

const TicketDetails = ({ ticket, distance }) => {
  const { _id, title, category, createdAt, cidade } = ticket;

  const { getCategoryLabel } = useInfo();

  return (
    <li key={_id} className={category}>
      <Link to={`/pedido/${_id}`} className="ticket-link">
        <div className="ticket-container">
          <div className="ticket-header">
            <h2 className="ticket-title">{title}</h2>
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
            <div className="ticket-date">
              {formatDistanceToNow(new Date(createdAt), {
                addSuffix: true,
              })}
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default TicketDetails;
