import { useEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

const UserOffersList = () => {
      const { offers, shops, fetchOffers } = useUserContext();

      useEffect(() => {
            fetchOffers({ active: true });
      }, []);

      return (
            <div className="space-y-6">
                  <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-800">
                              Current Offers
                        </h2>
                        <Link
                              to="/user/shops"
                              className="text-blue-600 hover:underline"
                        >
                              View All Shops
                        </Link>
                  </div>

                  {offers.length === 0 ? (
                        <div className="bg-white p-6 rounded-lg shadow text-center">
                              <p className="text-gray-600">
                                    No active offers available at the moment.
                              </p>
                        </div>
                  ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {offers.map((offer) => {
                                    const shop = shops.find(
                                          (s) => s.id === offer.shopId
                                    );
                                    return (
                                          <div
                                                key={offer.id}
                                                className="bg-white rounded-lg shadow overflow-hidden"
                                          >
                                                <div className="h-48 bg-yellow-100 flex items-center justify-center">
                                                      <span className="text-4xl font-bold text-yellow-600">
                                                            {offer.discount}%
                                                            OFF
                                                      </span>
                                                </div>
                                                <div className="p-6">
                                                      <h3 className="text-xl font-bold text-gray-800">
                                                            {offer.title}
                                                      </h3>
                                                      <p className="text-gray-600 mt-2">
                                                            {offer.description}
                                                      </p>

                                                      <div className="mt-4 pt-4 border-t border-gray-200">
                                                            <Link
                                                                  to={`/user/shops/${offer.shopId}`}
                                                                  className="text-blue-600 hover:underline"
                                                            >
                                                                  {shop?.name ||
                                                                        "Unknown Shop"}
                                                            </Link>
                                                            <div className="mt-2 text-sm text-gray-500">
                                                                  Valid until:{" "}
                                                                  {new Date(
                                                                        offer.endDate
                                                                  ).toLocaleDateString()}
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    );
                              })}
                        </div>
                  )}
            </div>
      );
};

export default UserOffersList;
