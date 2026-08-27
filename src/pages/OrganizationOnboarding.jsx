import { useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBriefcase,
  FiCheck,
} from "react-icons/fi";

import StepIndicator from "../components/common/StepIndicator";
import ProgressLine from "../components/common/ProgressLine";

import EssentialInformation from "../components/onboarding/EssentialInformation";
import OrganizationAddress from "../components/onboarding/OrganizationAddress";
import OrganizationDetails from "../components/onboarding/OrganizationDetails";
import AdminAccount from "../components/onboarding/AdminAccount";
import ReviewConfirmation from "../components/onboarding/ReviewConfirmation";

import { validateOnboardingStep } from "../utils/onboardingValidation";

import { steps } from "../constants/onboardingSteps";

const OrganizationOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    organizationName: "",
    organizationCode: "",
    organizationEmail: "",
    organizationPhone: "",
    organizationType: "",
    industry: "",
    website: "",

    addressLine1: "",
    addressLine2: "",
    country: "",
    state: "",
    city: "",
    pincode: "",

    employeeCount: "",
    organizationSize: "",
    foundedYear: "",
    workingDays: [],
    timezone: "",
    currency: "",

    firstName: "",
    lastName: "",
    adminEmail: "",
    password: "",
    confirmPassword: "",

    termsAccepted: false,
    informationConfirmed: false,
  });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const handleWorkingDayChange = (day) => {
    setFormData((previous) => {
      const isSelected = previous.workingDays.includes(day);

      return {
        ...previous,
        workingDays: isSelected
          ? previous.workingDays.filter((selectedDay) => selectedDay !== day)
          : [...previous.workingDays, day],
      };
    });

    setErrors((previous) => ({
      ...previous,
      workingDays: "",
    }));
  };

  const handleNext = (event) => {
    event.preventDefault();

    const validationErrors = validateOnboardingStep(formData, currentStep);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (currentStep === 5) {
      console.log("Complete Organization Onboarding Payload:", formData);

      return;
    }

    setCurrentStep((previous) => previous + 1);
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((previous) => previous - 1);
  };

  const currentStepData = steps[currentStep - 1];

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <EssentialInformation
            formData={formData}
            errors={errors}
            onChange={handleChange}
          />
        );

      case 2:
        return (
          <OrganizationAddress
            formData={formData}
            errors={errors}
            onChange={handleChange}
          />
        );

      case 3:
        return (
          <OrganizationDetails
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onWorkingDayChange={handleWorkingDayChange}
          />
        );

      case 4:
        return (
          <AdminAccount
            formData={formData}
            errors={errors}
            onChange={handleChange}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
          />
        );

      case 5:
        return (
          <ReviewConfirmation
            formData={formData}
            errors={errors}
            onChange={handleChange}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <FiBriefcase size={22} />
          </div>

          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Create your organization
          </h1>

          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Let's get your HRMS workspace set up.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.step} className="flex flex-1 items-center">
                <StepIndicator
                  step={`0${step.step}`}
                  title={step.label}
                  active={currentStep === step.step}
                  completed={currentStep > step.step}
                />

                {index < steps.length - 1 && (
                  <ProgressLine active={currentStep > step.step} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Card Header */}
          <div className="border-b border-slate-200 px-5 py-5 sm:px-8">
            <p className="text-sm font-medium text-blue-600">
              Step {currentStep} of {steps.length}
            </p>

            <h2 className="mt-1 text-xl font-semibold text-slate-900">
              {currentStepData.title}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {currentStepData.description}
            </p>
          </div>

          <form onSubmit={handleNext}>
            {/* Current Step */}
            {renderCurrentStep()}

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-slate-200 px-5 py-5 sm:px-8">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  <FiArrowLeft size={17} />
                  Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < steps.length ? (
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Continue
                  <FiArrowRight size={17} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Create Organization
                  <FiCheck size={17} />
                </button>
              )}
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          You can review and change your information before completing setup.
        </p>
      </div>
    </div>
  );
};

export default OrganizationOnboarding;
