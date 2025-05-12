// src/components/admin/products/ProductForm.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdminContext } from "../../context/AdminContext";

const ProductForm = () => {
      const { products, shops, addProduct, updateProduct, offers } =
            useAdminContext();
      const [formData, setFormData] = useState({
            name: "",
            description: "",
            price: "",
            category: "",
            shopId: "",
            offerId: "",
      });
      const [errors, setErrors] = useState({});
      const { id } = useParams();
      const navigate = useNavigate();
      const isEditMode = Boolean(id);

      useEffect(() => {
            if (isEditMode) {
                  const productToEdit = products.find(
                        (product) => product.id === id
                  );
                  if (productToEdit) {
                        setFormData({
                              ...productToEdit,
                              price: productToEdit.price.toString(),
                        });
                  }
            }
      }, [id, products, isEditMode]);

      const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
      };

      const validate = () => {
            const newErrors = {};
            if (!formData.name) newErrors.name = "Name is required";
            if (!formData.price || isNaN(formData.price))
                  newErrors.price = "Valid price is required";
            if (!formData.shopId) newErrors.shopId = "Shop is required";
            return newErrors;
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            const validationErrors = validate();
            if (Object.keys(validationErrors).length > 0) {
                  setErrors(validationErrors);
                  return;
            }

            try {
                  const productData = {
                        ...formData,
                        price: parseFloat(formData.price),
                        offerId: formData.offerId || null,
                  };

                  if (isEditMode) {
                        await updateProduct(id, productData);
                  } else {
                        await addProduct(productData);
                  }
                  navigate("/admin/products");
            } catch (error) {
                  console.error("Error saving product:", error);
            }
      };

      const shopOffers = formData.shopId
            ? offers.filter((offer) => offer.shopId === formData.shopId)
            : [];

      return (
            <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        {isEditMode ? "Edit Product" : "Add New Product"}
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                              <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                          Product Name
                                    </label>
                                    <input
                                          type="text"
                                          name="name"
                                          value={formData.name}
                                          onChange={handleChange}
                                          className={`mt-1 block w-full border ${
                                                errors.name
                                                      ? "border-red-500"
                                                      : "border-gray-300"
                                          } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    />
                                    {errors.name && (
                                          <p className="mt-1 text-sm text-red-600">
                                                {errors.name}
                                          </p>
                                    )}
                              </div>

                              <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                          Price ($)
                                    </label>
                                    <input
                                          type="number"
                                          name="price"
                                          value={formData.price}
                                          onChange={handleChange}
                                          step="0.01"
                                          min="0"
                                          className={`mt-1 block w-full border ${
                                                errors.price
                                                      ? "border-red-500"
                                                      : "border-gray-300"
                                          } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    />
                                    {errors.price && (
                                          <p className="mt-1 text-sm text-red-600">
                                                {errors.price}
                                          </p>
                                    )}
                              </div>
                        </div>

                        <div>
                              <label className="block text-sm font-medium text-gray-700">
                                    Description
                              </label>
                              <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={3}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                              />
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                              <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                          Category
                                    </label>
                                    <input
                                          type="text"
                                          name="category"
                                          value={formData.category}
                                          onChange={handleChange}
                                          placeholder="e.g., Electronics, Clothing"
                                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                              </div>

                              <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                          Shop
                                    </label>
                                    <select
                                          name="shopId"
                                          value={formData.shopId}
                                          onChange={handleChange}
                                          className={`mt-1 block w-full border ${
                                                errors.shopId
                                                      ? "border-red-500"
                                                      : "border-gray-300"
                                          } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    >
                                          <option value="">Select Shop</option>
                                          {shops.map((shop) => (
                                                <option
                                                      key={shop.id}
                                                      value={shop.id}
                                                >
                                                      {shop.name}
                                                </option>
                                          ))}
                                    </select>
                                    {errors.shopId && (
                                          <p className="mt-1 text-sm text-red-600">
                                                {errors.shopId}
                                          </p>
                                    )}
                              </div>
                        </div>

                        {shopOffers.length > 0 && (
                              <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                          Apply Offer (Optional)
                                    </label>
                                    <select
                                          name="offerId"
                                          value={formData.offerId || ""}
                                          onChange={handleChange}
                                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                          <option value="">No Offer</option>
                                          {shopOffers.map((offer) => (
                                                <option
                                                      key={offer.id}
                                                      value={offer.id}
                                                >
                                                      {offer.title} (
                                                      {offer.discount}% off)
                                                </option>
                                          ))}
                                    </select>
                              </div>
                        )}

                        <div className="flex justify-end space-x-3">
                              <button
                                    type="button"
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={() => navigate("/admin/products")}
                              >
                                    Cancel
                              </button>
                              <button
                                    type="submit"
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                    {isEditMode
                                          ? "Update Product"
                                          : "Add Product"}
                              </button>
                        </div>
                  </form>
            </div>
      );
};

export default ProductForm;
