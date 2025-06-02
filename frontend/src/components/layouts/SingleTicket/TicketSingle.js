import classes from "./TicketSingle.module.scss";
import classNames from "classnames";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router";

import { useTicketNearBy } from "../../../features/tickets/hooks/useTicketNearBy";

import { useInfo } from "../../../context/InfoContext";

import TicketHeader from "../../common/TicketHeader/TicketHeader";

import TicketDetails from "../../common/TicketDetails/TicketDetails";

const TicketSingle = () => {
  const { id } = useParams();

  const { getCategoryLabel } = useInfo();

  const navigate = useNavigate();

  const { getDistanceNearBy } = useTicketNearBy();

  const [ticket, setSingleTicket] = useState(null);

  useEffect(() => {
    const getSingleTicket = async () => {
      try {
        const response = await fetch(`/api/tickets/${id}`);
        const json = await response.json();

        if (!response.ok) {
          throw new Error("Erro");
        }

        setSingleTicket(json);
      } catch (error) {
        console.error(error);
      }
    };
    getSingleTicket();
  }, [id]);

  if (!ticket) return <div>Carregando...</div>;

  return (
    <div className="page-center page-center-small">
      <div className="page-header">
        <div>
          {ticket.typeOfTicket === "pedido" ? (
            <h1>Pedido de ajuda</h1>
          ) : (
            <h1>Ofereço para</h1>
          )}
          <p>Vamos construir juntos um lugar mais solidário — participe!</p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="btn btn-small btn-secondary"
        >
          <span className="material-symbols-outlined">keyboard_arrow_left</span>
        </button>
      </div>

      <div className={classes["single-ticket"]}>
        <TicketHeader title={ticket.title} />

        <TicketDetails
          category={ticket.category}
          cidade={ticket.cidade}
          createdAt={ticket.createdAt}
        />

        <div className={classes["ticket-description"]}>
          {ticket.description}
        </div>

        {ticket.email && (
          <div
            className={classNames(
              classes["ticket-action"],
              classes["ticket-action-help"]
            )}
          >
            <h4>Seja protagonista na sua comunidade.</h4>
            Entra em contacto com este pedido através do email:{" "}
            <Link to={`mailto:${ticket.email}`}>{ticket.email}</Link>
          </div>
        )}

        {ticket.phone && (
          <div className={classes["ticket-action"]}>
            <span>O Autor do pedido deixou um contacto</span>
            <button className="btn btn-small btn-secondary">
              {ticket.phone}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketSingle;
