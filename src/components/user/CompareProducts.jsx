import { useUserContext } from "../../context/UserContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const CompareProducts = () => {
      const { selectedProducts, shops, removeFromComparison } =
            useUserContext();

      if (selectedProducts.length === 0) {
            return (
                  <div className="text-center py-12">
                        <p className="text-xl text-gray-600">
                              No products selected for comparison
                        </p>
                        <Link
                              to="/user/shops"
                              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                        >
                              Browse Shops
                        </Link>
                  </div>
            );
      }

      return (
            <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                              Product Comparison
                        </h2>
                        <Link
                              to="/user/shops"
                              className="text-blue-600 hover:underline"
                        >
                              Back to shops
                        </Link>
                  </div>

                  <div className="overflow-x-auto">
                        <table className="min-w-full border">
                              <thead className="bg-gray-100">
                                    <tr>
                                          <th className="p-3 border text-left">
                                                Product
                                          </th>
                                          <th className="p-3 border text-left">
                                                Description
                                          </th>
                                          <th className="p-3 border text-left">
                                                Price
                                          </th>
                                          <th className="p-3 border text-left">
                                                Shop
                                          </th>
                                          <th className="p-3 border text-left">
                                                Actions
                                          </th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {selectedProducts.map((prod) => {
                                          const shop = shops.find(
                                                (s) => s.id === prod.shopId
                                          );
                                          return (
                                                <tr
                                                      key={prod.id}
                                                      className="border-t hover:bg-gray-50"
                                                >
                                                      <td className="p-3 border">
                                                            {prod.name}
                                                      </td>
                                                      <td className="p-3 border">
                                                            {prod.description}
                                                      </td>
                                                      <td className="p-3 border font-bold text-green-600">
                                                            ₹{prod.price}
                                                      </td>
                                                      <td className="p-3 border">
                                                            <Link
                                                                  to={`/user/shops/${prod.shopId}`}
                                                                  className="text-blue-600 hover:underline"
                                                            >
                                                                  {shop?.name ||
                                                                        "N/A"}
                                                            </Link>
                                                      </td>
                                                      <td className="p-3 border">
                                                            <button
                                                                  onClick={() =>
                                                                        removeFromComparison(
                                                                              prod.id
                                                                        )
                                                                  }
                                                                  className="text-red-600 hover:text-red-800"
                                                            >
                                                                  Remove
                                                            </button>
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

export default CompareProducts;
