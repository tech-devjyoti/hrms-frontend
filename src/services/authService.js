import axiosInstance from "../api/axiosInstance";

const registerOrganization = async (organizationData) => {
  const response = await axiosInstance.post(
    "/auth/register",
    organizationData
  );

  return response.data;
};

const loginUser = async (credentials) => {
  const response = await axiosInstance.post(
    "/auth/login",
    credentials
  );

  return response.data;
};

const getCurrentUser = async () => {
  const response = await axiosInstance.get(
    "/auth/me"
  );

  return response.data;
};

const logoutUser = async () => {
  const response = await axiosInstance.post(
    "/auth/logout"
  );

  return response.data;
};

export {
  registerOrganization,
  loginUser,
  getCurrentUser,
  logoutUser,
};