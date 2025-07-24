import React, { useState } from "react";
import {
  Calendar,
  ReasonTextarea,
  SubmitButton,
  LeaveCard,
} from "../components/components";

const RequestLeave = () => {
  const TOTAL_ANNUAL_LEAVES = 12;
  const [selectedDate, setSelectedDate] = useState(null);
  const [reason, setReason] = useState("");
  const [leaveType, setLeaveType] = useState("Annual");
  const [submittedLeaves, setSubmittedLeaves] = useState([]);

  const usedLeavesCount = submittedLeaves.filter(
    (leave) => leave.type !== "Paid"
  ).length;

  const remainingLeaves = TOTAL_ANNUAL_LEAVES - usedLeavesCount;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedDate || !reason.trim()) {
      alert("Please select a valid date and enter a reason.");
      return;
    }

    const payload = {
      date: selectedDate.toISOString().split("T")[0],
      reason: reason.trim(),
      type: leaveType,
      status: "Pending",
    };

    setSubmittedLeaves((prev) => [...prev, payload]);
    setSelectedDate(null);
    setReason("");
    setLeaveType("Annual");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-lg space-y-8">
      <h1 className="text-2xl font-bold text-center text-gray-800">
        Request Leave Form
      </h1>

      <div className="text-center text-md font-medium text-blue-600">
        <p>
          Used Annual Leaves: <strong>{usedLeavesCount}</strong> /{" "}
          {TOTAL_ANNUAL_LEAVES}
        </p>
        <p>
          Remaining: <strong>{remainingLeaves}</strong>
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-md shadow-md"
      >
        <div className="flex flex-wrap gap-4">
          <div className="w-full md:w-1/2">
            <Calendar
              startDate={selectedDate}
              setStartDate={setSelectedDate}
              label="Choose Leave Date"
            />
          </div>

          <div className="w-full md:w-1/2">
            <label className="block font-medium mb-1">Type of Leave</label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="Annual">Annual</option>
              <option value="Paid">Paid</option>
              <option value="Sick">Sick</option>
            </select>
          </div>
        </div>

        <ReasonTextarea reason={reason} setReason={setReason} />
        <SubmitButton />
      </form>

      {submittedLeaves.length > 0 && (
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Your Leave Requests
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {submittedLeaves.map((leave, index) => (
              <LeaveCard
                key={index}
                date={leave.date}
                reason={leave.reason}
                status={leave.status}
                type={leave.type}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestLeave;
