import React from "react";
import { useError } from "./ErrorProvider";

const ErrorPopup = () => {
  const { error } = useError();

  if (!error) return null;

  return (
    <div className="fixed bottom-4 z-50 right-4 bg-red-500 text-white p-4 rounded shadow-lg">
      <p>{error}</p>
    </div>
  );
};

export default ErrorPopup;