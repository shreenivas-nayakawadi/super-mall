// src/components/admin/AdminHeader.jsx
import { useAuth } from "../../context/AuthContext";

const AdminHeader = ({ onMenuClick, isSidebarOpen }) => {
      const { currentUser, logout } = useAuth();

      return (
            <header className="bg-white shadow-sm">
                  <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                    {/* Hamburger Menu Button */}
                                    <button
                                          onClick={onMenuClick}
                                          className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                    >
                                          <span className="sr-only">Open sidebar</span>
                                          {/* Hamburger Icon */}
                                          <svg
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                          >
                                                {isSidebarOpen ? (
                                                      <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M6 18L18 6M6 6l12 12"
                                                      />
                                                ) : (
                                                      <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M4 6h16M4 12h16M4 18h16"
                                                      />
                                                )}
                                          </svg>
                                    </button>

                                    <h2 className="ml-2 text-xl font-semibold text-gray-800 hidden sm:block">
                                          Admin Panel
                                    </h2>
                              </div>

                              <div className="flex items-center space-x-2 sm:space-x-4">
                                    <span className="text-sm text-gray-600 hidden sm:block">
                                          Welcome,{" "}
                                          {currentUser?.displayName || currentUser?.email}
                                    </span>
                                    <button
                                          onClick={logout}
                                          className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors duration-200"
                                    >
                                          Logout
                                    </button>
                              </div>
                        </div>
                  </div>
            </header>
      );
};

export default AdminHeader;
