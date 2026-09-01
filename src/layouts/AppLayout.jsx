import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/navigation/Sidebar";
import AppHeader from "../components/navigation/AppHeader";

import { logoutUser } from "../services/authService";
import { logoutSuccess } from "../redux/store/authSlice";
import { toast } from "sonner";

const AppLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleMobileNavigate = () => {
    setMobileSidebarOpen(false);
  };

   const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();

      dispatch(logoutSuccess());

      toast.success("Logged out successfully.");

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error("Logout failed:", error);

      /*
       * Clear Redux even if the API request fails.
       * The user should not remain inside the application
       * with stale authentication state.
       */
      dispatch(logoutSuccess());

      navigate("/login", {
        replace: true,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop / Tablet Sidebar */}

      <div
        className={`fixed inset-y-0 left-0 z-40 hidden transition-all duration-200 lg:block ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((previous) => !previous)}
          onLogout={handleLogout}
        />
      </div>

      {/* Mobile Sidebar */}

      {mobileSidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden">
            <Sidebar
              collapsed={false}
              onToggle={() => setMobileSidebarOpen(false)}
              onNavigate={handleMobileNavigate}
            />
          </div>
        </>
      )}

      {/* Main Application Area */}

      <div
        className={`min-h-screen transition-all duration-200 ${
          sidebarCollapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        <AppHeader onMenuClick={() => setMobileSidebarOpen(true)} />

        <main className="min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
