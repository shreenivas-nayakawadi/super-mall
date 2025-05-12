// src/components/admin/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { useState } from "react";

const AdminLayout = () => {
      const [isSidebarOpen, setIsSidebarOpen] = useState(false);

      const toggleSidebar = () => {
            setIsSidebarOpen(!isSidebarOpen);
      };

      return (
            <div className="flex h-screen bg-gray-100">
                  {/* Mobile sidebar backdrop */}
                  {isSidebarOpen && (
                        <div 
                              className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                              onClick={() => setIsSidebarOpen(false)}
                        />
                  )}

                  {/* Sidebar */}
                  <div className={`
                        fixed inset-y-0 left-0 z-30 transform lg:relative lg:translate-x-0 transition duration-300 ease-in-out
                        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                  `}>
                        <AdminSidebar />
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 flex flex-col overflow-hidden w-full">
                        <AdminHeader onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />
                        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
                              <div className="max-w-7xl mx-auto">
                                    <Outlet />
                              </div>
                        </main>
                  </div>
            </div>
      );
};

export default AdminLayout;
