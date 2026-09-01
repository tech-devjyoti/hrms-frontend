import { STATUS_CONFIG } from "../constants/statusConstants";

export const getEmployeeInitials = (firstName, lastName) => {
  const first = firstName?.charAt(0) || "";

  const last = lastName?.charAt(0) || "";

  return `${first}${last}`.toUpperCase() || "U";
};

export const getStatusConfig = (type, status) => {
  return (
    STATUS_CONFIG[type]?.[status] || {
      label: "Unknown",
      color: "bg-slate-100 text-slate-600",
    }
  );
};

export const canModifyEmployee = (currentUserRole, targetUserRole) => {
  // ADMIN can modify everyone.
  if (currentUserRole === "ADMIN") {
    return true;
  }

  // Non-ADMIN cannot modify ADMIN.
  if (targetUserRole === "ADMIN") {
    return false;
  }

  return true;
};
