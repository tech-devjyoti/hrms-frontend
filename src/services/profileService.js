import axiosInstance from "../api/axiosInstance";

export const getMyProfile = async () => {
  return axiosInstance.get("/profile/me");
};

export const updateMyProfile = async (formData) => {
  return axiosInstance.patch("/profile/me", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
