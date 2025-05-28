import { createContext, useReducer } from "react";

export const TicketsContext = createContext();

export const ticketsReducer = (state, action) => {
  switch (action.type) {
    case "SET_TICKETS":
      return {
        ...state,
        tickets: action.payload,
      };
    case "CREATE_TICKET":
      return {
        tickets: [action.payload, ...state.tickets],
      };
    case "DELETE_TICKET":
      return {
        ...state,
        tickets: state.tickets.filter((w) => w._id !== action.payload),
      };
    case "PATCH_TICKET":
      return {
        ...state,
        tickets: state.tickets.map((ticket) =>
          ticket._id === action.payload._id ? action.payload : ticket
        ),
      };
    default:
      return state;
  }
};

export const TicketsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ticketsReducer, {
    tickets: [],
  });

  return (
    <TicketsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TicketsContext.Provider>
  );
};
