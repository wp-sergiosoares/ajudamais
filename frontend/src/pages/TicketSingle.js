import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
        <h1>Detalhes</h1>

        <button
          onClick={() => navigate(-1)}
          className="btn btn-small btn-secondary"
        >
          <span class="material-symbols-outlined">keyboard_arrow_left</span>
        </button>
      </div>

      <div className="single-ticket">
        <div className={`ticket-details ${ticket.category}`}>
          <span className="ticket-category">
            {getCategoryLabel(ticket.category)}
          </span>
          <span>{ticket.cidade}</span>
          <span>{ticket.distance}</span>
        </div>
        <div className="ticket-title">{ticket.title}</div>
        <div className="ticket-description">{ticket.description}</div>

        {ticket.email && (
          <div className="ticket-action">
            <span>O Autor do pedido deixou um contacto</span>
            <button className="btn btn-primary">{ticket.email}</button>
          </div>
        )}

        {ticket.phone && (
          <div className="ticket-action">
            <span>O Autor do pedido deixou um contacto</span>
            <button className="btn btn-primary">{ticket.phone}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketSingle;
