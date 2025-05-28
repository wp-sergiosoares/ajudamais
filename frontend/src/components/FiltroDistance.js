import { useTickets } from "../context/FiltrosContext";

const FiltroDistance = () => {
  const { distanceFilter, setDistanceFilter } = useTickets();

  return (
    <div className="filtro-item">
      <select
        value={distanceFilter}
        onChange={(e) => setDistanceFilter(Number(e.target.value))}
      >
        <option value="500">Até 500 metros</option>
        <option value="1000">Até 1 km</option>
        <option value="2000">Até 2 kms</option>
        <option value="5000">Até 5 kms</option>
        <option value="10000">Até 10 kms</option>
        <option value="20000">Até 20 kms</option>
        <option value="40000">Até 40 kms</option>
      </select>
    </div>
  );
};

export default FiltroDistance;
