// src/components/admin/offers/OfferForm.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdminContext } from "../../context/AdminContext";

const OfferForm = () => {
      const { offers, shops, addOffer, updateOffer } = useAdminContext();
      const [formData, setFormData] = useState({
            title: "",
            description: "",
            discount: "",
            startDate: "",
            endDate: "",
            shopId: "",
      });
      const [errors, setErrors] = useState({});
      const { id } = useParams();
      const navigate = useNavigate();
      const isEditMode = Boolean(id);

      useEffect(() => {
            if (isEditMode) {
                  const offerToEdit = offers.find((offer) => offer.id === id);
                  if (offerToEdit) {
                        setFormData({
                              ...offerToEdit,
                              discount: offerToEdit.discount.toString(),
                              startDate: offerToEdit.startDate.split("T")[0],
                              endDate: offerToEdit.endDate.split("T")[0],
                        });
                  }
            } else {
                  const today = new Date().toISOString().split("T")[0];
                  setFormData((prev) => ({ ...prev, startDate: today }));
            }
      }, [id, offers, isEditMode]);

      const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
      };

      const validate = () => {
            const newErrors = {};
            if (!formData.title) newErrors.title = "Title is required";
            if (
                  !formData.discount ||
                  isNaN(formData.discount) ||
                  formData.discount <= 0 ||
                  formData.discount > 100
            ) {
                  newErrors.discount = "Discount must be between 1 and 100";
            }
            if (!formData.startDate)
                  newErrors.startDate = "Start date is required";
            if (!formData.endDate) newErrors.endDate = "End date is required";
            if (
                  formData.startDate &&
                  formData.endDate &&
                  formData.startDate > formData.endDate
            ) {
                  newErrors.endDate = "End date must be after start date";
            }
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
                  const offerData = {
                        ...formData,
                        discount: parseInt(formData.discount),
                        startDate: new Date(formData.startDate).toISOString(),
                        endDate: new Date(formData.endDate).toISOString(),
                  };

                  if (isEditMode) {
                        await updateOffer(id, offerData);
                  } else {
                        await addOffer(offerData);
                  }
                  navigate("/admin/offers");
            } catch (error) {
                  console.error("Error saving offer:", error);
            }
      };

      return (
            <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">
                        {isEditMode ? "Edit Offer" : "Add New Offer"}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                              <label className="block text-sm font-medium text-gray-700">
                                    Title
                              </label>
                              <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                                          errors.title ? "border-red-500" : ""
                                    }`}
                              />
                              {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">
                                          {errors.title}
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
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    rows={3}
                              />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                          Discount (%)
                                    </label>
                                    <input
                                          type="number"
                                          name="discount"
                                          value={formData.discount}
                                          onChange={handleChange}
                                          min="1"
                                          max="100"
                                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                                                errors.discount
                                                      ? "border-red-500"
                                                      : ""
                                          }`}
                                    />
                                    {errors.discount && (
                                          <p className="text-red-500 text-sm mt-1">
                                                {errors.discount}
                                          </p>
                                    )}
                              </div>

                              <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                          Shop
                                    </label>
                                    <select
                                          name="shopId"
                                          value={formData.shopId}
                                          onChange={handleChange}
                                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                                                errors.shopId
                                                      ? "border-red-500"
                                                      : ""
                                          }`}
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
                                          <p className="text-red-500 text-sm mt-1">
                                                {errors.shopId}
                                          </p>
                                    )}
                              </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                          Start Date
                                    </label>
                                    <input
                                          type="date"
                                          name="startDate"
                                          value={formData.startDate}
                                          onChange={handleChange}
                                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                                                errors.startDate
                                                      ? "border-red-500"
                                                      : ""
                                          }`}
                                    />
                                    {errors.startDate && (
                                          <p className="text-red-500 text-sm mt-1">
                                                {errors.startDate}
                                          </p>
                                    )}
                              </div>

                              <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                          End Date
                                    </label>
                                    <input
                                          type="date"
                                          name="endDate"
                                          value={formData.endDate}
                                          onChange={handleChange}
                                          min={formData.startDate}
                                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                                                errors.endDate
                                                      ? "border-red-500"
                                                      : ""
                                          }`}
                                    />
                                    {errors.endDate && (
                                          <p className="text-red-500 text-sm mt-1">
                                                {errors.endDate}
                                          </p>
                                    )}
                              </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                              <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                              >
                                    {isEditMode ? "Update Offer" : "Add Offer"}
                              </button>
                              <button
                                    type="button"
                                    className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400"
                                    onClick={() => navigate("/admin/offers")}
                              >
                                    Cancel
                              </button>
                        </div>
                  </form>
            </div>
      );
};

export default OfferForm;
