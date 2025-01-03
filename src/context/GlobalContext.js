// context/GlobalContext.js
import React, { createContext, useReducer, useState } from "react";

const GlobalContext = createContext();

const initialState = {
  companies: [],
  communicationMethods: [
    { name: "LinkedIn Post", description: "Post on LinkedIn", sequence: 1, mandatory: true },
    { name: "LinkedIn Message", description: "Message on LinkedIn", sequence: 2, mandatory: true },
    { name: "Email", description: "Send an email", sequence: 3, mandatory: false },
    { name: "Phone Call", description: "Call the company", sequence: 4, mandatory: false },
    { name: "Other", description: "Other communication", sequence: 5, mandatory: false },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case "addCompany":
      return { ...state, companies: [...state.companies, action.payload] };
    case "updateCompany":
      return {
        ...state,
        companies: state.companies.map((company) =>
          company.id === action.payload.id ? action.payload : company
        ),
      };
    case "deleteCompany":
      return { ...state, companies: state.companies.filter((c) => c.id !== action.payload) };
    case "updateCommunicationMethods":
      return { ...state, communicationMethods: action.payload };
    default:
      return state;
  }
}

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showAdminModal, setShowAdminModal] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        dispatch,
        showAdminModal,
        setShowAdminModal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
