import { useState } from "react";
import { FiCheck, FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import Input from "../../components/common/Input";
import { changePassword } from "../../services/employeeService";
import { validateChangePassword } from "../../utils/authValidation";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const user = useSelector((state) => state.auth.user);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    const validationErrors = validateChangePassword(formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (!user?.id) {
      toast.error("Unable to identify your account.");

      return;
    }

    setIsSubmitting(true);

    try {
      const response = await changePassword(user.id, formData);

      toast.success(response.message || "Password changed successfully.");

      navigate("/employees");
    } catch (error) {
      console.error("Password change failed:", error);

      const responseError = error.response?.data;

      if (responseError?.errors) {
        setErrors(responseError.errors);
      }

      toast.error(responseError?.message || "Unable to change password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}

        <div className="mb-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <FiLock size={25} />
          </div>

          <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
            Change your password
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Your account is using a temporary password. Please create a new
            password before continuing.
          </p>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="space-y-5">
            <PasswordInput
              label="Current Password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              error={errors.currentPassword}
              showPassword={showCurrentPassword}
              setShowPassword={setShowCurrentPassword}
              required
            />

            <PasswordInput
              label="New Password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              error={errors.newPassword}
              showPassword={showNewPassword}
              setShowPassword={setShowNewPassword}
              required
            />

            <PasswordInput
              label="Confirm New Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
              required
            />
          </div>

          {/* Password Requirements */}

          <div className="mt-5 rounded-lg bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-700">
              Password requirements
            </p>

            <div className="mt-2 space-y-1.5">
              <Requirement
                valid={formData.newPassword.length >= 8}
                text="At least 8 characters"
              />

              <Requirement
                valid={
                  formData.newPassword &&
                  formData.newPassword !== formData.currentPassword
                }
                text="Different from your current password"
              />

              <Requirement
                valid={
                  formData.newPassword &&
                  formData.confirmPassword &&
                  formData.newPassword === formData.confirmPassword
                }
                text="Passwords match"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            )}

            {isSubmitting ? "Changing Password..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

const PasswordInput = ({
  label,
  name,
  value,
  onChange,
  error,
  showPassword,
  setShowPassword,
  required = false,
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}

        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <div className="relative">
        <input
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          className={`w-full rounded-lg border bg-white px-3 py-2.5 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          }`}
        />

        <button
          type="button"
          onClick={() => setShowPassword((previous) => !previous)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        >
          {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
        </button>
      </div>

      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
};

const Requirement = ({ valid, text }) => {
  return (
    <div className="flex items-center gap-2">
      <FiCheck
        size={14}
        className={valid ? "text-emerald-600" : "text-slate-300"}
      />

      <span
        className={`text-xs ${valid ? "text-emerald-700" : "text-slate-500"}`}
      >
        {text}
      </span>
    </div>
  );
};

export default ChangePassword;
