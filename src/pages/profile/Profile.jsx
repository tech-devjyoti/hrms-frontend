import { useEffect, useRef, useState } from "react";
import { FiCamera, FiSave, FiUser } from "react-icons/fi";
import { toast } from "sonner";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { getMyProfile, updateMyProfile } from "../../services/profileService";

const Profile = () => {
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const [previewImage, setPreviewImage] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [isSaving, setIsSaving] = useState(false);

  /*
   * Load profile
   */
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await getMyProfile();

        const profileData = response.data.data.profile;

        setProfile(profileData);

        const employee = profileData.employee;

        setFormData({
          firstName: employee.firstName || "",

          lastName: employee.lastName || "",

          phone: employee.phone || "",

          dateOfBirth: employee.dateOfBirth
            ? employee.dateOfBirth.slice(0, 10)
            : "",

          gender: employee.gender || "",
        });

        setPreviewImage(employee.profilePicture?.url || null);
      } catch (error) {
        toast.error(error.response?.data?.message || "Unable to load profile.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  /*
   * Handle text fields
   */
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /*
   * Handle profile picture
   */
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, PNG and WebP images are allowed.");

      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Profile picture must be smaller than 5 MB.");

      event.target.value = "";
      return;
    }

    setSelectedImage(file);

    const imageUrl = URL.createObjectURL(file);

    setPreviewImage(imageUrl);
  };

  /*
   * Save profile
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.firstName.trim()) {
      toast.error("First name is required.");

      return;
    }

    if (!formData.lastName.trim()) {
      toast.error("Last name is required.");

      return;
    }

    const payload = new FormData();

    payload.append("firstName", formData.firstName.trim());

    payload.append("lastName", formData.lastName.trim());

    payload.append("phone", formData.phone.trim());

    payload.append("dateOfBirth", formData.dateOfBirth);

    payload.append("gender", formData.gender);

    if (selectedImage) {
      payload.append("profilePicture", selectedImage);
    }

    setIsSaving(true);

    try {
      const response = await updateMyProfile(payload);

      const updatedProfile = response.data.data.profile;

      setProfile((previous) => ({
        ...previous,
        employee: {
          ...previous.employee,
          ...updatedProfile,
        },
      }));

      setSelectedImage(null);

      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <p className="text-sm text-slate-500">Profile could not be loaded.</p>
      </div>
    );
  }

  const employee = profile.employee;

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Header */}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your personal information and profile picture.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">
            Profile Picture
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            JPG, PNG or WebP. Maximum size 5 MB.
          </p>

          <div className="mt-5 flex items-center gap-5">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-blue-50 text-blue-600">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FiUser size={36} />
                )}
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white shadow-sm transition hover:bg-blue-700"
                title="Change profile picture"
              >
                <FiCamera size={16} />
              </button>
            </div>

            <div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Change Photo
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Personal Information */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">
            Personal Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Update your personal information.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <Input
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />

            <Input
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />

            <Input label="Email" value={profile.user.email} disabled />

            <Input
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <Input
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Gender
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Select gender</option>

                <option value="MALE">Male</option>

                <option value="FEMALE">Female</option>

                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Account Information */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">
            Account Information
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Role
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {profile.user.role}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Employee ID
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {employee.employeeCode}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Account Status
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {profile.user.accountStatus}
              </p>
            </div>
          </div>
        </div>

        {/* Save */}

        <div className="flex justify-end">
          <Button type="submit" loading={isSaving} icon={<FiSave size={16} />}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
