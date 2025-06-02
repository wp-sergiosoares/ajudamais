import classes from "./TicketHeader.module.scss";

const TicketHeader = ({ title }) => {
  return (
    <div className={classes["ticket-header"]}>
      <h2 className={classes["ticket-title"]}>{title}</h2>
    </div>
  );
};

export default TicketHeader;
