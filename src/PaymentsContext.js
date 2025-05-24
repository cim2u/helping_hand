import React, { createContext, useState } from "react";

export const PaymentsContext = createContext();

export const PaymentsProvider = ({ children }) => {
  const [payments, setPayments] = useState([
    { id: 1, user: "Juan Dela Cruz", amount: 1500, reference: "GCASH123456789", date: "2023-05-15", status: "pending" },
    { id: 2, user: "Maria Santos", amount: 2500, reference: "GCASH987654321", date: "2023-05-16", status: "pending" },
    { id: 3, user: "Pedro Bautista", amount: 1800, reference: "GCASH567891234", date: "2023-05-17", status: "pending" }
  ]);

  const updatePaymentStatus = (id, status) => {
    setPayments(prevPayments =>
      prevPayments.map(payment =>
        payment.id === id ? { ...payment, status } : payment
      )
    );
  };

  return (
    <PaymentsContext.Provider value={{ payments, updatePaymentStatus }}>
      {children}
    </PaymentsContext.Provider>
  );
};
