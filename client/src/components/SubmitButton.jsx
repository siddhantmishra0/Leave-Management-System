import React from "react";

const SubmitButton = ({ label = "Submit Request" }) => {
  return (
    <button
      type="submit"
      className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
    >
      {label}
    </button>
  );
};

export default SubmitButton;
