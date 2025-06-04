import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { useInfo } from "../../../context/InfoContext";

const TicketDetails = ({ category, cidade, createdAt, distance }) => {
  const { getCategoryLabel } = useInfo();

  return (
    <div>
      <div className="ticket-details">
        <div className="ticket-content">
          <div className={category}>
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
    </div>
  );
};

export default TicketDetails;
