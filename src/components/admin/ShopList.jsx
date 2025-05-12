// src/components/admin/shops/ShopList.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAdminContext } from "../../context/AdminContext";

const ShopList = () => {
      const { shops, deleteShop } = useAdminContext();
      const [searchTerm, setSearchTerm] = useState("");

      const filteredShops = shops.filter((shop) =>
            shop.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return (
            <div className="space-y-6">
                  <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-800">
                              Manage Shops
                        </h2>
                        <Link
                              to="/admin/shops/new"
                              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                              Add New Shop
                        </Link>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow">
                        <input
                              type="text"
                              placeholder="Search shops..."
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                        />
                  </div>

                  <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                    <tr>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Name
                                          </th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Category
                                          </th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Floor
                                          </th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                          </th>
                                    </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredShops.map((shop) => (
                                          <tr key={shop.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                      {shop.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                      {shop.category}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                      {shop.floor}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                      <div className="space-x-2">
                                                            <Link
                                                                  to={`/admin/shops/${shop.id}`}
                                                                  className="text-indigo-600 hover:text-indigo-900"
                                                            >
                                                                  Edit
                                                            </Link>
                                                            <button
                                                                  onClick={() =>
                                                                        deleteShop(
                                                                              shop.id
                                                                        )
                                                                  }
                                                                  className="text-red-600 hover:text-red-900"
                                                            >
                                                                  Delete
                                                            </button>
                                                      </div>
                                                </td>
                                          </tr>
                                    ))}
                              </tbody>
                        </table>
                  </div>
            </div>
      );
};

export default ShopList;
