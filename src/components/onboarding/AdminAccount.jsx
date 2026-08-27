import {
  FiCheck,
  FiEye,
  FiEyeOff,
  FiShield,
} from "react-icons/fi";

import Input from "../common/Input";

const AdminAccount = ({
  formData,
  errors,
  onChange,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}) => {
  const passwordRequirements = [
    {
      label: "At least 8 characters",
      valid: formData.password.length >= 8,
    },
    {
      label: "One uppercase letter",
      valid: /[A-Z]/.test(formData.password),
    },
    {
      label: "One lowercase letter",
      valid: /[a-z]/.test(formData.password),
    },
    {
      label: "One number",
      valid: /[0-9]/.test(formData.password),
    },
  ];

  return (
    <div className="px-5 py-6 sm:px-8">
      <div className="mb-6 flex items-start gap-3 rounded-xl bg-indigo-50 p-4">
        <div className="mt-0.5 text-indigo-600">
          <FiShield size={20} />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-indigo-900">
            Organization Administrator
          </h3>

          <p className="mt-1 text-sm leading-6 text-indigo-700">
            This account will have administrator access to your
            organization.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Input
          label="First Name"
          name="firstName"
          placeholder="e.g. John"
          value={formData.firstName}
          onChange={onChange}
          error={errors.firstName}
          required
        />

        <Input
          label="Last Name"
          name="lastName"
          placeholder="e.g. Doe"
          value={formData.lastName}
          onChange={onChange}
          error={errors.lastName}
          required
        />

        <div className="md:col-span-2">
          <Input
            label="Admin Email"
            name="adminEmail"
            type="email"
            placeholder="e.g. john@company.com"
            value={formData.adminEmail}
            onChange={onChange}
            error={errors.adminEmail}
            required
          />
        </div>

        {/* Password */}
        <div className="md:col-span-2">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Password
            <span className="ml-1 text-red-500">*</span>
          </label>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={formData.password}
              onChange={onChange}
              className={`w-full rounded-lg border bg-white px-3 py-2.5 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${
                errors.password
                  ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              }`}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((previous) => !previous)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? (
                <FiEyeOff size={18} />
              ) : (
                <FiEye size={18} />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.password}
            </p>
          )}

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {passwordRequirements.map((requirement) => (
              <div
                key={requirement.label}
                className={`flex items-center gap-2 text-xs ${
                  requirement.valid
                    ? "text-emerald-600"
                    : "text-slate-500"
                }`}
              >
                <div
                  className={`flex h-4 w-4 items-center justify-center rounded-full ${
                    requirement.valid
                      ? "bg-emerald-100"
                      : "bg-slate-100"
                  }`}
                >
                  {requirement.valid && <FiCheck size={10} />}
                </div>

                {requirement.label}
              </div>
            ))}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="md:col-span-2">
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Confirm Password
            <span className="ml-1 text-red-500">*</span>
          </label>

          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={
                showConfirmPassword ? "text" : "password"
              }
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={onChange}
              className={`w-full rounded-lg border bg-white px-3 py-2.5 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${
                errors.confirmPassword
                  ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              }`}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  (previous) => !previous
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showConfirmPassword ? (
                <FiEyeOff size={18} />
              ) : (
                <FiEye size={18} />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAccount;