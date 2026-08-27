import { FiMapPin } from "react-icons/fi";
import Input from "../common/Input";
import Select from "../common/Select";

const OrganizationAddress = ({ formData, errors, onChange }) => {
  return (
    <div className="px-5 py-6 sm:px-8">
      <div className="mb-6 flex items-start gap-3 rounded-xl bg-blue-50 p-4">
        <div className="mt-0.5 text-blue-600">
          <FiMapPin size={20} />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-blue-900">
            Primary Organization Address
          </h3>

          <p className="mt-1 text-sm leading-6 text-blue-700">
            Provide the primary address that should be associated with your
            organization.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <Input
            label="Address Line 1"
            name="addressLine1"
            placeholder="Building number, street name"
            value={formData.addressLine1}
            onChange={onChange}
            error={errors.addressLine1}
            required
          />
        </div>

        <div className="md:col-span-2">
          <Input
            label="Address Line 2"
            name="addressLine2"
            placeholder="Apartment, suite, landmark (optional)"
            value={formData.addressLine2}
            onChange={onChange}
          />
        </div>

        <Select
          label="Country"
          name="country"
          value={formData.country}
          onChange={onChange}
          error={errors.country}
          required
          options={[
            "India",
            "United States",
            "United Kingdom",
            "Canada",
            "Australia",
            "Singapore",
            "Other",
          ]}
        />

        <Input
          label="State / Province"
          name="state"
          placeholder="e.g. West Bengal"
          value={formData.state}
          onChange={onChange}
          error={errors.state}
          required
        />

        <Input
          label="City"
          name="city"
          placeholder="e.g. Durgapur"
          value={formData.city}
          onChange={onChange}
          error={errors.city}
          required
        />

        <Input
          label="Postal / Pincode"
          name="pincode"
          placeholder="e.g. 713200"
          value={formData.pincode}
          onChange={onChange}
          error={errors.pincode}
          required
        />
      </div>
    </div>
  );
};

export default OrganizationAddress;
