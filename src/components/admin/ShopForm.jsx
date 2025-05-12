// src/components/admin/shops/ShopForm.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdminContext } from "../../context/AdminContext";

const ShopForm = () => {
      const {
            shops,
            addShop,
            updateShop,
            fetchCategories,
            fetchFloors,
            categories,
            floors,
      } = useAdminContext();
      const [formData, setFormData] = useState({
            name: "",
            description: "",
            category: "",
            floor: "",
            location: "",
            contact: "",
            openingHours: "",
      });
      const [errors, setErrors] = useState({});
      const { id } = useParams();
      const navigate = useNavigate();
      const isEditMode = Boolean(id);

      useEffect(() => {
            fetchCategories();
            fetchFloors();

            if (isEditMode) {
                  const shopToEdit = shops.find((shop) => shop.id === id);
                  if (shopToEdit) {
                        setFormData(shopToEdit);
                  }
            }
      }, [id, shops, isEditMode, fetchCategories, fetchFloors]);

      const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
      };

      const validate = () => {
            const newErrors = {};
            if (!formData.name) newErrors.name = "Name is required";
            if (!formData.category) newErrors.category = "Category is required";
            if (!formData.floor) newErrors.floor = "Floor is required";
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
                  if (isEditMode) {
                        await updateShop(id, formData);
                  } else {
                        await addShop(formData);
                  }
                  navigate("/admin/shops");
            } catch (error) {
                  console.error("Error saving shop:", error);
            }
      };

      return (
            <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        {isEditMode ? "Edit Shop" : "Add New Shop"}
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                              <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                          Shop Name
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
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                              <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                          Category
                                    </label>
                                    <select
                                          name="category"
                                          value={formData.category}
                                          onChange={handleChange}
                                          className={`mt-1 block w-full border ${
                                                errors.category
                                                      ? "border-red-500"
                                                      : "border-gray-300"
                                          } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    >
                                          <option value="">
                                                Select Category
                                          </option>
                                          {categories.map((cat) => (
                                                <option
                                                      key={cat.id}
                                                      value={cat.name}
                                                >
                                                      {cat.name}
                                                </option>
                                          ))}
                                    </select>
                                    {errors.category && (
                                          <p className="mt-1 text-sm text-red-600">
                                                {errors.category}
                                          </p>
                                    )}
                              </div>

                              <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                          Floor
                                    </label>
                                    <select
                                          name="floor"
                                          value={formData.floor}
                                          onChange={handleChange}
                                          className={`mt-1 block w-full border ${
                                                errors.floor
                                                      ? "border-red-500"
                                                      : "border-gray-300"
                                          } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    >
                                          <option value="">Select Floor</option>
                                          {floors.map((floor) => (
                                                <option
                                                      key={floor.id}
                                                      value={floor.name}
                                                >
                                                      {floor.name}
                                                </option>
                                          ))}
                                    </select>
                                    {errors.floor && (
                                          <p className="mt-1 text-sm text-red-600">
                                                {errors.floor}
                                          </p>
                                    )}
                              </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                              <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                          Location (e.g., Wing A, Near Elevator)
                                    </label>
                                    <input
                                          type="text"
                                          name="location"
                                          value={formData.location}
                                          onChange={handleChange}
                                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                              </div>

                              <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                          Contact Information
                                    </label>
                                    <input
                                          type="text"
                                          name="contact"
                                          value={formData.contact}
                                          onChange={handleChange}
                                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                              </div>
                        </div>

                        <div>
                              <label className="block text-sm font-medium text-gray-700">
                                    Opening Hours
                              </label>
                              <input
                                    type="text"
                                    name="openingHours"
                                    value={formData.openingHours}
                                    onChange={handleChange}
                                    placeholder="e.g., 9:00 AM - 9:00 PM"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                              />
                        </div>

                        <div className="flex justify-end space-x-3">
                              <button
                                    type="button"
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={() => navigate("/admin/shops")}
                              >
                                    Cancel
                              </button>
                              <button
                                    type="submit"
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                    {isEditMode ? "Update Shop" : "Add Shop"}
                              </button>
                        </div>
                  </form>
            </div>
      );
};

export default ShopForm;
