import axiosInstance from "../api/axiosInstance";

export const getEmployees = async (params = {}) => {
  const response = await axiosInstance.get("/employees", {
    params,
  });

  return response.data;
};

export const createEmployee = async (data) => {
  const response = await axiosInstance.post("/employees", data);

  return response.data;
};

export const getEmployeeById = async (employeeId) => {
  const response = await axiosInstance.get(`/employees/${employeeId}`);

  return response.data;
};

export const updateEmployee = async (employeeId, data) => {
  const response = await axiosInstance.patch(`/employees/${employeeId}`, data);

  return response.data;
};

export const suspendEmployee = async (employeeId) => {
  const response = await axiosInstance.patch(
    `/employees/${employeeId}/suspend`,
  );

  return response.data;
};

export const reactivateEmployee = async (employeeId) => {
  const response = await axiosInstance.patch(
    `/employees/${employeeId}/reactivate`,
  );

  return response.data;
};

export const deactivateEmployee = async (employeeId) => {
  const response = await axiosInstance.patch(
    `/employees/${employeeId}/deactivate`,
  );

  return response.data;
};

export const changePassword = async (employeeId, data) => {
  const response = await axiosInstance.post(
    `/employees/${employeeId}/change-password`,
    data,
  );

  return response.data;
};
