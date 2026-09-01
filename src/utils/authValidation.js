export const validateChangePassword = (formData) => {
  const errors = {};

  if (!formData.currentPassword) {
    errors.currentPassword =
      "Current password is required.";
  }

  if (!formData.newPassword) {
    errors.newPassword =
      "New password is required.";
  } else if (formData.newPassword.length < 8) {
    errors.newPassword =
      "Password must be at least 8 characters.";
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword =
      "Please confirm your new password.";
  } else if (
    formData.newPassword !==
    formData.confirmPassword
  ) {
    errors.confirmPassword =
      "Passwords do not match.";
  }

  if (
    formData.currentPassword &&
    formData.newPassword &&
    formData.currentPassword ===
      formData.newPassword
  ) {
    errors.newPassword =
      "New password must be different from your current password.";
  }

  return errors;
};