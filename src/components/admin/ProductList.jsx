// src/components/admin/products/ProductList.jsx
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useAdminContext } from "../../context/AdminContext";

const ProductList = () => {
      const { products, shops, deleteProduct,fetchAllProducts } = useAdminContext();
      const [searchTerm, setSearchTerm] = useState("");
      const [selectedShop, setSelectedShop] = useState("all");

      const filteredProducts = products.filter((product) => {
            const matchesSearch = product.name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase());
            const matchesShop =
                  selectedShop === "all" || product.shopId === selectedShop;
            return matchesSearch && matchesShop;
      });
      useEffect(() => {
            fetchAllProducts();
      }, [products]);


      return (
            <div className="space-y-6">
                  <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-800">
                              Manage Products
                        </h2>
                        <Link
                              to="/admin/products/new"
                              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                              Add New Product
                        </Link>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                    <input
                                          type="text"
                                          placeholder="Search products..."
                                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                          value={searchTerm}
                                          onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                          }
                                    />
                              </div>

                              <div>
                                    <select
                                          value={selectedShop}
                                          onChange={(e) =>
                                                setSelectedShop(e.target.value)
                                          }
                                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                          <option value="all">All Shops</option>
                                          {shops.map((shop) => (
                                                <option
                                                      key={shop.id}
                                                      value={shop.id}
                                                >
                                                      {shop.name}
                                                </option>
                                          ))}
                                    </select>
                              </div>
                        </div>
                  </div>

                  <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                    <tr>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Name
                                          </th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Shop
                                          </th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Price
                                          </th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Category
                                          </th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                          </th>
                                    </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredProducts.map((product) => {
                                          const shop = shops.find(
                                                (s) => s.id === product.shopId
                                          );
                                          return (
                                                <tr key={product.id}>
                                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {product.name}
                                                      </td>
                                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {shop?.name ||
                                                                  "Unknown"}
                                                      </td>
                                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            $
                                                            {product.price?.toFixed(
                                                                  2
                                                            )}
                                                      </td>
                                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {product.category}
                                                      </td>
                                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            <div className="space-x-2">
                                                                  <Link
                                                                        to={`/admin/products/${product.id}`}
                                                                        className="text-indigo-600 hover:text-indigo-900"
                                                                  >
                                                                        Edit
                                                                  </Link>
                                                                  <button
                                                                        onClick={() =>
                                                                              deleteProduct(
                                                                                    product.id,
                                                                                    product.shopId
                                                                              )
                                                                        }
                                                                        className="text-red-600 hover:text-red-900"
                                                                  >
                                                                        Delete
                                                                  </button>
                                                            </div>
                                                      </td>
                                                </tr>
                                          );
                                    })}
                              </tbody>
                        </table>
                  </div>
            </div>
      );
};

export default ProductList;
