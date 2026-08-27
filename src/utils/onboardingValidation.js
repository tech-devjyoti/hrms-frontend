const isPasswordValid = (password) => {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password)
  );
};

export const validateOnboardingStep = (formData, currentStep) => {
  const newErrors = {};

  if (currentStep === 1) {
    if (!formData.organizationName.trim()) {
      newErrors.organizationName =
        "Organization name is required";
    }

    if (!formData.organizationCode.trim()) {
      newErrors.organizationCode =
        "Organization code is required";
    }

    if (!formData.organizationEmail.trim()) {
      newErrors.organizationEmail =
        "Organization email is required";
    }

    if (!formData.organizationType) {
      newErrors.organizationType =
        "Please select organization type";
    }

    if (!formData.industry) {
      newErrors.industry =
        "Please select an industry";
    }
  }

  if (currentStep === 2) {
    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 =
        "Address is required";
    }

    if (!formData.country) {
      newErrors.country =
        "Please select a country";
    }

    if (!formData.state.trim()) {
      newErrors.state =
        "State is required";
    }

    if (!formData.city.trim()) {
      newErrors.city =
        "City is required";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode =
        "Pincode is required";
    }
  }

  if (currentStep === 3) {
    if (!formData.employeeCount) {
      newErrors.employeeCount =
        "Please enter employee count";
    } else if (Number(formData.employeeCount) < 1) {
      newErrors.employeeCount =
        "Employee count must be at least 1";
    }

    if (!formData.organizationSize) {
      newErrors.organizationSize =
        "Please select organization size";
    }

    if (!formData.workingDays?.length) {
      newErrors.workingDays =
        "Please select at least one working day";
    }

    if (!formData.timezone) {
      newErrors.timezone =
        "Please select a time zone";
    }

    if (!formData.currency) {
      newErrors.currency =
        "Please select a currency";
    }
  }

  if (currentStep === 4) {
    if (!formData.firstName.trim()) {
      newErrors.firstName =
        "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName =
        "Last name is required";
    }

    if (!formData.adminEmail.trim()) {
      newErrors.adminEmail =
        "Admin email is required";
    }

    if (!formData.password) {
      newErrors.password =
        "Password is required";
    } else if (!isPasswordValid(formData.password)) {
      newErrors.password =
        "Password does not meet the required criteria";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }
  }

  if (currentStep === 5) {
    if (!formData.termsAccepted) {
      newErrors.termsAccepted =
        "You must accept the Terms & Conditions";
    }

    if (!formData.informationConfirmed) {
      newErrors.informationConfirmed =
        "Please confirm that the information is accurate";
    }
  }

  return newErrors;
};