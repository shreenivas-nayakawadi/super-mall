import { useUserContext } from "../../context/UserContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const UserDashboard = () => {
      const { offers, fetchOffers, categories, fetchCategories } =
            useUserContext();

      useEffect(() => {
            fetchOffers({ active: true });
            fetchCategories();
      }, []);

      return (
            <div className="space-y-8">
                  <h1 className="text-3xl font-bold text-gray-800">
                        Welcome to Super Mall
                  </h1>

                  {/* Featured Offers */}
                  <section className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                              Featured Offers
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {offers.slice(0, 3).map((offer) => (
                                    <div
                                          key={offer.id}
                                          className="border border-yellow-300 rounded-lg p-4 bg-yellow-50"
                                    >
                                          <h3 className="font-bold text-lg text-yellow-800">
                                                {offer.title}
                                          </h3>
                                          <p className="text-yellow-600">
                                                {offer.discount}% OFF
                                          </p>
                                          <p className="text-sm text-gray-600">
                                                {offer.description}
                                          </p>
                                    </div>
                              ))}
                        </div>
                        <Link
                              to="/user/offers"
                              className="inline-block mt-4 text-blue-600 hover:underline"
                        >
                              View all offers →
                        </Link>
                  </section>

                  {/* Shop Categories */}
                  <section className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                              Shop Categories
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {categories.map((category) => (
                                    <Link
                                          to={`/user/shops?category=${category.name}`}
                                          key={category.id}
                                          className="border rounded-lg p-4 hover:bg-gray-50 transition-colors text-center"
                                    >
                                          <h3 className="font-medium">
                                                {category.name}
                                          </h3>
                                    </Link>
                              ))}
                        </div>
                  </section>
            </div>
      );
};

export default UserDashboard;
