import React from "react";

const LeaveCard = ({ date, reason, status }) => {
  return (
    <div className="bg-white p-4 rounded shadow border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Leave on {date}
      </h3>
      <p className="text-gray-600 mb-2">
        <span className="font-medium">Reason:</span> {reason}
      </p>
      <p className="text-sm text-blue-600 font-semibold">Status: {status}</p>
    </div>
  );
};

export default LeaveCard;
