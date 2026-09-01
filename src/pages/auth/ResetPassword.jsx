import { useState } from "react";

import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { toast } from "sonner";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { resetPassword } from "../../services/authService";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!token) {
      toast.error("Invalid or missing reset token.");
      return;
    }

    if (!formData.newPassword) {
      toast.error("New password is required.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await resetPassword({
        token,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });

      toast.success(response.data?.message || "Password reset successfully.");

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to reset password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
        <h1 className="text-2xl font-bold text-slate-900">Reset Password</h1>

        <p className="mt-2 text-sm text-slate-500">
          Create a new password for your account.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <Input
            label="New password"
            name="newPassword"
            type="password"
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={handleChange}
          />

          <Input
            label="Confirm password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <Button type="submit" loading={isLoading} className="w-full">
            Reset Password
          </Button>
        </form>

        <div className="mt-5 text-center">
          <Link
            to="/login"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
