import "./App.css";
import { Route, Routes, Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext";
import LoginForm from "./components/auth/LoginForm.jsx";
import RegisterForm from "./components/auth/RegisterForm.jsx";
import Unauthorized from "./components/common/Unauthorized.jsx";
import NotFound from "./components/common/NotFound.jsx";

const RoleGuard = ({ allowedRoles }) => {
      const { currentUser } = useAuth();
      const location = useLocation();

      if (!currentUser) {
            return <Navigate to="/login" state={{ from: location }} replace />;
      }

      if (!allowedRoles.includes(currentUser.role)) {
            return <Navigate to="/unauthorized" replace />;
      }

      return <Outlet />;
};

function App() {
      return (
            <>
                  <Routes>
                        <Route path="/" element={<h1>landingpage</h1>} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route
                              path="/unauthorized"
                              element={<Unauthorized />}
                        />

                        <Route element={<RoleGuard allowedRoles={["user"]} />}>
                              <Route
                                    path="/user/dashboard"
                                    element={<h1>user dashboard</h1>}
                              />
                        </Route>

                        <Route element={<RoleGuard allowedRoles={["admin"]} />}>
                              <Route
                                    path="/admin/dashboard"
                                    element={<h1>Admin dashboard</h1>}
                              />
                        </Route>

                        <Route path="/404" element={<NotFound />} />
                        <Route
                              path="*"
                              element={<Navigate to="/404" replace />}
                        />
                  </Routes>
            </>
      );
}

export default App;
