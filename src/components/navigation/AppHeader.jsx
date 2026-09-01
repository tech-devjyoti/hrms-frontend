import { FiBell, FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import Avatar from "../common/Avatar";

const AppHeader = ({ onMenuClick }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      {/* Left */}

      <div className="flex min-w-0 items-center gap-3">
        {/* Mobile menu */}

        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden"
          aria-label="Open navigation"
        >
          <FiMenu size={21} />
        </button>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900 sm:text-base">
            Welcome back
          </p>

          <p className="hidden truncate text-xs text-slate-500 sm:block">
            Manage your HRMS workspace
          </p>
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notifications */}

        <button
          type="button"
          className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label="Notifications"
        >
          <FiBell size={19} />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-600" />
        </button>

        {/* User */}

        <div className="hidden items-center gap-3 border-l border-slate-200 pl-3 sm:flex">
          <Avatar
            src={user?.employee?.profilePicture?.url}
            name={`${user?.employee?.firstName || ""} ${
              user?.employee?.lastName || ""
            }`}
            size="md"
          />
        </div>
      </div>
    </header>
  );
};

const getInitials = (user) => {
  if (!user) {
    return "U";
  }

  const name = user.firstName || user.lastName;

  if (name) {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  return user.email ? user.email[0].toUpperCase() : "U";
};

export default AppHeader;
