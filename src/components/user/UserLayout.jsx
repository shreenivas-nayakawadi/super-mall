import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const UserLayout = () => {
      const location = useLocation();
      const { currentUser, logout } = useAuth();

      const isActive = (path) => {
            return location.pathname.startsWith(path)
                  ? "text-blue-600 font-medium"
                  : "text-gray-600";
      };

      return (
            <div className="min-h-screen bg-gray-50">
                  <nav className="bg-white shadow">
                        <div className="container mx-auto px-6 py-4">
                              <div className="flex items-center justify-between">
                                    <Link
                                          to="/"
                                          className="text-xl font-bold text-blue-600"
                                    >
                                          Super Mall
                                    </Link>
                                    <div className="flex gap-8">
                                          <Link
                                                to="/user/dashboard"
                                                className={`hover:text-blue-600 ${isActive(
                                                      "/user/dashboard"
                                                )}`}
                                          >
                                                Dashboard
                                          </Link>
                                          <Link
                                                to="/user/shops"
                                                className={`hover:text-blue-600 ${isActive(
                                                      "/user/shops"
                                                )}`}
                                          >
                                                Shops
                                          </Link>
                                          <Link
                                                to="/user/offers"
                                                className={`hover:text-blue-600 ${isActive(
                                                      "/user/offers"
                                                )}`}
                                          >
                                                Offers
                                          </Link>
                                          <Link
                                                to="/user/compare"
                                                className={`hover:text-blue-600 ${isActive(
                                                      "/user/compare"
                                                )}`}
                                          >
                                                Compare
                                          </Link>
                                    </div>
                                    <div className="flex items-center space-x-4">
                              <span className="text-sm text-gray-600">
                                    Welcome,{" "}
                                    {currentUser?.displayName ||
                                          currentUser?.email}
                              </span>
                              <button
                                    onClick={logout}
                                    className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                              >
                                    Logout
                              </button>
                        </div>
                              </div>
                        </div>
                  </nav>

                  <main className="container mx-auto px-6 py-8">
                        <Outlet />
                  </main>
            </div>
      );
};

export default UserLayout;
