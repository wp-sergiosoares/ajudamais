import { formatRelative, subDays } from "date-fns";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

import { useTicketsContext } from "../hooks/useTicketsContext";

import { Link } from "react-router-dom";

import {
  ShoppingBasket,
  HandHeart,
  HeartHandshake,
  Briefcase,
  PawPrint,
  AlertTriangle,
  Car,
  Facebook,
} from "lucide-react";

const categoryIcons = {
  transporte_solidario: <Car size={24} color="9C27B0" />,
  necessidades_basicas: <ShoppingBasket size={24} color="green" />,
  cuidados_e_apoio: <HandHeart size={24} color="pink" />,
  servicos_e_trabalho: <Briefcase size={24} color="blue" />,
  seguranca_alertas: <AlertTriangle size={24} color="red" />,
  animais: <PawPrint size={24} color="orange" />,
  outros: <span class="material-symbols-outlined">handyman</span>,
};

const getIconByCategory = (cat) => {
  return categoryIcons[cat] || <HeartHandshake size={64} color="#4E978A" />;
};

const UserTicketDetails = ({ ticket, onSucesso, onErro }) => {
  const { dispatch } = useTicketsContext();

  const { user } = useAuthContext();

  const { _id, description, category, createdAt } = ticket;

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/tickets/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error("Erro ao apagar o pedido.");
      }

      if (response.ok) {
        dispatch({ type: "DELETE_TICKET", payload: id });
        if (onSucesso) onSucesso("Apagado com sucesso");
      }
    } catch (error) {
      console.log(error.message);
      if (onErro) onErro("Erro na ligação à API.");
    }
  };

  const handleConcluido = async (e, id) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/tickets/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ status: "concluido" }),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error("Erro ao atualizar status");
      }

      dispatch({ type: "PATCH_TICKET", payload: json });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <li>
      <div className="ticket-container">
        <div className="ticket-icon">{getIconByCategory(category)}</div>
        <div className="ticket-content">
          <div className="ticket-header">
            <h2 className="ticket-title">
              <Link to={`/pedido/${_id}`}>{description}</Link>
            </h2>
          </div>

          <div className="ticket-actions">
            <div className="ticket-sub-header">
              <div class="ticket-category">
                <span>{category}</span>
              </div>

              <div>
                {formatRelative(
                  subDays(new Date(createdAt), 3),
                  new Date(createdAt)
                )}
              </div>
            </div>
            {/* <div className="ticket-description">{description}</div> */}

            <div className="ticket-footer">
              <Link to={`/pedido/${_id}`}>
                <span class="material-symbols-outlined">link</span>
              </Link>
              <button>
                <span class="material-symbols-outlined">edit</span>
              </button>
              <button onClick={(e) => handleDelete(e, _id)}>
                <span class="material-symbols-outlined">delete</span>
              </button>
              <button onClick={(e) => handleConcluido(e, _id)}>
                <span class="material-symbols-outlined">check</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default UserTicketDetails;
