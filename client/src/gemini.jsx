import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Calendar,
  Briefcase,
  User,
  LogOut,
  ChevronDown,
  Bell,
  Search,
  Home,
  FileText,
  Send,
  Plus,
} from "lucide-react";

// --- MOCK DATA ---
// In a real application, this data would come from your API
const user = {
  name: "Alex Thompson",
  avatar: "https://placehold.co/100x100/6366F1/FFFFFF?text=AT",
};

const leaveStats = {
  annual: { total: 20, used: 8 },
  sick: { total: 10, used: 3 },
  personal: { total: 5, used: 5 },
};

const allLeaves = [
  {
    id: 1,
    type: "Annual",
    from: "2025-07-14",
    to: "2025-07-15",
    status: "Approved",
    reason: "Family vacation.",
  },
  {
    id: 2,
    type: "Sick",
    from: "2025-08-01",
    to: "2025-08-01",
    status: "Pending",
    reason: "Fever and headache.",
  },
  {
    id: 3,
    type: "Personal",
    from: "2025-06-20",
    to: "2025-06-20",
    status: "Approved",
    reason: "Appointment.",
  },
  {
    id: 4,
    type: "Annual",
    from: "2025-09-10",
    to: "2025-09-15",
    status: "Pending",
    reason: "Trip to the mountains.",
  },
  {
    id: 5,
    type: "Sick",
    from: "2025-05-30",
    to: "2025-05-30",
    status: "Rejected",
    reason: "Not enough details provided.",
  },
  {
    id: 6,
    type: "Annual",
    from: "2025-04-10",
    to: "2025-04-11",
    status: "Approved",
    reason: "Personal event.",
  },
  {
    id: 7,
    type: "Personal",
    from: "2025-03-05",
    to: "2025-03-05",
    status: "Approved",
    reason: "Bank work.",
  },
];

const leaveChartData = [
  { name: "Jan", Annual: 2, Sick: 1 },
  { name: "Feb", Annual: 0, Sick: 0 },
  { name: "Mar", Annual: 1, Personal: 1 },
  { name: "Apr", Annual: 2, Sick: 1 },
  { name: "May", Annual: 0, Sick: 1 },
  { name: "Jun", Annual: 1, Personal: 1 },
  { name: "Jul", Annual: 2, Sick: 0 },
];

const upcomingHolidays = [
  { name: "Independence Day", date: "2025-08-15" },
  { name: "Ganesh Chaturthi", date: "2025-08-29" },
  { name: "Diwali", date: "2025-10-21" },
];

// --- HELPER & SHARED COMPONENTS ---

const StatCard = ({ icon, title, value, bgColor }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center space-x-4">
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center ${bgColor}`}
    >
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs font-medium rounded-full inline-block";
  const statusClasses = {
    Approved: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Rejected: "bg-red-100 text-red-800",
  };
  return (
    <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>
  );
};

const PageHeader = ({ title, subtitle }) => (
  <header className="mb-8">
    <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
    <p className="text-gray-500 mt-1">{subtitle}</p>
  </header>
);

// --- PAGE COMPONENTS ---

const Dashboard = () => {
  const totalLeavesUsed =
    leaveStats.annual.used + leaveStats.sick.used + leaveStats.personal.used;
  const totalLeavesAvailable =
    leaveStats.annual.total + leaveStats.sick.total + leaveStats.personal.total;
  const recentLeaves = allLeaves.slice(0, 5);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <PageHeader
        title={`Welcome back, ${user.name.split(" ")[0]}!`}
        subtitle="Here's your leave summary for today."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Calendar size={24} className="text-indigo-600" />}
          title="Annual Leave"
          value={`${leaveStats.annual.used} / ${leaveStats.annual.total} Days`}
          bgColor="bg-indigo-100"
        />
        <StatCard
          icon={<Briefcase size={24} className="text-teal-600" />}
          title="Sick Leave"
          value={`${leaveStats.sick.used} / ${leaveStats.sick.total} Days`}
          bgColor="bg-teal-100"
        />
        <StatCard
          icon={<User size={24} className="text-amber-600" />}
          title="Personal Leave"
          value={`${leaveStats.personal.used} / ${leaveStats.personal.total} Days`}
          bgColor="bg-amber-100"
        />
        <StatCard
          icon={<LogOut size={24} className="text-rose-600" />}
          title="Total Used"
          value={`${totalLeavesUsed} / ${totalLeavesAvailable} Days`}
          bgColor="bg-rose-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Leave Trends - 2025
          </h2>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart
                data={leaveChartData}
                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                />
                <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(5px)",
                    border: "1px solid #E5E7EB",
                    borderRadius: "0.75rem",
                  }}
                />
                <Legend iconType="circle" iconSize={10} />
                <Bar
                  dataKey="Annual"
                  stackId="a"
                  fill="#4F46E5"
                  name="Annual Leave"
                />
                <Bar
                  dataKey="Sick"
                  stackId="a"
                  fill="#14B8A6"
                  name="Sick Leave"
                />
                <Bar
                  dataKey="Personal"
                  stackId="a"
                  fill="#F59E0B"
                  name="Personal Leave"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Upcoming Holidays
          </h2>
          <ul className="space-y-4">
            {upcomingHolidays.map((holiday) => (
              <li key={holiday.name} className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Calendar className="text-gray-500" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-gray-700">{holiday.name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(holiday.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 bg-white p-4 sm:p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Leave Requests
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="p-3 text-sm font-semibold text-gray-500">
                  Leave Type
                </th>
                <th className="p-3 text-sm font-semibold text-gray-500 hidden sm:table-cell">
                  Start Date
                </th>
                <th className="p-3 text-sm font-semibold text-gray-500 hidden md:table-cell">
                  End Date
                </th>
                <th className="p-3 text-sm font-semibold text-gray-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {recentLeaves.map((leave) => (
                <tr
                  key={leave.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-3 font-medium text-gray-800">
                    {leave.type}
                  </td>
                  <td className="p-3 text-gray-600 hidden sm:table-cell">
                    {leave.from}
                  </td>
                  <td className="p-3 text-gray-600 hidden md:table-cell">
                    {leave.to}
                  </td>
                  <td className="p-3">
                    <StatusBadge status={leave.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const RequestLeave = () => {
  // A simple date formatter for default values
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Request a Leave"
        subtitle="Fill out the form below to submit your leave request."
      />
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
        <form>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="leaveType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Leave Type
              </label>
              <select
                id="leaveType"
                name="leaveType"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option>Annual Leave</option>
                <option>Sick Leave</option>
                <option>Personal Leave</option>
                <option>Unpaid Leave</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  defaultValue={today}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  defaultValue={today}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Reason
              </label>
              <textarea
                id="reason"
                name="reason"
                rows="4"
                placeholder="Please provide a reason for your leave..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center space-x-2 px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Send size={16} />
                <span>Submit Request</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const MyLeaves = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="My Leave History"
        subtitle="Here is a complete list of your past leave requests."
      />
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="p-3 text-sm font-semibold text-gray-500">
                  Leave Type
                </th>
                <th className="p-3 text-sm font-semibold text-gray-500 hidden sm:table-cell">
                  Dates
                </th>
                <th className="p-3 text-sm font-semibold text-gray-500 hidden lg:table-cell">
                  Reason
                </th>
                <th className="p-3 text-sm font-semibold text-gray-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {allLeaves.map((leave) => (
                <tr
                  key={leave.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-3 font-medium text-gray-800">
                    {leave.type}
                  </td>
                  <td className="p-3 text-gray-600 hidden sm:table-cell">{`${leave.from} to ${leave.to}`}</td>
                  <td className="p-3 text-gray-600 hidden lg:table-cell text-sm">
                    {leave.reason}
                  </td>
                  <td className="p-3">
                    <StatusBadge status={leave.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- APP LAYOUT & NAVIGATION ---
export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "request":
        return <RequestLeave />;
      case "myLeaves":
        return <MyLeaves />;
      default:
        return <Dashboard />;
    }
  };

  const NavLink = ({ icon, children, page, activePage, setActivePage }) => (
    <button
      onClick={() => {
        setActivePage(page);
        setIsSidebarOpen(false);
      }}
      className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
        activePage === page
          ? "bg-indigo-600 text-white"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span className="font-medium">{children}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside
        className={`fixed inset-y-0 left-0 bg-white w-64 p-6 transform transition-transform duration-300 ease-in-out z-30 shadow-lg ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 lg:shadow-none`}
      >
        <div className="flex items-center space-x-3 mb-10">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <Briefcase className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">LeaveFlow</h1>
        </div>

        <nav className="space-y-2">
          <NavLink
            icon={<Home size={20} />}
            page="dashboard"
            activePage={activePage}
            setActivePage={setActivePage}
          >
            Dashboard
          </NavLink>
          <NavLink
            icon={<Plus size={20} />}
            page="request"
            activePage={activePage}
            setActivePage={setActivePage}
          >
            Request Leave
          </NavLink>
          <NavLink
            icon={<FileText size={20} />}
            page="myLeaves"
            activePage={activePage}
            setActivePage={setActivePage}
          >
            My Leaves
          </NavLink>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors text-gray-600 hover:bg-gray-100">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white/70 backdrop-blur-lg sticky top-0 z-20 border-b border-gray-200">
          <div className="flex items-center justify-between p-4 h-16">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="hidden sm:flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg w-full max-w-xs">
              <Search size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent focus:outline-none w-full text-sm"
              />
            </div>
            <div className="flex items-center space-x-6">
              <button className="relative text-gray-600 hover:text-gray-900">
                <Bell size={22} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="hidden md:block">
                  <p className="font-semibold text-sm text-gray-800">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">Employee</p>
                </div>
                <ChevronDown
                  size={16}
                  className="text-gray-400 hidden md:block"
                />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">{renderContent()}</main>
      </div>

      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
        ></div>
      )}
    </div>
  );
}
