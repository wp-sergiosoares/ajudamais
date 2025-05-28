import { useTickets } from "../context/FiltrosContext";

const FiltroType = () => {
  const { typeFilter, setTypeFilter } = useTickets();

  return (
    <div className="filtro-item">
      <select
        onChange={(e) => setTypeFilter(e.target.value)}
        value={typeFilter}
      >
        <option value="pedido">Pedidos de Ajuda</option>
        <option value="oferta">Oferta de Ajuda</option>
      </select>
    </div>
  );
};

export default FiltroType;
