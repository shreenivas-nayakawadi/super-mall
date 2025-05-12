import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

const UserShopDetails = () => {
      const { id } = useParams();
      const {
            shops,
            products,
            offers,
            fetchProducts,
            fetchOffers,
            addToComparison,
      } = useUserContext();

      const shop = shops.find((s) => s.id === id);

      useEffect(() => {
            if (id) {
                  fetchProducts({ shopId: id });
                  fetchOffers({ shopId: id });
            }
      }, [id]);

      if (!shop)
            return (
                  <div className="text-center py-12">
                        <p className="text-xl text-gray-600">Shop not found</p>
                        <Link
                              to="/user/shops"
                              className="text-blue-600 hover:underline mt-4 inline-block"
                        >
                              Back to shops
                        </Link>
                  </div>
            );

      return (
            <div className="space-y-8">
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                        
                        <div className="p-6">
                              <h2 className="text-3xl font-bold text-gray-800">
                                    {shop.name}
                              </h2>
                              <p className="text-gray-600 mt-2">
                                    {shop.description}
                              </p>
                              <div className="mt-4 flex gap-4 text-sm">
                                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                                          {shop.category}
                                    </span>
                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                                          Floor {shop.floor}
                                    </span>
                              </div>
                              <div className="mt-4">
                                    <p className="text-gray-700">
                                          <span className="font-semibold">
                                                Location:
                                          </span>{" "}
                                          {shop.location}
                                    </p>
                                    <p className="text-gray-700">
                                          <span className="font-semibold">
                                                Contact:
                                          </span>{" "}
                                          {shop.contact}
                                    </p>
                                    <p className="text-gray-700">
                                          <span className="font-semibold">
                                                Hours:
                                          </span>{" "}
                                          {shop.openingHours}
                                    </p>
                              </div>
                        </div>
                  </div>

                  {offers.length > 0 && (
                        <section className="bg-white p-6 rounded-lg shadow">
                              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                                    Current Offers
                              </h3>
                              <div className="grid md:grid-cols-2 gap-4">
                                    {offers.map((offer) => (
                                          <div
                                                key={offer.id}
                                                className="border border-yellow-300 rounded-lg p-4 bg-yellow-50"
                                          >
                                                <div className="flex justify-between items-start">
                                                      <div>
                                                            <h4 className="font-bold text-lg text-yellow-800">
                                                                  {offer.title}
                                                            </h4>
                                                            <p className="text-yellow-600 font-bold">
                                                                  {
                                                                        offer.discount
                                                                  }
                                                                  % OFF
                                                            </p>
                                                      </div>
                                                      <div className="text-sm text-gray-500">
                                                            Valid until:{" "}
                                                            {new Date(
                                                                  offer.endDate
                                                            ).toLocaleDateString()}
                                                      </div>
                                                </div>
                                                <p className="mt-2 text-gray-700">
                                                      {offer.description}
                                                </p>
                                          </div>
                                    ))}
                              </div>
                        </section>
                  )}

                  <section className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                              Products
                        </h3>
                        {products.length > 0 ? (
                              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.map((product) => (
                                          <div
                                                key={product.id}
                                                className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                                          >
                                                <div className="p-4">
                                                      <div className="flex justify-between items-start">
                                                            <h4 className="font-bold text-lg text-gray-800">
                                                                  {product.name}
                                                            </h4>
                                                            {product.offerId && (
                                                                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                                                                        On Offer
                                                                  </span>
                                                            )}
                                                      </div>
                                                      <p className="text-gray-600 mt-1">
                                                            {
                                                                  product.description
                                                            }
                                                      </p>
                                                      <div className="mt-3 flex justify-between items-center">
                                                            <span className="text-green-600 font-bold">
                                                                  ₹
                                                                  {
                                                                        product.price
                                                                  }
                                                            </span>
                                                            <button
                                                                  onClick={() =>
                                                                        addToComparison(
                                                                              product
                                                                        )
                                                                  }
                                                                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                            >
                                                                  Compare
                                                            </button>
                                                      </div>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        ) : (
                              <p className="text-gray-600">
                                    No products available in this shop.
                              </p>
                        )}
                  </section>
            </div>
      );
};

export default UserShopDetails;
