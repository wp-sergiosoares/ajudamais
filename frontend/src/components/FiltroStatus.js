import { useTickets } from "../context/FiltrosContext";

const FiltroStatus = () => {
  const { statusFilter, setStatusFilter } = useTickets();

  return (
    <div className="filtro-item">
      <select
        onChange={(e) => setStatusFilter(e.target.value)}
        value={statusFilter}
      >
        <option value="pendente">Pendente</option>
        <option value="aprovado">Aprovado</option>
        <option value="rejeitado">Rejeitado</option>
        <option value="resolvido">Resolvido</option>
      </select>
    </div>
  );
};

export default FiltroStatus;
