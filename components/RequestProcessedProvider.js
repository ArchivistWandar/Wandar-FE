// Context provider component
import React, { useState } from "react";
export const RequestProcessedContext = React.createContext({
  isProcessed: false,
  setRequestProcessed: () => {},
});

export const RequestProcessedProvider = ({ children }) => {
  const [requestProcessed, setRequestProcessed] = useState(false);

  return (
    <RequestProcessedContext.Provider
      value={{ requestProcessed, setRequestProcessed }}
    >
      {children}
    </RequestProcessedContext.Provider>
  );
};
