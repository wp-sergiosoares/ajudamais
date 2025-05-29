import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router";

import { useTicketNearBy } from "../hooks/useTicketNearBy";

import { useInfo } from "../context/InfoContext";

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
        {ticket.typeOfTicket === "pedido" ? (
          <h1>Pedido de ajuda</h1>
        ) : (
          <h1>Ofereço para</h1>
        )}

        <button
          onClick={() => navigate(-1)}
          className="btn btn-small btn-secondary"
        >
          <span className="material-symbols-outlined">keyboard_arrow_left</span>
        </button>
      </div>

      <div className="single-ticket">
        <div className={`ticket-details ${ticket.category}`}>
          <span className="ticket-category">
            {getCategoryLabel(ticket.category)}
          </span>
          <span>{ticket.cidade}</span>
          {/* <span>{ticket.distance}</span> */}
        </div>
        <div className="ticket-title">{ticket.title}</div>
        <div className="ticket-description">{ticket.description}</div>

        {ticket.email && (
          <div className="ticket-action">
            Ajuda já!
            <Link
              to={`mailto:${ticket.email}`}
              className="btn btn-normal btn-secondary"
            >
              {ticket.email}
            </Link>
          </div>
        )}

        {ticket.phone && (
          <div className="ticket-action">
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
