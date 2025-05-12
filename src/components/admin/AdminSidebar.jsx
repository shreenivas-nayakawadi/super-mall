// src/components/admin/AdminSidebar.jsx
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
      return (
            <aside className="w-72 sm:w-64 h-full bg-indigo-700 text-white flex flex-col">
                  <div className="p-4 border-b border-indigo-600">
                        <NavLink
                              to="/"
                              end
                              className="text-lg sm:text-xl font-bold flex items-center"
                        >
                              <span className="truncate">Super Mall Admin</span>
                        </NavLink>
                  </div>
                  <nav className="flex-1 overflow-y-auto">
                        <div className="p-4">
                              <ul className="space-y-1">
                                    <li>
                                          <NavLink
                                                to="/admin/dashboard"
                                                end
                                                className={({ isActive }) =>
                                                      `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200 ${
                                                            isActive
                                                                  ? "bg-indigo-900 text-white"
                                                                  : "text-indigo-100 hover:bg-indigo-600"
                                                      }`
                                                }
                                          >
                                                <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                </svg>
                                                Dashboard
                                          </NavLink>
                                    </li>
                                    <li>
                                          <NavLink
                                                to="/admin/shops"
                                                className={({ isActive }) =>
                                                      `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200 ${
                                                            isActive
                                                                  ? "bg-indigo-900 text-white"
                                                                  : "text-indigo-100 hover:bg-indigo-600"
                                                      }`
                                                }
                                          >
                                                <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                                Manage Shops
                                          </NavLink>
                                    </li>
                                    <li>
                                          <NavLink
                                                to="/admin/products"
                                                className={({ isActive }) =>
                                                      `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200 ${
                                                            isActive
                                                                  ? "bg-indigo-900 text-white"
                                                                  : "text-indigo-100 hover:bg-indigo-600"
                                                      }`
                                                }
                                          >
                                                <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                </svg>
                                                Manage Products
                                          </NavLink>
                                    </li>
                                    <li>
                                          <NavLink
                                                to="/admin/offers"
                                                className={({ isActive }) =>
                                                      `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200 ${
                                                            isActive
                                                                  ? "bg-indigo-900 text-white"
                                                                  : "text-indigo-100 hover:bg-indigo-600"
                                                      }`
                                                }
                                          >
                                                <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                                </svg>
                                                Manage Offers
                                          </NavLink>
                                    </li>
                                    <li>
                                          <NavLink
                                                to="/admin/categories"
                                                className={({ isActive }) =>
                                                      `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200 ${
                                                            isActive
                                                                  ? "bg-indigo-900 text-white"
                                                                  : "text-indigo-100 hover:bg-indigo-600"
                                                      }`
                                                }
                                          >
                                                <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                </svg>
                                                Categories & Floors
                                          </NavLink>
                                    </li>
                              </ul>
                        </div>
                  </nav>
            </aside>
      );
};

export default AdminSidebar;
