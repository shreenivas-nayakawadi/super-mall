import "./App.css";
import {
      Route,
      Routes,
      Navigate,
      Outlet,
      useLocation,
      useNavigate,
} from "react-router-dom";
import { useEffect } from "react";

import { useAuth } from "../src/context/AuthContext";
import LoginForm from "./components/auth/LoginForm.jsx";
import RegisterForm from "./components/auth/RegisterForm.jsx";
import Unauthorized from "./components/common/Unauthorized.jsx";
import NotFound from "./components/common/NotFound.jsx";
import LandingPage from "./components/LandingPage.jsx";

import AdminLayout from "./components/admin/AdminLayout.jsx";
import Dashboard from "./components/admin/Dashboard .jsx";
import ShopList from "./components/admin/ShopList.jsx";
import ShopForm from "./components/admin/ShopForm.jsx";
import ProductList from "./components/admin/ProductList.jsx";
import ProductForm from "./components/admin/ProductForm.jsx";
import OfferList from "./components/admin/OfferList.jsx";
import OfferForm from "./components/admin/OfferForm.jsx";
import CategoriesFloors from "./components/admin/CategoriesFloors.jsx";

import UserLayout from "./components/user/UserLayout.jsx";
import UserDashboard from "./components/user/UserDashboard.jsx";
import UserShopList from "./components/user/UserShopList.jsx";
import UserShopDetails from "./components/user/UserShopDetails.jsx";
import CompareProducts from "./components/user/CompareProducts.jsx";
import UserOffersList from "./components/user/UserOffersList";

import { AdminProvider } from "./context/AdminContext.jsx";
import { UserProvider } from "./context/UserContext";

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
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route
                              path="/unauthorized"
                              element={<Unauthorized />}
                        />

                        <Route path="/404" element={<NotFound />} />
                        <Route
                              path="*"
                              element={<Navigate to="/404" replace />}
                        />
                        <Route
                              element={
                                    <AdminProvider>
                                          <RoleGuard allowedRoles={["admin"]} />
                                    </AdminProvider>
                              }
                        >
                              <Route path="/admin" element={<AdminLayout />}>
                                    <Route
                                          path="dashboard"
                                          element={<Dashboard />}
                                    />
                                    <Route
                                          path="shops"
                                          element={<ShopList />}
                                    />
                                    <Route
                                          path="shops/new"
                                          element={<ShopForm />}
                                    />
                                    <Route
                                          path="shops/:id"
                                          element={<ShopForm />}
                                    />
                                    <Route
                                          path="products"
                                          element={<ProductList />}
                                    />
                                    <Route
                                          path="products/new"
                                          element={<ProductForm />}
                                    />
                                    <Route
                                          path="products/:id"
                                          element={<ProductForm />}
                                    />
                                    <Route
                                          path="offers"
                                          element={<OfferList />}
                                    />
                                    <Route
                                          path="offers/new"
                                          element={<OfferForm />}
                                    />
                                    <Route
                                          path="offers/:id"
                                          element={<OfferForm />}
                                    />
                                    <Route
                                          path="categories"
                                          element={<CategoriesFloors />}
                                    />
                              </Route>
                        </Route>

                        <Route
                              element={
                                    <UserProvider>
                                          <RoleGuard allowedRoles={["user"]} />
                                    </UserProvider>
                              }
                        >
                              <Route path="/user" element={<UserLayout />}>
                                    <Route
                                          path="dashboard"
                                          element={<UserDashboard />}
                                    />
                                    <Route
                                          path="shops"
                                          element={<UserShopList />}
                                    />
                                    <Route
                                          path="shops/:id"
                                          element={<UserShopDetails />}
                                    />
                                    <Route
                                          path="offers"
                                          element={<UserOffersList />}
                                    />
                                    <Route
                                          path="compare"
                                          element={<CompareProducts />}
                                    />
                              </Route>
                        </Route>
                  </Routes>
            </>
      );
}

export default App;
