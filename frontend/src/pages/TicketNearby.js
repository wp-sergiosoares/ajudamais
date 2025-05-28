// components
import TicketDetails from "../components/TicketDetails";
import FiltroType from "../components/FiltroType";
import FiltroDistance from "../components/FiltroDistance";
import FiltroCategory from "../components/FiltroCategory";

import { useTicketNearBy } from "../hooks/useTicketNearBy";

const TicketNearby = () => {
  const { tickets, distanceFilter, getDistanceNearBy, isLoading, error } =
    useTicketNearBy();

  if (isLoading)
    return (
      <div className="spinner-wrapper">
        <div className="spinner"></div>
      </div>
    );
  if (error) return <p>Erro: {error}</p>;

  console.log(tickets);

  return (
    <div className="wrapper wrapper-pedidos">
      <div className="page-center">
        {/* <SidebarLeft /> */}

        {/* <h2>Pedidos a {distanceFilter} metros de ti.</h2> */}

        {/* {locationError && <div className="error">{locationError}</div>}
      {error && <div className="error">{error}</div>}
      }
      {tickets.length > 0 && <p>Foram encontrados {tickets.length} pedidos</p>}

      {tickets.length > 0 && (
        <p>
          Estes são os pedidos mais próximos, até {distanceFilter} metros, da
          sua localização.
        </p>
      )} */}

        <div className="filtros">
          <FiltroType />
          <FiltroCategory />
          <FiltroDistance />
        </div>

        <div className="ticket-info">
          {tickets.length === 0 && (
            <p>Nenhum ticket encontrado a {distanceFilter} metros.</p>
          )}

          {tickets.length > 0 && (
            <p>Foram encontrados {tickets.length} resultados.</p>
          )}
        </div>

        <ul className="ticket-list ticket-list-columns">
          {tickets.map((ticket) => (
            <TicketDetails
              key={ticket.id}
              ticket={ticket}
              distance={
                getDistanceNearBy(ticket) != null
                  ? `${getDistanceNearBy(ticket)} m`
                  : "?"
              }
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TicketNearby;
