import React from "react";

const ReasonTextarea = ({ reason, setReason }) => {
  return (
    <div>
      <label htmlFor="reason" className="block text-gray-700 font-medium mb-1">
        Reason for Leave
      </label>
      <textarea
        id="reason"
        rows="4"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Explain your reason clearly..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        required
      />
    </div>
  );
};

export default ReasonTextarea;
