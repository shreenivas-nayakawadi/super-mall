// src/components/admin/offers/OfferList.jsx
import { useState,useEffect  } from "react";
import { Link } from "react-router-dom";
import { useAdminContext } from "../../context/AdminContext";

const OfferList = () => {
      const { offers, shops, deleteOffer, fetchAllOffers } = useAdminContext();
      const [searchTerm, setSearchTerm] = useState("");
      const [selectedShop, setSelectedShop] = useState("all");

      const filteredOffers = offers.filter((offer) => {
            const matchesSearch = offer.title
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase());
            const matchesShop =
                  selectedShop === "all" || offer.shopId === selectedShop;
            return matchesSearch && matchesShop;
      });
      useEffect(() => {
            fetchAllOffers();
      }, [offers]);

      return (
            <div className="space-y-6">
                  <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-800">
                              Manage Offers
                        </h2>
                        <Link
                              to="/admin/offers/new"
                              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                              Add New Offer
                        </Link>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                    <input
                                          type="text"
                                          placeholder="Search offers..."
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
                                                Title
                                          </th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Shop
                                          </th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Discount
                                          </th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Valid Until
                                          </th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                          </th>
                                    </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredOffers.map((offer) => {
                                          const shop = shops.find(
                                                (s) => s.id === offer.shopId
                                          );
                                          return (
                                                <tr key={offer.id}>
                                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {offer.title}
                                                      </td>
                                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {shop?.name ||
                                                                  "Unknown"}
                                                      </td>
                                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {offer.discount}%
                                                      </td>
                                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {new Date(
                                                                  offer.endDate
                                                            ).toLocaleDateString()}
                                                      </td>
                                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            <div className="space-x-2">
                                                                  <Link
                                                                        to={`/admin/offers/${offer.id}`}
                                                                        className="text-indigo-600 hover:text-indigo-900"
                                                                  >
                                                                        Edit
                                                                  </Link>
                                                                  <button
                                                                        onClick={() =>
                                                                              deleteOffer(
                                                                                    offer.id,
                                                                                    offer.shopId
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

export default OfferList;
