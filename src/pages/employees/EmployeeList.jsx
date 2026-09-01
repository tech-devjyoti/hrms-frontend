import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
  FiSearch,
} from "react-icons/fi";
import { toast } from "sonner";

import EmployeeTable from "../../components/employees/EmployeeTable";
import EmployeeCard from "../../components/employees/EmployeeCard";

import { getEmployees } from "../../services/employeeService";
import { canModifyEmployee } from "../../utils/employeeUtils";

import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import { useSelector } from "react-redux";

const EmployeeList = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalEmployees: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [department, setDepartment] = useState("");
  const [employmentType, setEmploymentType] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const role = useSelector((state) => state.auth.user?.role);

  const hasActiveFilters = Boolean(
    search || status || department || employmentType,
  );

  const fetchEmployees = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await getEmployees({
        page: pagination.page,
        limit: pagination.limit,
        search: search.trim() || undefined,
        status: status || undefined,
        department: department.trim() || undefined,
        employmentType: employmentType || undefined,
      });

      setEmployees(response.data?.employees || []);

      setPagination((previous) => ({
        ...previous,
        ...(response.data?.pagination || {}),
      }));
    } catch (error) {
      console.error("Failed to fetch employees:", error);

      toast.error(error.response?.data?.message || "Unable to load employees.");
    } finally {
      setIsLoading(false);
    }
  }, [
    pagination.page,
    pagination.limit,
    search,
    status,
    department,
    employmentType,
  ]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);

    setPagination((previous) => ({
      ...previous,
      page: 1,
    }));
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);

    setPagination((previous) => ({
      ...previous,
      page: 1,
    }));
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);

    setPagination((previous) => ({
      ...previous,
      page: 1,
    }));
  };

  const handleEmploymentTypeChange = (event) => {
    setEmploymentType(event.target.value);

    setPagination((previous) => ({
      ...previous,
      page: 1,
    }));
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatus("");
    setDepartment("");
    setEmploymentType("");

    setPagination((previous) => ({
      ...previous,
      page: 1,
    }));
  };

  const handlePreviousPage = () => {
    if (!pagination.hasPreviousPage) {
      return;
    }

    setPagination((previous) => ({
      ...previous,
      page: previous.page - 1,
    }));
  };

  const handleNextPage = () => {
    if (!pagination.hasNextPage) {
      return;
    }

    setPagination((previous) => ({
      ...previous,
      page: previous.page + 1,
    }));
  };

  const handleViewEmployee = (employee) => {
    console.log("Target employee role:", employee?.user?.role);

    console.log("Current logged-in user role:", role);

    const canModify = canModifyEmployee(role, employee?.user?.role);

    if (!canModify) {
      toast.warning("You don't have access to ADMIN modifications.");

      return;
    }

    navigate(`/employees/${employee?._id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Employees
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your organization's employees.
            </p>
          </div>

          <Button
            type="button"
            onClick={() => navigate("/employees/create")}
            icon={<FiPlus size={17} />}
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Add Employee
          </Button>
        </div>

        {/* Filters */}

        <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end grid grid-cols-1 gap-3 lg:grid-cols-[minmax(220px,1fr)_150px_180px_180px_auto]">
            {/* Search */}

            <div className="w-full">
              <Input
                name="search"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search employees..."
                icon={<FiSearch size={17} />}
                clearable
              />
            </div>

            {/* Status */}

            <div className="w-full lg:w-40">
              <Select
                name="status"
                value={status}
                onChange={handleStatusChange}
                placeholder="All Status"
                options={[
                  {
                    value: "ACTIVE",
                    label: "Active",
                  },
                  {
                    value: "INACTIVE",
                    label: "Inactive",
                  },
                ]}
              />
            </div>

            {/* Department */}

            <div className="w-full lg:w-44">
              <Input
                name="department"
                value={department}
                onChange={handleDepartmentChange}
                placeholder="Department"
                clearable
              />
            </div>

            {/* Employment Type */}

            <div className="w-full lg:w-44">
              <Select
                name="employmentType"
                value={employmentType}
                onChange={handleEmploymentTypeChange}
                placeholder="All Employment Types"
                options={[
                  {
                    value: "FULL_TIME",
                    label: "Full Time",
                  },
                  {
                    value: "PART_TIME",
                    label: "Part Time",
                  },
                  {
                    value: "CONTRACT",
                    label: "Contract",
                  },
                  {
                    value: "INTERN",
                    label: "Intern",
                  },
                ]}
              />
            </div>

            {/* Clear Filters */}

            {hasActiveFilters && (
              <div className="w-full lg:w-auto">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleClearFilters}
                  className="w-full whitespace-nowrap lg:w-auto"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Employee Table / Cards */}

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {/* Loading */}

          {isLoading ? (
            <Loader />
          ) : employees.length === 0 ? (
            /* Empty State */

            <div className="flex min-h-80 items-center justify-center px-4">
              <div className="text-center">
                <p className="text-sm font-medium text-slate-700">
                  No employees found
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Try changing your search or filters.
                </p>

                {hasActiveFilters && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleClearFilters}
                    className="mt-4"
                  >
                    Clear All Filters
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Desktop / Large Tablet */}

              <div className="hidden lg:block">
                <EmployeeTable
                  employees={employees}
                  onView={handleViewEmployee}
                  startIndex={(pagination.page - 1) * pagination.limit}
                />
              </div>
              {/* Mobile / Small Tablet */}

              <div className="grid grid-cols-1 gap-3 p-3 sm:p-4 lg:hidden">
                {employees.map((employee) => (
                  <EmployeeCard
                    key={employee._id}
                    employee={employee}
                    onView={handleViewEmployee}
                  />
                ))}
              </div>
            </>
          )}

          {/* Pagination */}

          {!isLoading && pagination.totalEmployees > 0 && (
            <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Result Count */}

              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-medium text-slate-700">
                  {employees.length}
                </span>{" "}
                of{" "}
                <span className="font-medium text-slate-700">
                  {pagination.totalEmployees}
                </span>{" "}
                employees
              </p>

              {/* Pagination Controls */}

              <div className="flex items-center justify-between gap-2 sm:justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handlePreviousPage}
                  disabled={!pagination.hasPreviousPage}
                  icon={<FiChevronLeft size={16} />}
                  iconPosition="left"
                >
                  Previous
                </Button>

                <span className="whitespace-nowrap px-2 text-sm text-slate-600">
                  Page{" "}
                  <span className="font-medium text-slate-900">
                    {pagination.page}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-slate-900">
                    {pagination.totalPages}
                  </span>
                </span>

                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleNextPage}
                  disabled={!pagination.hasNextPage}
                  icon={<FiChevronRight size={16} />}
                  iconPosition="right"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
