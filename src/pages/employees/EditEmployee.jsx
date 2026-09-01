import { useEffect, useState } from "react";
import { FiArrowLeft, FiBriefcase, FiMapPin, FiUser } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import Input from "../../components/common/Input";
import {
  getEmployeeById,
  updateEmployee,
} from "../../services/employeeService";

import { validateUpdateEmployee } from "../../utils/employeeValidation";

const EditEmployee = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",

    dateOfJoining: "",
    employmentType: "",
    designation: "",
    department: "",

    addressLine1: "",
    addressLine2: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      setIsLoading(true);
      setLoadError(false);

      try {
        const response = await getEmployeeById(employeeId);

        const employee = response.data?.employee;

        if (!employee) {
          setLoadError(true);
          return;
        }

        const employeeData = {
          firstName: employee.firstName || "",
          lastName: employee.lastName || "",
          phone: employee.phone || "",

          dateOfJoining: formatDateForInput(employee.employment?.dateOfJoining),

          employmentType: employee.employment?.employmentType || "",

          designation: employee.employment?.designation || "",

          department: employee.employment?.department || "",

          addressLine1: employee.address?.addressLine1 || "",

          addressLine2: employee.address?.addressLine2 || "",

          country: employee.address?.country || "",

          state: employee.address?.state || "",

          city: employee.address?.city || "",

          pincode: employee.address?.pincode || "",
        };

        setFormData(employeeData);
        setOriginalData(employeeData);
      } catch (error) {
        console.error("Failed to fetch employee:", error);

        setLoadError(true);

        toast.error(
          error.response?.data?.message || "Unable to load employee.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateUpdateEmployee(formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const changedFields = getChangedFields(originalData, formData);

    if (Object.keys(changedFields).length === 0) {
      toast.info("No changes were made.");

      return;
    }

    setIsSubmitting(true);

    try {
      const response = await updateEmployee(employeeId, changedFields);

      toast.success(response.message || "Employee updated successfully.");

      navigate(`/employees/${employeeId}`);
    } catch (error) {
      console.error("Employee update failed:", error);

      const responseError = error.response?.data;

      if (responseError?.errors) {
        setErrors(responseError.errors);
      }

      toast.error(responseError?.message || "Unable to update employee.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getChangedFields = (originalData, currentData) => {
    const changedFields = {};

    const topLevelFields = [
      "firstName",
      "lastName",
      "phone",
      "dateOfJoining",
      "employmentType",
      "designation",
      "department",
    ];

    topLevelFields.forEach((field) => {
      if (currentData[field] !== originalData[field]) {
        changedFields[field] = currentData[field];
      }
    });

    const addressFields = [
      "addressLine1",
      "addressLine2",
      "country",
      "state",
      "city",
      "pincode",
    ];

    const changedAddress = {};

    addressFields.forEach((field) => {
      if (currentData[field] !== originalData[field]) {
        changedAddress[field] = currentData[field];
      }
    });

    if (Object.keys(changedAddress).length > 0) {
      changedFields.address = changedAddress;
    }

    return changedFields;
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-slate-900">
            Unable to load employee
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            The employee could not be loaded.
          </p>

          <button
            type="button"
            onClick={() => navigate("/employees")}
            className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Back to Employees
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}

        <button
          type="button"
          onClick={() => navigate(`/employees/${employeeId}`)}
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
        >
          <FiArrowLeft size={16} />
          Back to Employee
        </button>

        <div className="mb-6">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Edit Employee
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Update the employee's profile and employment information.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}

          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4 sm:px-6 text-sm font-semibold text-slate-900 sm:text-base" >
              <div className="flex items-center gap-2">
                <FiUser size={18} className="text-blue-600" />

                <h2 className="font-semibold text-slate-900">
                  Personal Information
                </h2>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Update the employee's personal information.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">
              <Input
                label="First Name"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
                required
              />

              <Input
                label="Last Name"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
                required
              />

              <Input
                label="Phone"
                name="phone"
                type="tel"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
              />
            </div>
          </section>

          {/* Employment Information */}

          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 lg:grid-cols-3 sm:p-6 text-sm font-semibold text-slate-900 sm:text-base">
              <div className="flex items-center gap-2">
                <FiBriefcase size={18} className="text-blue-600" />

                <h2 className="font-semibold text-slate-900">
                  Employment Information
                </h2>
              </div>

              <p className=" text-sm text-slate-500">
                Update the employee's employment details.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">
              <Input
                label="Date of Joining"
                name="dateOfJoining"
                type="date"
                value={formData.dateOfJoining}
                onChange={handleChange}
                error={errors.dateOfJoining}
                required
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Employment Type
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 ${
                    errors.employmentType
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                >
                  <option value="">Select employment type</option>

                  <option value="FULL_TIME">Full Time</option>

                  <option value="PART_TIME">Part Time</option>

                  <option value="CONTRACT">Contract</option>

                  <option value="INTERN">Intern</option>
                </select>

                {errors.employmentType && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.employmentType}
                  </p>
                )}
              </div>

              <Input
                label="Designation"
                name="designation"
                placeholder="Software Engineer"
                value={formData.designation}
                onChange={handleChange}
                error={errors.designation}
                required
              />

              <Input
                label="Department"
                name="department"
                placeholder="Engineering"
                value={formData.department}
                onChange={handleChange}
                error={errors.department}
                required
              />
            </div>
          </section>

          {/* Address */}

          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4 sm:px-6 text-sm font-semibold text-slate-900 sm:text-base">
              <div className="flex items-center gap-2">
                <FiMapPin size={18} className="text-blue-600" />

                <h2 className="font-semibold text-slate-900">Address</h2>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Update the employee's address.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">
              <div className="sm:col-span-2">
                <Input
                  label="Address Line 1"
                  name="addressLine1"
                  placeholder="Address line 1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  error={errors.addressLine1}
                />
              </div>

              <div className="sm:col-span-2">
                <Input
                  label="Address Line 2"
                  name="addressLine2"
                  placeholder="Address line 2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  error={errors.addressLine2}
                />
              </div>

              <Input
                label="Country"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                error={errors.country}
              />

              <Input
                label="State"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                error={errors.state}
              />

              <Input
                label="City"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                error={errors.city}
              />

              <Input
                label="Pincode"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                error={errors.pincode}
              />
            </div>
          </section>

          {/* Actions */}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => navigate(`/employees/${employeeId}`)}
              className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-w-32 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              )}

              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const formatDateForInput = (date) => {
  if (!date) {
    return "";
  }

  return new Date(date).toISOString().split("T")[0];
};

export default EditEmployee;
