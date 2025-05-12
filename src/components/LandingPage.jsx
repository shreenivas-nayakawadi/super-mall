import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LandingPage = () => {
      const { currentUser } = useAuth();

      return (
            <div className="min-h-screen bg-gray-50">
                  {/* Hero Section */}
                  <header className="relative bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                              <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl">
                                    Welcome to Super Mall
                              </h1>
                              <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
                                    Your One-Stop Destination for Smart
                                    Shopping. Discover amazing deals, compare
                                    products, and shop with confidence.
                              </p>
                              <div className="mt-10 flex gap-4 justify-center">
                                    <Link
                                          to={currentUser ? `/${currentUser.role}/dashboard` : "/login"}
                                          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                                    >
                                          Get Started
                                    </Link>
                              </div>
                        </div>
                  </header>

                  {/* Features Section */}
                  <section className="py-20 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                              <h2 className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl mb-16">
                                    Why Choose Super Mall?
                              </h2>
                              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                                    <div className="relative p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                                          <div className="text-4xl mb-4">
                                                🛍️
                                          </div>
                                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                Multiple Shops
                                          </h3>
                                          <p className="text-gray-500">
                                                Browse through a wide variety of
                                                shops all in one place
                                          </p>
                                    </div>
                                    <div className="relative p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                                          <div className="text-4xl mb-4">
                                                💰
                                          </div>
                                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                Best Offers
                                          </h3>
                                          <p className="text-gray-500">
                                                Get exclusive deals and
                                                discounts from your favorite
                                                stores
                                          </p>
                                    </div>
                                    <div className="relative p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                                          <div className="text-4xl mb-4">
                                                ⚖️
                                          </div>
                                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                Compare Products
                                          </h3>
                                          <p className="text-gray-500">
                                                Make informed decisions by
                                                comparing products across shops
                                          </p>
                                    </div>
                                    <div className="relative p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                                          <div className="text-4xl mb-4">
                                                🎯
                                          </div>
                                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                Personalized Experience
                                          </h3>
                                          <p className="text-gray-500">
                                                Get recommendations based on
                                                your preferences
                                          </p>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Join Section */}
                  <section className="bg-indigo-700">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                                    Ready to Start Shopping?
                              </h2>
                              <p className="mt-4 text-xl text-indigo-100">
                                    Join thousands of happy customers who make
                                    smart shopping decisions every day.
                              </p>
                              <Link
                                    to="/register"
                                    className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                              >
                                    Join Now
                              </Link>
                        </div>
                  </section>
            </div>
      );
};

export default LandingPage;
