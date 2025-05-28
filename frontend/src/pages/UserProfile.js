// import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import { useTicketsContext } from "../hooks/useTicketsContext";

import { formatRelative, subDays } from "date-fns";

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

const UserProfile = () => {
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

  const { tickets, dispatch } = useTicketsContext();

  // console.log(tickets);

  const { user } = useAuthContext();
  const token = user.token;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTickets = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/tickets/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Erro ao carregar dados");
        const json = await res.json();
        dispatch({ type: "SET_TICKETS", payload: json });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getTickets();
  }, [dispatch]);

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
        //if (onSucesso) onSucesso("Apagado com sucesso");
      }
    } catch (error) {
      console.log(error.message);
      //if (onErro) onErro("Erro na ligação à API.");
    }
  };

  const [fadeOutIds, setFadeOutIds] = useState([]);

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
      if (!response.ok) throw new Error("Erro ao atualizar status");

      dispatch({ type: "PATCH_TICKET", payload: json });
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(tickets);

  return (
    <div className="page-center">
      <h1>{user.email}</h1>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      {tickets && (
        <ul className="ticket-list ticket-list-user">
          {tickets.map((ticket) => (
            <li
              key={ticket._id}
              className={fadeOutIds.includes(ticket._id) ? "fade-out" : ""}
            >
              <div className="ticket-container">
                <div className="ticket-icon">
                  {getIconByCategory(ticket.category)}
                </div>
                <div className="ticket-content">
                  <div className="ticket-header">
                    <h2 className="ticket-title">
                      <Link to={`/pedido/${ticket._id}`}>
                        {ticket.description}
                      </Link>
                    </h2>
                  </div>

                  <div className="ticket-actions">
                    <div className="ticket-sub-header">
                      <div class="ticket-category">
                        <span>{ticket.category}</span>
                      </div>
                      <div>{ticket.status}</div>
                      <div>
                        {formatRelative(
                          subDays(new Date(ticket.createdAt), 3),
                          new Date(ticket.createdAt)
                        )}
                      </div>
                    </div>
                    {/* <div className="ticket-description">{description}</div> */}

                    <div className="ticket-footer">
                      <Link to={`/pedido/${ticket._id}`}>
                        <span class="material-symbols-outlined">link</span>
                      </Link>
                      <button>
                        <span class="material-symbols-outlined">edit</span>
                      </button>
                      <button onClick={(e) => handleDelete(e, ticket._id)}>
                        <span class="material-symbols-outlined">delete</span>
                      </button>
                      <button onClick={(e) => handleConcluido(e, ticket._id)}>
                        <span class="material-symbols-outlined">check</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserProfile;
