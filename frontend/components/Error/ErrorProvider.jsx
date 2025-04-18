import React, { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(null), 5000); // Auto-hide after 5 seconds
  };

  const contextValue = React.useMemo(() => ({ error, showError }), [error]);

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  );
};
export const useError = () => useContext(ErrorContext);

ErrorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};