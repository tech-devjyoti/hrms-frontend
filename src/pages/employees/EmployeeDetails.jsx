import { useEffect, useState } from "react";

import {
  FiArrowLeft,
  FiBriefcase,
  FiCalendar,
  FiChevronDown,
  FiEdit,
  FiMail,
  FiMapPin,
  FiPhone,
  FiUser,
} from "react-icons/fi";

import { useNavigate, useParams } from "react-router-dom";

import { toast } from "sonner";

import EmployeeInfoSection from "../../components/employees/EmployeeInfoSection";
import InfoItem from "../../components/employees/EmployeeInfoCard";

import ConfirmationModal from "../../components/common/ConfirmationModal";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

import {
  getEmployeeById,
  reactivateEmployee,
  suspendEmployee,
  deactivateEmployee,
} from "../../services/employeeService";

import {
  getEmployeeInitials,
  getStatusConfig,
} from "../../utils/employeeUtils";
import Avatar from "../../components/common/Avatar";

const EmployeeDetails = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);

  const [confirmation, setConfirmation] = useState({
    isOpen: false,
    action: null,
  });

  const [isActionLoading, setIsActionLoading] = useState(false);

  const fetchEmployee = async () => {
    setIsLoading(true);

    try {
      const response = await getEmployeeById(employeeId);

      setEmployee(response.data?.employee || null); 
    } catch (error) {
      console.error("Failed to fetch employee:", error);

      toast.error(error.response?.data?.message || "Unable to load employee.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [employeeId]);

  const openConfirmation = (action) => {
    setIsActionMenuOpen(false);

    setConfirmation({
      isOpen: true,
      action,
    });
  };

  const closeConfirmation = () => {
    if (isActionLoading) {
      return;
    }

    setConfirmation({
      isOpen: false,
      action: null,
    });
  };

  const handleAccountAction = async () => {
    const action = confirmation.action;

    if (!action) {
      return;
    }

    setIsActionLoading(true);

    try {
      let response;

      if (action === "SUSPEND") {
        response = await suspendEmployee(employeeId);
      }

      if (action === "REACTIVATE") {
        response = await reactivateEmployee(employeeId);
      }

      if (action === "DEACTIVATE") {
        response = await deactivateEmployee(employeeId);
      }

      toast.success(
        response?.message || "Account status updated successfully.",
      );

      setConfirmation({
        isOpen: false,
        action: null,
      });

      await fetchEmployee();
    } catch (error) {
      console.error("Account action failed:", error);

      toast.error(
        error.response?.data?.message || "Unable to update account status.",
      );
    } finally {
      setIsActionLoading(false);
    }
  };

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (!employee) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md text-center">
          <h1 className="text-xl font-semibold text-slate-900">
            Employee not found
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            The employee may have been removed or you may not have access to
            this employee.
          </p>

          <Button
            type="button"
            onClick={() => navigate("/employees")}
            className="mt-5 w-full sm:w-auto"
          >
            Back to Employees
          </Button>
        </div>
      </div>
    );
  }

  const {
    firstName,
    lastName,
    employeeCode,
    email,
    phone,
    employment,
    address,
    user,
  } = employee;

  const accountStatus = user?.accountStatus || "UNKNOWN";

  const employmentStatus = employment?.status || "UNKNOWN";

  const employeeName = `${firstName || ""} ${lastName || ""}`.trim();

  const employeeInitials = getEmployeeInitials(firstName, lastName);

  const employmentStatusConfig = getStatusConfig(
    "EMPLOYMENT",
    employmentStatus,
  );

  const accountStatusConfig = getStatusConfig("ACCOUNT", accountStatus);

  const isActive = accountStatus === "ACTIVE";

  const isSuspended = accountStatus === "SUSPENDED";

  const isEmploymentInactive = employmentStatus === "INACTIVE";

  const isDeactivated = accountStatus === "DEACTIVATED";

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Back */}

        <button
          type="button"
          onClick={() => navigate("/employees")}
          className="
            mb-5
            inline-flex
            min-h-10
            items-center
            gap-2
            rounded-lg
            text-sm
            font-medium
            text-slate-600
            transition
            hover:text-blue-600
            focus:outline-none
            focus:ring-2
            focus:ring-blue-100
          "
        >
          <FiArrowLeft size={16} />
          Back to Employees
        </button>

        {/* Employee Header */}

        <section
          className="
            mb-6
            rounded-xl
            border
            border-slate-200
            bg-white
            p-4
            shadow-sm
            sm:p-6
          "
        >
          <div className="flex flex-col gap-5">
            {/* Employee Identity */}

            <div className="flex min-w-0 items-start gap-4">
              <Avatar
                src={employee?.profilePicture?.url}
                name={employeeName}
                size="xl"
              />

              <div className="min-w-0 flex-1">
                <h1
                  className="
                    break-words
                    text-xl
                    font-bold
                    tracking-tight
                    text-slate-900
                    sm:text-2xl
                  "
                >
                  {employeeName || "Unnamed Employee"}
                </h1>

                <div
                  className="
                    mt-1
                    flex
                    flex-wrap
                    items-center
                    gap-x-3
                    gap-y-1
                    text-sm
                    text-slate-500
                  "
                >
                  <span>{employeeCode || "-"}</span>

                  <span className="hidden sm:inline">•</span>

                  <span className="break-words">
                    {employment?.designation || "-"}
                  </span>
                </div>
              </div>
            </div>

            {/* Status + Actions */}

            <div
              className="
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              {/* Statuses */}

              <div className="flex flex-wrap items-center gap-2">
                <Badge className={employmentStatusConfig.color}>
                  {employmentStatusConfig.label}
                </Badge>

                <Badge className={accountStatusConfig.color}>
                  {accountStatusConfig.label}
                </Badge>

                {user?.mustChangePassword && (
                  <Badge className="bg-amber-50 text-amber-700">
                    Password change required
                  </Badge>
                )}
              </div>

              {/* Actions */}

              <div
                className="
                  flex
                  w-full
                  flex-col
                  gap-2
                  sm:w-auto
                  sm:flex-row
                "
              >
                {/* Edit */}

                <Button
                  type="button"
                  onClick={() => navigate(`/employees/${employeeId}/edit`)}
                  icon={<FiEdit size={16} />}
                  iconPosition="left"
                  className="w-full sm:w-auto"
                  disabled={isEmploymentInactive || isDeactivated}
                >
                  Edit Employee
                </Button>

                {/* Actions Menu */}

                <div className="relative w-full sm:w-auto">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setIsActionMenuOpen((previous) => !previous)}
                    icon={<FiChevronDown size={16} />}
                    iconPosition="right"
                    className="w-full sm:w-auto"
                    disabled={isEmploymentInactive || isDeactivated}
                  >
                    Actions
                  </Button>

                  {isActionMenuOpen && (
                    <div
                      className="
                        absolute
                        left-0
                        z-30
                        mt-2
                        w-full
                        overflow-hidden
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        py-1
                        shadow-lg
                        sm:left-auto
                        sm:right-0
                        sm:w-56
                      "
                    >
                      {isActive && (
                        <>
                          <button
                            type="button"
                            onClick={() => openConfirmation("SUSPEND")}
                            className="
                              min-h-11
                              w-full
                              px-4
                              py-2.5
                              text-left
                              text-sm
                              text-slate-700
                              transition
                              hover:bg-slate-50
                            "
                          >
                            Suspend Account
                          </button>

                          <button
                            type="button"
                            onClick={() => openConfirmation("DEACTIVATE")}
                            className="
                              min-h-11
                              w-full
                              px-4
                              py-2.5
                              text-left
                              text-sm
                              text-red-600
                              transition
                              hover:bg-red-50
                            "
                          >
                            Deactivate Account
                          </button>
                        </>
                      )}

                      {isSuspended && (
                        <>
                          <button
                            type="button"
                            onClick={() => openConfirmation("REACTIVATE")}
                            className="
                              min-h-11
                              w-full
                              px-4
                              py-2.5
                              text-left
                              text-sm
                              text-emerald-600
                              transition
                              hover:bg-emerald-50
                            "
                          >
                            Reactivate Account
                          </button>

                          <button
                            type="button"
                            onClick={() => openConfirmation("DEACTIVATE")}
                            className="
                              min-h-11
                              w-full
                              px-4
                              py-2.5
                              text-left
                              text-sm
                              text-red-600
                              transition
                              hover:bg-red-50
                            "
                          >
                            Deactivate Account
                          </button>
                        </>
                      )}

                      {isDeactivated && (
                        <button
                          type="button"
                          onClick={() => openConfirmation("REACTIVATE")}
                          className="
                            min-h-11
                            w-full
                            px-4
                            py-2.5
                            text-left
                            text-sm
                            text-emerald-600
                            transition
                            hover:bg-emerald-50
                          "
                        >
                          Reactivate Account
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-5">
          {/* Personal Information */}

          <EmployeeInfoSection
            title="Personal Information"
            description="Basic employee information."
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <InfoItem
                icon={<FiUser size={17} />}
                label="First Name"
                value={firstName}
              />

              <InfoItem
                icon={<FiUser size={17} />}
                label="Last Name"
                value={lastName}
              />

              <InfoItem
                icon={<FiMail size={17} />}
                label="Email"
                value={email}
              />

              <InfoItem
                icon={<FiPhone size={17} />}
                label="Phone"
                value={phone}
              />
            </div>
          </EmployeeInfoSection>

          {/* Employment Information */}

          <EmployeeInfoSection
            title="Employment Information"
            description="Employee's current employment details."
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <InfoItem
                icon={<FiBriefcase size={17} />}
                label="Employee ID"
                value={employeeCode}
              />

              <InfoItem
                icon={<FiBriefcase size={17} />}
                label="Department"
                value={employment?.department}
              />

              <InfoItem
                icon={<FiBriefcase size={17} />}
                label="Designation"
                value={employment?.designation}
              />

              <InfoItem
                icon={<FiCalendar size={17} />}
                label="Date of Joining"
                value={formatDate(employment?.dateOfJoining)}
              />

              <InfoItem
                icon={<FiBriefcase size={17} />}
                label="Employment Type"
                value={formatEmploymentType(employment?.employmentType)}
              />

              <InfoItem
                icon={<FiBriefcase size={17} />}
                label="Employment Status"
                value={employmentStatusConfig.label}
              />
            </div>
          </EmployeeInfoSection>

          {/* Account Information */}

          <EmployeeInfoSection
            title="Account Information"
            description="Authentication and account status."
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <InfoItem
                icon={<FiUser size={17} />}
                label="Role"
                value={user?.role}
              />

              <InfoItem
                icon={<FiMail size={17} />}
                label="Account Email"
                value={user?.email}
              />

              <InfoItem
                icon={<FiUser size={17} />}
                label="Account Status"
                value={accountStatusConfig.label}
              />

              {user?.mustChangePassword ? (
                <div className="sm:col-span-2 lg:col-span-3">
                  <div
                    className="
                      flex
                      items-start
                      gap-3
                      rounded-xl
                      border
                      border-amber-300
                      bg-amber-50
                      p-4
                    "
                  >
                    <div
                      className="
                        mt-0.5
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-amber-100
                        text-amber-700
                      "
                    >
                      <FiUser size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-amber-900">
                        Password change required
                      </p>

                      <p className="mt-1 break-words text-sm leading-6 text-amber-800">
                        This employee is still using the temporary password.
                        They must change their password after their first login.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <InfoItem
                  icon={<FiUser size={17} />}
                  label="Password Status"
                  value="Password set"
                />
              )}
            </div>
          </EmployeeInfoSection>

          {/* Address */}

          <EmployeeInfoSection
            title="Address"
            description="Employee's registered address."
          >
            {address && Object.keys(address).length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <InfoItem
                    icon={<FiMapPin size={17} />}
                    label="Address Line 1"
                    value={address.addressLine1}
                  />
                </div>

                {address.addressLine2 && (
                  <div className="sm:col-span-2">
                    <InfoItem
                      icon={<FiMapPin size={17} />}
                      label="Address Line 2"
                      value={address.addressLine2}
                    />
                  </div>
                )}

                <InfoItem
                  icon={<FiMapPin size={17} />}
                  label="Country"
                  value={address.country}
                />

                <InfoItem
                  icon={<FiMapPin size={17} />}
                  label="State"
                  value={address.state}
                />

                <InfoItem
                  icon={<FiMapPin size={17} />}
                  label="City"
                  value={address.city}
                />

                <InfoItem
                  icon={<FiMapPin size={17} />}
                  label="Pincode"
                  value={address.pincode}
                />
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                No address information available.
              </p>
            )}
          </EmployeeInfoSection>
        </div>
      </div>

      {/* Confirmation Modal */}

      <ConfirmationModal
        isOpen={confirmation.isOpen}
        title={getConfirmationTitle(confirmation.action)}
        message={getConfirmationMessage(confirmation.action)}
        confirmText={getConfirmationConfirmText(confirmation.action)}
        cancelText="Cancel"
        onConfirm={handleAccountAction}
        onCancel={closeConfirmation}
        isLoading={isActionLoading}
        danger={
          confirmation.action === "SUSPEND" ||
          confirmation.action === "DEACTIVATE"
        }
      />
    </div>
  );
};

const formatDate = (date) => {
  if (!date) {
    return "-";
  }

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatEmploymentType = (type) => {
  if (!type) {
    return "-";
  }

  return type
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());
};

const getConfirmationTitle = (action) => {
  if (action === "SUSPEND") {
    return "Suspend Employee Account";
  }

  if (action === "DEACTIVATE") {
    return "Deactivate Employee Account";
  }

  return "Reactivate Employee Account";
};

const getConfirmationMessage = (action) => {
  if (action === "SUSPEND") {
    return "This will prevent the employee from accessing the application until the account is reactivated. The employee record will remain in the organization.";
  }

  if (action === "DEACTIVATE") {
    return "This will deactivate the employee account. The employee will no longer be able to log in.";
  }

  return "This will restore the employee's ability to access the application.";
};

const getConfirmationConfirmText = (action) => {
  if (action === "SUSPEND") {
    return "Suspend Account";
  }

  if (action === "DEACTIVATE") {
    return "Deactivate Account";
  }

  return "Reactivate Account";
};

export default EmployeeDetails;
