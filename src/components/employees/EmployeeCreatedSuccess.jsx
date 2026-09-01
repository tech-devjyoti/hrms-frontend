import { FiCheck, FiCopy, FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import { toast } from "sonner";

const EmployeeCreatedSuccess = ({ employee, onDone }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    employee: {
      firstName,
      lastName,
      employeeCode,
      email,
      employment: { employmentType },
    },
    temporaryPassword,
  } = employee;

  console.log("EmployeeCreatedSuccess employee:", employee);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(employee.temporaryPassword);

      toast.success("Temporary password copied.");
    } catch (error) {
      toast.error("Unable to copy password.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex min-h-[80vh] max-w-2xl items-center justify-center">
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {/* Success Icon */}

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
            <FiCheck size={28} className="text-emerald-600" />
          </div>

          <div className="mt-5 text-center">
            <h1 className="text-2xl font-bold text-slate-900">
              Employee created successfully
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              The employee account has been created successfully.
            </p>
          </div>

          {/* Employee Information */}

          <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Employee ID
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {employeeCode}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Name
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {firstName} {lastName}
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Email
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {email}
                </p>
              </div>
            </div>
          </div>

          {/* Temporary Password */}

          <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-5">
            <div>
              <h2 className="text-sm font-semibold text-amber-900">
                Temporary Password
              </h2>

              <p className="mt-1 text-xs text-amber-700">
                Share this password securely with the employee. They must change
                it after their first login.
              </p>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex-1 rounded-lg border border-amber-200 bg-white px-3 py-2.5">
                <span className="font-mono text-sm text-slate-900">
                  {showPassword ? temporaryPassword : "••••••••••••"}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                className="rounded-lg border border-slate-300 bg-white p-2.5 text-slate-600 transition hover:bg-slate-50"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="rounded-lg border border-slate-300 bg-white p-2.5 text-slate-600 transition hover:bg-slate-50"
                title="Copy password"
              >
                <FiCopy size={17} />
              </button>
            </div>
          </div>

          {/* Warning */}

          <div className="mt-5 text-center">
            <p className="text-xs text-slate-500">
              This temporary password should be shared securely and should not
              be stored or sent through an insecure channel.
            </p>
          </div>

          {/* Done */}

          <button
            type="button"
            onClick={onDone}
            className="mt-7 w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
          >
            Go to Employees
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCreatedSuccess;
