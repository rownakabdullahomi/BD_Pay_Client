import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";

const MainLayout = () => {
  return (
    <div>
      <nav className="w-full fixed backdrop-blur-md backdrop-saturate-150 bg-white/30 text-white shadow-md top-0 z-50">
        <Navbar />
      </nav>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};

export default MainLayout;
