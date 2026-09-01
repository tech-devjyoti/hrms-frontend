import { FiMoreVertical } from "react-icons/fi";

import Table from "../../components/common/Table";
import Badge from "../common/Badge";

import { getStatusConfig } from "../../utils/employeeUtils";
import Avatar from "../common/Avatar";
import { useSelector } from "react-redux";



const EmployeeTable = ({ employees, onView }) => {
  const columns = [
    {
      key: "serialNumber",
      header: "S.No",
      align: "center",

      render: (employee, index) => (
        <span className="text-sm font-medium text-slate-500">{index + 1}</span>
      ),
    },
    {
      key: "employee",
      header: "Employee",

      render: (employee) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={employee?.profilePicture?.url}
            name={`${employee?.firstName || ""} ${employee?.lastName || ""}`}
            size="sm"
          />

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-900">
              {employee.firstName} {employee.lastName}
            </p>

            <p className="max-w-52 truncate text-xs text-slate-500">
              {employee.email}
            </p>
          </div>
        </div>
      ),
    },

    {
      key: "employeeCode",
      header: "Employee ID",

      render: (employee) => (
        <span className="text-sm font-medium text-slate-700">
          {employee.employeeCode || "-"}
        </span>
      ),
    },

    {
      key: "department",
      header: "Department",

      render: (employee) => employee.employment?.department || "-",
    },

    {
      key: "designation",
      header: "Designation",

      render: (employee) => employee.employment?.designation || "-",
    },

    {
      key: "role",
      header: "Role",

      render: (employee) => (
        <span className="text-sm font-medium text-slate-700">
          {employee.user?.role || "-"}
        </span>
      ),
    },

    {
      key: "accountStatus",
      header: "Account Status",
      render: (employee) => {
        const accountStatus = employee.user?.accountStatus || "UNKNOWN";

        const statusConfig = getStatusConfig("ACCOUNT", accountStatus);

        return (
          <Badge className={statusConfig.color}>{statusConfig.label}</Badge>
        );
      },
    },

    {
      key: "actions",
      header: "Action",
      align: "right",

      render: (employee) => (
        <div className="flex justify-end gap-1">
          <button
            type="button"
            onClick={(event) => event.stopPropagation()}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            title="More actions"
          >
            <FiMoreVertical size={17} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={employees}
      rowKey="_id"
      onRowClick={onView}
      getRowClassName={(employee) => {
        if (employee.employment?.status === "INACTIVE") {
          return "bg-slate-100 hover:bg-slate-200";
        }

        return "hover:bg-slate-50";
      }}
    />
  );
};

export default EmployeeTable;
