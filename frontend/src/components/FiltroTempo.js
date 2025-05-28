import { useTickets } from "../context/FiltrosContext";

const FiltroTempo = () => {
  const { tempoFilter, setTempoFilter } = useTickets();

  return (
    <div className="filtro-item">
      <select
        onChange={(e) => setTempoFilter(e.target.value)}
        value={tempoFilter}
      >
        <option value="hoje">Hoje</option>
        <option value="ultimas-24">Últimas 24h</option>
        <option value="esta-semana">Esta semana</option>
        <option value="todos">Todos</option>
      </select>
    </div>
  );
};

export default FiltroTempo;
