import { useState } from "react";
import { FiArrowLeft, FiBriefcase, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import Input from "../../components/common/Input";
import { createEmployee } from "../../services/employeeService";
import { validateCreateEmployee } from "../../utils/employeeValidation";

import EmployeeCreatedSuccess from "../../components/employees/EmployeeCreatedSuccess";

const CreateEmployee = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employeeCode: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfJoining: "",
    employmentType: "",
    designation: "",
    department: "",
    role: "EMPLOYEE",

    addressLine1: "",
    addressLine2: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdEmployee, setCreatedEmployee] = useState(null);

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

    const validationErrors = validateCreateEmployee(formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await createEmployee(formData);

      setCreatedEmployee(response.data);

      toast.success("Employee created successfully.");

      console.log("Employee created:", response);
 
    } catch (error) {
      console.error("Employee creation failed:", error);

      const responseError = error.response?.data;

      if (responseError?.errors) {
        setErrors(responseError.errors);
      }

      toast.error(responseError?.message || "Unable to create employee.");
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log("CreateEmployee createdEmployee:", createdEmployee);

  if (createdEmployee) {
    return (
      <EmployeeCreatedSuccess
        employee={createdEmployee}
        onDone={() => navigate("/employees")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}

        <div className="mb-6">
          <button
            type="button"
            onClick={() => navigate("/employees")}
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            <FiArrowLeft size={16} />
            Back to Employees
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <FiUser size={20} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Add Employee
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Create a new employee account for your organization.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}

          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4 sm:px-6 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="flex items-center gap-2">
                <FiUser size={18} className="text-blue-600" />

                <h2 className="font-semibold text-slate-900">
                  Basic Information
                </h2>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Enter the employee's basic identity and contact information.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">
              <Input
                label="Employee ID"
                name="employeeCode"
                placeholder="EMP003"
                value={formData.employeeCode}
                onChange={handleChange}
                error={errors.employeeCode}
                required
              />

              <Input
                label="First Name"
                name="firstName"
                placeholder="Rahul"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
                required
              />

              <Input
                label="Last Name"
                name="lastName"
                placeholder="Sharma"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
                required
              />

              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="rahul@company.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
              />

              <Input
                label="Phone"
                name="phone"
                type="tel"
                placeholder="9876543210"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                required
              />
            </div>
          </section>

          {/* Employment Information */}

          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4 sm:px-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center gap-2">
                <FiBriefcase size={18} className="text-blue-600" />

                <h2 className="font-semibold text-slate-900">
                  Employment Information
                </h2>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Define the employee's role and employment details.
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

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Role
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 ${
                    errors.role
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                >
                  <option value="EMPLOYEE">Employee</option>

                  <option value="MANAGER">Manager</option>

                  <option value="HR">HR</option>
                </select>

                {errors.role && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.role}</p>
                )}
              </div>
            </div>
          </section>

          {/* Address */}

          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4 sm:px-6 grid grid-cols-1 gap-5 md:grid-cols-2">
              <h2 className="font-semibold text-slate-900">Address</h2>

              <p className="mt-1 text-sm text-slate-500">
                Add the employee's address information.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">
              <div className="sm:col-span-2">
                <Input
                  label="Address Line 1"
                  name="addressLine1"
                  placeholder="123 Main Street"
                  value={formData.addressLine1}
                  onChange={handleChange}
                />
              </div>

              <div className="sm:col-span-2">
                <Input
                  label="Address Line 2"
                  name="addressLine2"
                  placeholder="Apartment, floor, etc."
                  value={formData.addressLine2}
                  onChange={handleChange}
                />
              </div>

              <Input
                label="Country"
                name="country"
                placeholder="India"
                value={formData.country}
                onChange={handleChange}
              />

              <Input
                label="State"
                name="state"
                placeholder="West Bengal"
                value={formData.state}
                onChange={handleChange}
              />

              <Input
                label="City"
                name="city"
                placeholder="Kolkata"
                value={formData.city}
                onChange={handleChange}
              />

              <Input
                label="Pincode"
                name="pincode"
                placeholder="700001"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>
          </section>

          {/* Footer */}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate("/employees")}
              className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-w-36 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              )}

              {isSubmitting ? "Creating..." : "Create Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;
