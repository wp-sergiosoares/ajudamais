import { useAuthContext } from "../hooks/useAuthContext";

import { useEffect, useState } from "react";

import { useTicketsContext } from "../hooks/useTicketsContext";
const HomeUltimosPedidos = () => {
  const { tickets, dispatch } = useTicketsContext();

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

  console.log(tickets);

  const ultimosPedidos = tickets
    .filter((p) => p.title && p.createdAt)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  console.log(ultimosPedidos);

  return (
    <div className="section section-ultimos-pedidos">
      <div className="container">
        <div className="section-header">
          <h3>Últimos Pedidos</h3>
          <p>
            Vê o que os teus vizinhos estão a precisar - talvez possas fazer a
            diferença.
          </p>
        </div>
        <div className="section-content card-items">
          {ultimosPedidos.map((pedido) => (
            <div className="card-item">
              <span class="material-symbols-outlined cat-transportes">
                local_hospital
              </span>

              <div className="card-title">{pedido.title}</div>
              <div className="card-category">{pedido.category[0]}</div>
              <div className="card-location">{pedido.cidade}</div>
              <button class="btn btn-small btn-secondary">Quero ajudar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeUltimosPedidos;
