/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
export const Context = createContext(null);
export const ContextProvider = ({ children }) => {
  const [orders, setOrders] = useState(true);
  const values = {
    orders,
    setOrders,
  };
  return <Context.Provider value={values}>{children}</Context.Provider>;
};
