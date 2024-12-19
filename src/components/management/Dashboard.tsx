import { useState } from "react";
import Sidebar from "./Sidebar";
import Users from "./Users";

const Dashboard = () => {
  const [showUsers, setShowUsers] = useState(false);
  return (
    <div className="bg-slate-200 flex flex-row gap-0">
      <Sidebar showUsers={showUsers} setShowUsers={setShowUsers} />
      {showUsers && <Users />}
    </div>
  );
};

export default Dashboard;
