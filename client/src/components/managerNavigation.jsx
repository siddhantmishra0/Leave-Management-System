import React from "react";
import { Link } from "react-router-dom";
const managerNavigation = () => {
  return (
    <div>
      <nav>
        <Link to="/dashboard">Dashboard</Link>;
      </nav>
    </div>
  );
};

export default managerNavigation;
