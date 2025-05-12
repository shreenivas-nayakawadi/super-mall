// src/components/admin/Dashboard.jsx
import { useAdminContext } from "../../context/AdminContext";

const Dashboard = () => {
  const { shops, products, offers } = useAdminContext();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-500">Total Shops</h3>
          <p className="text-3xl font-bold text-indigo-600">{shops.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-500">Total Products</h3>
          <p className="text-3xl font-bold text-indigo-600">{products.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-500">Active Offers</h3>
          <p className="text-3xl font-bold text-indigo-600">{offers.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;