export const validateCreateEmployee = (formData) => {
  const errors = {};

  if (!formData.employeeCode?.trim()) {
    errors.employeeCode = "Employee ID is required.";
  }

  if (!formData.firstName?.trim()) {
    errors.firstName = "First name is required.";
  }

  if (!formData.lastName?.trim()) {
    errors.lastName = "Last name is required.";
  }

  if (!formData.email?.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!formData.phone?.trim()) {
    errors.phone = "Phone number is required.";
  }

  if (!formData.dateOfJoining) {
    errors.dateOfJoining = "Date of joining is required.";
  }

  if (!formData.employmentType) {
    errors.employmentType = "Employment type is required.";
  }

  if (!formData.designation?.trim()) {
    errors.designation = "Designation is required.";
  }

  if (!formData.department?.trim()) {
    errors.department = "Department is required.";
  }

  if (!formData.role) {
    errors.role = "Role is required.";
  }

  return errors;
};

export const validateUpdateEmployee = (formData) => {
  const errors = {};

  if (!formData.firstName?.trim()) {
    errors.firstName = "First name is required.";
  }

  if (!formData.lastName?.trim()) {
    errors.lastName = "Last name is required.";
  }

  if (formData.phone?.trim()) {
    const phoneRegex = /^[0-9+\-\s()]{7,20}$/;

    if (!phoneRegex.test(formData.phone.trim())) {
      errors.phone = "Enter a valid phone number.";
    }
  }

  if (!formData.dateOfJoining) {
    errors.dateOfJoining =
      "Date of joining is required.";
  }

  if (!formData.employmentType) {
    errors.employmentType =
      "Employment type is required.";
  }

  if (!formData.designation?.trim()) {
    errors.designation =
      "Designation is required.";
  }

  if (!formData.department?.trim()) {
    errors.department =
      "Department is required.";
  }

  return errors;
};
