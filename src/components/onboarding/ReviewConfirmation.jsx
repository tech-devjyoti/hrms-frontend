import { FiBriefcase, FiCheck, FiMapPin, FiUser } from "react-icons/fi";

import Checkbox from "../common/Checkbox";
import Card from "../common/Card";
import CardRow from "../common/CardRow";

const ReviewConfirmation = ({
  formData,
  errors,
  onChange,
}) => {
  return (
    <div className="px-5 py-6 sm:px-8">
      {/* Intro */}
      <div className="mb-8 rounded-xl border border-blue-100 bg-blue-50 p-4">
        <div className="flex items-start gap-3">
          <FiCheck
            className="mt-0.5 shrink-0 text-blue-600"
            size={20}
          />

          <div>
            <h3 className="text-sm font-semibold text-blue-900">
              Almost there
            </h3>

            <p className="mt-1 text-sm leading-6 text-blue-700">
              Review the information below before creating your
              HRMS organization.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Organization */}
        <Card
          title="Organization"
          icon={<FiBriefcase size={18} />}
        >
          <CardRow
            label="Name"
            value={formData.organizationName}
          />

          <CardRow
            label="Code"
            value={formData.organizationCode}
          />

          <CardRow
            label="Email"
            value={formData.organizationEmail}
          />

          <CardRow
            label="Phone"
            value={
              formData.organizationPhone ||
              "Not provided"
            }
          />

          <CardRow
            label="Type"
            value={formData.organizationType}
          />

          <CardRow
            label="Industry"
            value={formData.industry}
          />

          <CardRow
            label="Website"
            value={
              formData.website ||
              "Not provided"
            }
          />
        </Card>

        {/* Address */}
        <Card
          title="Address"
          icon={<FiMapPin size={18} />}
        >
          <CardRow
            label="Address"
            value={formData.addressLine1}
          />

          {formData.addressLine2 && (
            <CardRow
              label="Address 2"
              value={formData.addressLine2}
            />
          )}

          <CardRow
            label="City"
            value={formData.city}
          />

          <CardRow
            label="State"
            value={formData.state}
          />

          <CardRow
            label="Country"
            value={formData.country}
          />

          <CardRow
            label="Pincode"
            value={formData.pincode}
          />
        </Card>

        {/* Organization Details */}
        <Card
          title="Organization Details"
          icon={<FiBriefcase size={18} />}
        >
          <CardRow
            label="Employees"
            value={formData.employeeCount}
          />

          <CardRow
            label="Organization Size"
            value={formData.organizationSize}
          />

          <CardRow
            label="Founded Year"
            value={
              formData.foundedYear ||
              "Not provided"
            }
          />

          <CardRow
            label="Working Days"
            value={formData.workingDays.join(", ")}
          />

          <CardRow
            label="Time Zone"
            value={formData.timezone}
          />

          <CardRow
            label="Currency"
            value={formData.currency}
          />
        </Card>

        {/* Administrator */}
        <Card
          title="Administrator"
          icon={<FiUser size={18} />}
        >
          <CardRow
            label="Name"
            value={`${formData.firstName} ${formData.lastName}`}
          />

          <CardRow
            label="Email"
            value={formData.adminEmail}
          />

          <CardRow
            label="Password"
            value="Password set"
          />
        </Card>
      </div>

      {/* Agreements */}
      <div className="mt-8 space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
        <Checkbox
          name="termsAccepted"
          checked={formData.termsAccepted}
          onChange={onChange}
          error={errors.termsAccepted}
        >
          I agree to the{" "}
          <button
            type="button"
            className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
          >
            Terms & Conditions
          </button>
          .
        </Checkbox>

        <Checkbox
          name="informationConfirmed"
          checked={formData.informationConfirmed}
          onChange={onChange}
          error={errors.informationConfirmed}
        >
          I confirm that the information provided above is
          accurate.
        </Checkbox>
      </div>
    </div>
  );
};

export default ReviewConfirmation;