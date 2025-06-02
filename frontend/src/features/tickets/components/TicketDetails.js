import classNames from "classnames";

import classes from "./TicketDetails.module.scss";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { useInfo } from "../../../context/InfoContext";

import { Link } from "react-router-dom";

const TicketDetails = ({ ticket, distance }) => {
  const { _id, title, category, createdAt, cidade } = ticket;

  const { getCategoryLabel } = useInfo();

  return (
    <li key={_id} className={category}>
      <Link to={`/pedido/${_id}`} className={classes["ticket-link"]}>
        <div className={classes["ticket-container"]}>
          <div className={classes["ticket-header"]}>
            <h2 className={classes["ticket-title"]}>{title}</h2>
          </div>

          <div className={classes["ticket-content"]}>
            <div>
              <span className={classes["ticket-category"]}>
                {getCategoryLabel(category)}
              </span>
              <span>{distance}</span>
            </div>

            <div>
              {cidade ? <span> {cidade}</span> : <span>Localização</span>}
            </div>

            {/* <div className="ticket-description">{description}</div> */}
          </div>

          <div className={classes["ticket-footer"]}>
            <div className={classes["ticket-date"]}>
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
