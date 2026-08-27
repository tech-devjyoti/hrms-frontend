import Input from "../common/Input";
import Select from "../common/Select";

const EssentialInformation = ({
  formData,
  errors,
  onChange,
}) => {
  return (
    <div className="grid gap-6 px-5 py-6 sm:px-8 md:grid-cols-2">
      <Input
        label="Organization Name"
        name="organizationName"
        placeholder="e.g. ABC Technologies"
        value={formData.organizationName}
        onChange={onChange}
        error={errors.organizationName}
        required
      />

      <Input
        label="Organization Code"
        name="organizationCode"
        placeholder="e.g. ABCTECH"
        value={formData.organizationCode}
        onChange={onChange}
        error={errors.organizationCode}
        helperText="A unique code used to identify your organization."
        required
      />

      <Input
        label="Organization Email"
        name="organizationEmail"
        type="email"
        placeholder="e.g. contact@company.com"
        value={formData.organizationEmail}
        onChange={onChange}
        error={errors.organizationEmail}
        required
      />

      <Input
        label="Organization Phone"
        name="organizationPhone"
        type="tel"
        placeholder="e.g. +91 98765 43210"
        value={formData.organizationPhone}
        onChange={onChange}
      />

      <Select
        label="Organization Type"
        name="organizationType"
        value={formData.organizationType}
        onChange={onChange}
        error={errors.organizationType}
        required
        options={[
          "Private Limited",
          "Public Limited",
          "Partnership",
          "LLP",
          "Sole Proprietorship",
          "Non-Profit Organization",
          "Other",
        ]}
      />

      <Select
        label="Industry"
        name="industry"
        value={formData.industry}
        onChange={onChange}
        error={errors.industry}
        required
        options={[
          "Information Technology",
          "Finance",
          "Healthcare",
          "Education",
          "Manufacturing",
          "Retail",
          "Construction",
          "Consulting",
          "Hospitality",
          "Other",
        ]}
      />

      <div className="md:col-span-2">
        <Input
          label="Company Website"
          name="website"
          type="url"
          placeholder="https://www.example.com"
          value={formData.website}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default EssentialInformation;