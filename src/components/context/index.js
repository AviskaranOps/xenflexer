import React, { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

export const useAppContext = () => useContext(Context);

export const ContextProvider = ({ children }) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000); // Update every 1 second
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const timeStart = () => {
    timeReset();
    setIsRunning(true);
  };

  const timeStop = () => {
    setIsRunning(false);
  };

  const timeReset = () => {
    setSeconds(0);
  };

  return (
    <Context.Provider
      value={{
        seconds,
        timeStart,
        timeStop,
        timeReset,
      }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
