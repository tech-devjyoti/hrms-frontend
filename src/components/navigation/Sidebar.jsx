import {
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiDollarSign,
  FiFileText,
  FiGrid,
  FiLogOut,
  FiSettings,
  FiUsers,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "../common/Avatar";

const Sidebar = ({ collapsed = false, onToggle, onLogout, onNavigate }) => {
  const user = useSelector((state) => state.auth.user);

  const navigationItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: FiGrid,
    },
    {
      label: "Employees",
      path: "/employees",
      icon: FiUsers,
      roles: ["ADMIN", "HR", "MANAGER"],
    },
    {
      label: "Attendance",
      path: "/attendance",
      icon: FiClock,
      roles: ["ADMIN", "HR", "MANAGER", "EMPLOYEE"],
    },
    {
      label: "Leave",
      path: "/leave",
      icon: FiCalendar,
      roles: ["ADMIN", "HR", "MANAGER", "EMPLOYEE"],
    },
    {
      label: "Payroll",
      path: "/payroll",
      icon: FiDollarSign,
      roles: ["ADMIN", "HR"],
    },
    {
      label: "Documents",
      path: "/documents",
      icon: FiFileText,
      roles: ["ADMIN", "HR", "EMPLOYEE"],
    },
    {
      label: "Settings",
      path: "/settings",
      icon: FiSettings,
      roles: ["ADMIN"],
    },
  ];

  const visibleItems = navigationItems.filter(
    (item) => !item.roles || item.roles.includes(user?.role),
  );

  const handleNavigation = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <aside
      className={`flex h-full w-full flex-col border-r border-slate-200 bg-white ${
        collapsed ? "lg:w-20" : "lg:w-64"
      }`}
    >
      {/* Header */}

      <div
        className={`flex h-16 shrink-0 items-center border-b border-slate-200 ${
          collapsed ? "justify-center px-3" : "justify-between px-4"
        }`}
      >
        {!collapsed && (
          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold text-slate-900">HRMS</h1>

            <p className="truncate text-xs text-slate-500">Workspace</p>
          </div>
        )}

        {collapsed && (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            H
          </div>
        )}

        {onToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <FiChevronRight size={18} />
            ) : (
              <FiChevronLeft size={18} />
            )}
          </button>
        )}
      </div>

      {/* Navigation */}

      <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3">
        <div className="space-y-1">
          {visibleItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleNavigation}
                title={collapsed ? item.label : undefined}
                className={({ isActive }) =>
                  `flex min-h-11 items-center rounded-lg text-sm font-medium transition ${
                    collapsed ? "justify-center px-2" : "gap-3 px-3"
                  } ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <Icon size={19} className="shrink-0" />

                {!collapsed && <span className="truncate">{item.label}</span>}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* User Section */}

      <div className="shrink-0 border-t border-slate-200 p-3">
        {user && (
          <NavLink
            to="/profile"
            onClick={handleNavigation}
            title={collapsed ? "My Profile" : undefined}
            className={`mb-2 flex items-center rounded-lg bg-slate-50 transition hover:bg-slate-100 ${
              collapsed ? "justify-center p-2" : "gap-3 p-3"
            }`}
          >
            <Avatar
              src={user?.employee?.profilePicture?.url}
              name={`${user?.employee?.firstName || ""} ${
                user?.employee?.lastName || ""
              }`}
              size={collapsed ? "sm" : "md"}
            />

            {!collapsed && (
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {user?.employee?.firstName} {user?.employee?.lastName}
                </p>

                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {user?.role}
                </p>
              </div>
            )}
          </NavLink>
        )}

        <button
          type="button"
          onClick={() => {
            console.log("LOGOUT BUTTON CLICKED");
            onLogout?.();
          }}
          title={collapsed ? "Logout" : undefined}
          className={`flex min-h-11 w-full items-center rounded-lg text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600 ${
            collapsed ? "justify-center px-2" : "gap-3 px-3"
          }`}
        >
          <FiLogOut size={19} className="shrink-0" />

          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
