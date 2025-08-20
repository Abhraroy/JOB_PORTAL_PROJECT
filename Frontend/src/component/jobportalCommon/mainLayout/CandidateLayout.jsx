// layouts/MainLayout.js
import { Outlet, Link } from "react-router-dom";
import CandidateSidebar from "../Sidebar/CandidateSidebar";

const CandidateLayout = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[256px_1fr] w-screen h-screen overflow-x-hidden">
        <CandidateSidebar className="h-[100vh] overflow-y-hidden" />
        <div className="h-[100%] bg-gray-50 w-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default CandidateLayout