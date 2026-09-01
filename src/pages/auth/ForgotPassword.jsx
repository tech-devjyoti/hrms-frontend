import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { forgotPassword } from "../../services/authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("Email is required.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await forgotPassword(email);

      toast.success(
        response.data?.message ||
          "If an account exists with this email, a password reset link has been sent.",
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to process your request.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
        <h1 className="text-2xl font-bold text-slate-900">Forgot Password</h1>

        <p className="mt-2 text-sm text-slate-500">
          Enter your email and we'll send you a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <Input
            label="Email address"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
          />

          <Button type="submit" loading={isLoading} className="w-full">
            Send Reset Link
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

export default ForgotPassword;
