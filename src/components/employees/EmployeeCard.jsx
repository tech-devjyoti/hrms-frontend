import { FiChevronRight, FiMail, FiPhone } from "react-icons/fi";

import Badge from "../common/Badge";

import {
  getEmployeeInitials,
  getStatusConfig,
} from "../../utils/employeeUtils";
import Avatar from "../common/Avatar";

const EmployeeCard = ({ employee, onView }) => {
  const {
    _id,
    firstName,
    lastName,
    employeeCode,
    email,
    phone,
    employment,
    user,
  } = employee;

  const employmentStatus = employment?.status || "UNKNOWN";

  const accountStatus = user?.accountStatus || "UNKNOWN";

  const employmentStatusConfig = getStatusConfig(
    "EMPLOYMENT",
    employmentStatus,
  );

  const accountStatusConfig = getStatusConfig("ACCOUNT", accountStatus);

  return (
    <button
      type="button"
      onClick={() => onView(employee)}
      className="
        w-full
        rounded-xl
        border border-slate-200
        bg-white
        p-4
        text-left
        shadow-sm
        transition
        hover:border-blue-200
        hover:shadow-md
        focus:outline-none
        focus:ring-2
        focus:ring-blue-100
      "
    >
      {/* Employee Header */}

      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {/* Avatar */}

          <Avatar
            src={employee?.profilePicture?.url}
            name={`${firstName || ""} ${lastName || ""}`.trim()}
            size="md"
          />

          {/* Employee Name */}

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              {getEmployeeInitials(firstName, lastName) || "Unnamed Employee"}
            </p>

            <p className="mt-0.5 text-xs text-slate-500">
              {employeeCode || "-"}
            </p>
          </div>
        </div>

        <FiChevronRight size={18} className="mt-1 shrink-0 text-slate-400" />
      </div>

      {/* Contact Information */}

      {(email || phone) && (
        <div className="mt-4 space-y-2.5">
          {email && (
            <div className="flex min-w-0 items-center gap-2 text-xs text-slate-600">
              <FiMail size={14} className="shrink-0 text-slate-400" />

              <span className="truncate">{email}</span>
            </div>
          )}

          {phone && (
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <FiPhone size={14} className="shrink-0 text-slate-400" />

              <span>{phone}</span>
            </div>
          )}
        </div>
      )}

      {/* Employment Information */}

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
        {/* Department */}

        {employment?.department && (
          <Badge className="bg-slate-100 text-slate-600">
            {employment.department}
          </Badge>
        )}

        {/* Designation */}

        {employment?.designation && (
          <Badge className="bg-blue-50 text-blue-700">
            {employment.designation}
          </Badge>
        )}

        {/* Employment Status */}

        <Badge className={employmentStatusConfig.color}>
          {employmentStatusConfig.label}
        </Badge>

        {/* Account Status */}

        <Badge className={accountStatusConfig.color}>
          {accountStatusConfig.label}
        </Badge>
      </div>
    </button>
  );
};

export default EmployeeCard;
