import { useTickets } from "../context/FiltrosContext";
import { useInfo } from "../context/InfoContext";

const FiltroCategory = () => {
  const { categoryFilter, setCategoryFilter } = useTickets();
  const { categorias } = useInfo();
  return (
    <div className="filtro-item">
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <option value="">Todas as Categorias</option>
        {categorias.map((cat, index) => (
          <option key={index} value={cat.id}>
            {cat.nome}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FiltroCategory;
