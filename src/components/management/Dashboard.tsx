import Header from "../Header";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="bg-slate-200 flex flex-row gap-0">
        <Sidebar />
      </div>
    </>
  );
};

export default Dashboard;
