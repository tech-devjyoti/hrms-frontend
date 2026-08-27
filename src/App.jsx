// import LandingPage from "./pages/LandingPage";
// import Login from "./pages/Login";
// import OrganizationOnboarding from "./pages/OrganizationOnboarding";

// const App = () => {
//   return <Login />;
// };

// export default App;


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import OrganizationOnboarding from "./pages/OrganizationOnboarding";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/organization/create"
          element={<OrganizationOnboarding />}
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;