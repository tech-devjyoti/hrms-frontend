import { FiCheck } from "react-icons/fi";

import Input from "../common/Input";
import Select from "../common/Select";

const OrganizationDetails = ({
  formData,
  errors,
  onChange,
  onWorkingDayChange,
}) => {
  return (
    <div className="px-5 py-6 sm:px-8">
      <div className="grid gap-6 md:grid-cols-2">
        <Input
          label="Current Employee Count"
          name="employeeCount"
          type="number"
          placeholder="e.g. 50"
          value={formData.employeeCount}
          onChange={onChange}
          error={errors.employeeCount}
          required
        />

        <Select
          label="Organization Size"
          name="organizationSize"
          value={formData.organizationSize}
          onChange={onChange}
          error={errors.organizationSize}
          required
          options={[
            "1 - 10 employees",
            "11 - 50 employees",
            "51 - 200 employees",
            "201 - 500 employees",
            "501 - 1000 employees",
            "1000+ employees",
          ]}
        />

        <Input
          label="Founded Year"
          name="foundedYear"
          type="number"
          placeholder="e.g. 2018"
          value={formData.foundedYear}
          onChange={onChange}
          helperText="Optional"
        />

        <Select
          label="Time Zone"
          name="timezone"
          value={formData.timezone}
          onChange={onChange}
          error={errors.timezone}
          required
          options={[
            "Asia/Kolkata",
            "Asia/Dubai",
            "Asia/Singapore",
            "Europe/London",
            "Europe/Berlin",
            "America/New_York",
            "America/Los_Angeles",
            "Australia/Sydney",
          ]}
        />

        {/* Working Days */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Working Days
            <span className="ml-1 text-red-500">*</span>
          </label>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-7">
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => {
              const selected =
                formData.workingDays.includes(day);

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => onWorkingDayChange(day)}
                  className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-3 text-sm font-medium transition ${
                    selected
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  {selected && <FiCheck size={15} />}

                  <span>{day.slice(0, 3)}</span>
                </button>
              );
            })}
          </div>

          {errors.workingDays && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.workingDays}
            </p>
          )}
        </div>

        <Select
          label="Currency"
          name="currency"
          value={formData.currency}
          onChange={onChange}
          error={errors.currency}
          required
          options={[
            "INR - Indian Rupee (₹)",
            "USD - US Dollar ($)",
            "GBP - British Pound (£)",
            "EUR - Euro (€)",
            "AED - UAE Dirham",
            "SGD - Singapore Dollar",
            "AUD - Australian Dollar",
          ]}
        />
      </div>
    </div>
  );
};

export default OrganizationDetails;