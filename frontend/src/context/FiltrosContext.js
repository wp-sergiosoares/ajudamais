import React, { createContext, useContext, useState } from "react";

const FiltroContext = createContext();

export const FiltroProvider = ({ children }) => {
  // FILTROS
  const [statusFilter, setStatusFilter] = useState("ativo");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("pedido");
  const [tempoFilter, setTempoFilter] = useState("hoje");
  const [distanceFilter, setDistanceFilter] = useState(40000);
  const [priorityFilter, setPriorityFilter] = useState("urgente");

  //toggle FORM

  // const [filters, setFilters] = useState({
  //   status: "pendente",
  //   category: null,
  //   type: "pedido",
  // });

  //const [filteredTickets, setFilteredTickets] = useState([]);

  //const [tickets, setTickets] = useState([]);

  return (
    <FiltroContext.Provider
      value={{
        statusFilter,
        setStatusFilter,
        categoryFilter,
        setCategoryFilter,
        typeFilter,
        setTypeFilter,
        setDistanceFilter,
        distanceFilter,
        tempoFilter,
        setTempoFilter,
        priorityFilter,
        setPriorityFilter,
      }}
    >
      {children}
    </FiltroContext.Provider>
  );
};

export const useTickets = () => useContext(FiltroContext);
