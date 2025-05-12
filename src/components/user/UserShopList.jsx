import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { Link, useSearchParams } from "react-router-dom";

const UserShopList = () => {
      const { shops, fetchShops, categories, floors, loading } =
            useUserContext();

      const [searchParams] = useSearchParams();
      const [categoryFilter, setCategoryFilter] = useState(
            searchParams.get("category") || ""
      );
      const [floorFilter, setFloorFilter] = useState("");

      useEffect(() => {
            const filters = {};
            if (categoryFilter) filters.category = categoryFilter;
            if (floorFilter) filters.floor = floorFilter;
            fetchShops(filters);
      }, [categoryFilter, floorFilter]);

      return (
            <div className="space-y-6">
                  <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-800">
                              All Shops
                        </h2>
                        <Link
                              to="/user/compare"
                              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                        >
                              Compare Products
                        </Link>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow">
                        <div className="flex flex-wrap gap-4 mb-6">
                              <select
                                    value={categoryFilter}
                                    onChange={(e) =>
                                          setCategoryFilter(e.target.value)
                                    }
                                    className="border rounded px-3 py-2 w-full md:w-auto"
                              >
                                    <option value="">All Categories</option>
                                    {categories.map((cat) => (
                                          <option key={cat.id} value={cat.name}>
                                                {cat.name}
                                          </option>
                                    ))}
                              </select>

                              <select
                                    value={floorFilter}
                                    onChange={(e) =>
                                          setFloorFilter(e.target.value)
                                    }
                                    className="border rounded px-3 py-2 w-full md:w-auto"
                              >
                                    <option value="">All Floors</option>
                                    {floors.map((floor) => (
                                          <option
                                                key={floor.id}
                                                value={floor.name}
                                          >
                                                {floor.name}
                                          </option>
                                    ))}
                              </select>
                        </div>

                        {loading ? (
                              <div className="flex justify-center py-8">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                              </div>
                        ) : (
                              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {shops.map((shop) => (
                                          <Link
                                                to={`/user/shops/${shop.id}`}
                                                key={shop.id}
                                                className="border rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow"
                                          >
                                                <div className="p-4">
                                                      <h3 className="text-xl font-bold text-gray-800">
                                                            {shop.name}
                                                      </h3>
                                                      <p className="text-gray-600">
                                                            {shop.description}
                                                      </p>
                                                      <div className="mt-2 flex justify-between text-sm text-gray-500">
                                                            <span>
                                                                  {
                                                                        shop.category
                                                                  }
                                                            </span>
                                                            <span>
                                                                  Floor:{" "}
                                                                  {shop.floor}
                                                            </span>
                                                      </div>
                                                </div>
                                          </Link>
                                    ))}
                              </div>
                        )}
                  </div>
            </div>
      );
};

export default UserShopList;
