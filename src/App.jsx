import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import OrganizationOnboarding from "./pages/OrganizationOnboarding";

import EmployeeList from "./pages/employees/EmployeeList";
import CreateEmployee from "./pages/employees/CreateEmployee";
import EmployeeDetails from "./pages/employees/EmployeeDetails";
import EditEmployee from "./pages/employees/EditEmployee";

import ChangePassword from "./pages/auth/ChangePassword";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import Profile from "./pages/profile/Profile";

import AppLayout from "./layouts/AppLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================
              PUBLIC ROUTES
          ========================= */}

        <Route element={<PublicRoute />}>
          <Route path="/" element={<LandingPage />} />

          <Route path="/login" element={<Login />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/reset-password" element={<ResetPassword />} />

          <Route
            path="/organization/create"
            element={<OrganizationOnboarding />}
          />
        </Route>

        {/* =========================
              PROTECTED ROUTES
          ========================= */}

        <Route element={<ProtectedRoute />}>
          {/* Change Password */}
          <Route path="/change-password" element={<ChangePassword />} />

          {/* Application Layout */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/employees" element={<EmployeeList />} />

            <Route path="/employees/create" element={<CreateEmployee />} />

            <Route
              path="/employees/:employeeId"
              element={<EmployeeDetails />}
            />

            <Route
              path="/employees/:employeeId/edit"
              element={<EditEmployee />}
            />

            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
