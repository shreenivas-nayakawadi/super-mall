import { useState } from "react";
import { useAdminContext } from "../../context/AdminContext";

const CategoriesFloors = () => {
      const {
            categories,
            floors,
            fetchCategories,
            fetchFloors,
            addCategory,
            updateCategory,
            deleteCategory,
            addFloor,
            updateFloor,
            deleteFloor,
      } = useAdminContext();

      const [newCategory, setNewCategory] = useState("");
      const [editingCategory, setEditingCategory] = useState(null);
      const [editCategoryName, setEditCategoryName] = useState("");

      const [newFloor, setNewFloor] = useState("");
      const [editingFloor, setEditingFloor] = useState(null);
      const [editFloorName, setEditFloorName] = useState("");

      const handleAddCategory = async () => {
            if (!newCategory.trim()) return;
            await addCategory({ name: newCategory.trim() });
            setNewCategory("");
            fetchCategories();
      };

      const handleUpdateCategory = async () => {
            if (!editCategoryName.trim() || !editingCategory) return;
            await updateCategory(editingCategory.id, {
                  name: editCategoryName.trim(),
            });
            setEditingCategory(null);
            fetchCategories();
      };

      const handleDeleteCategory = async (id) => {
            await deleteCategory(id);
            fetchCategories();
      };

      const handleAddFloor = async () => {
            if (!newFloor.trim()) return;
            await addFloor({ name: newFloor.trim() });
            setNewFloor("");
            fetchFloors();
      };

      const handleUpdateFloor = async () => {
            if (!editFloorName.trim() || !editingFloor) return;
            await updateFloor(editingFloor.id, { name: editFloorName.trim() });
            setEditingFloor(null);
            fetchFloors();
      };

      const handleDeleteFloor = async (id) => {
            await deleteFloor(id);
            fetchFloors();
      };

      return (
            <div className="p-4 sm:p-6 max-w-5xl mx-auto">
                  <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-gray-800">
                        Manage Categories & Floors
                  </h1>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
                        {/* Categories Section */}
                        <section className="border p-4 sm:p-5 rounded-lg shadow-md bg-white">
                              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
                                    Categories
                              </h2>

                              {editingCategory ? (
                                    <div className="space-y-3">
                                          <input
                                                type="text"
                                                value={editCategoryName}
                                                onChange={(e) =>
                                                      setEditCategoryName(
                                                            e.target.value
                                                      )
                                                }
                                                placeholder="Category name"
                                                className="w-full p-2 sm:p-3 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none text-sm sm:text-base"
                                          />
                                          <div className="flex flex-col sm:flex-row gap-2">
                                                <button
                                                      onClick={handleUpdateCategory}
                                                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base"
                                                >
                                                      Update
                                                </button>
                                                <button
                                                      onClick={() =>
                                                            setEditingCategory(null)
                                                      }
                                                      className="flex-1 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors duration-200 text-sm sm:text-base"
                                                >
                                                      Cancel
                                                </button>
                                          </div>
                                    </div>
                              ) : (
                                    <div className="flex flex-col sm:flex-row gap-2 mb-4">
                                          <input
                                                type="text"
                                                value={newCategory}
                                                onChange={(e) =>
                                                      setNewCategory(e.target.value)
                                                }
                                                placeholder="New category name"
                                                className="flex-1 p-2 sm:p-3 border rounded focus:ring-2 focus:ring-green-300 focus:border-green-500 outline-none text-sm sm:text-base"
                                          />
                                          <button
                                                onClick={handleAddCategory}
                                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-200 text-sm sm:text-base"
                                          >
                                                Add Category
                                          </button>
                                    </div>
                              )}

                              <ul className="space-y-2 max-h-[400px] overflow-y-auto">
                                    {categories.map((category) => (
                                          <li
                                                key={category.id}
                                                className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 border rounded hover:bg-gray-50 transition-colors duration-200"
                                          >
                                                <span className="text-sm sm:text-base mb-2 sm:mb-0">
                                                      {category.name}
                                                </span>
                                                <div className="flex gap-2 justify-end">
                                                      <button
                                                            onClick={() => {
                                                                  setEditingCategory(
                                                                        category
                                                                  );
                                                                  setEditCategoryName(
                                                                        category.name
                                                                  );
                                                            }}
                                                            className="text-blue-600 hover:text-blue-800 text-sm sm:text-base px-2 py-1 hover:bg-blue-50 rounded transition-colors duration-200"
                                                      >
                                                            Edit
                                                      </button>
                                                      <button
                                                            onClick={() =>
                                                                  handleDeleteCategory(
                                                                        category.id
                                                                  )
                                                            }
                                                            className="text-red-600 hover:text-red-800 text-sm sm:text-base px-2 py-1 hover:bg-red-50 rounded transition-colors duration-200"
                                                      >
                                                            Delete
                                                      </button>
                                                </div>
                                          </li>
                                    ))}
                              </ul>
                        </section>

                        {/* Floors Section */}
                        <section className="border p-4 sm:p-5 rounded-lg shadow-md bg-white">
                              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
                                    Floors
                              </h2>

                              {editingFloor ? (
                                    <div className="space-y-3">
                                          <input
                                                type="text"
                                                value={editFloorName}
                                                onChange={(e) =>
                                                      setEditFloorName(
                                                            e.target.value
                                                      )
                                                }
                                                placeholder="Floor name"
                                                className="w-full p-2 sm:p-3 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none text-sm sm:text-base"
                                          />
                                          <div className="flex flex-col sm:flex-row gap-2">
                                                <button
                                                      onClick={handleUpdateFloor}
                                                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base"
                                                >
                                                      Update
                                                </button>
                                                <button
                                                      onClick={() =>
                                                            setEditingFloor(null)
                                                      }
                                                      className="flex-1 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors duration-200 text-sm sm:text-base"
                                                >
                                                      Cancel
                                                </button>
                                          </div>
                                    </div>
                              ) : (
                                    <div className="flex flex-col sm:flex-row gap-2 mb-4">
                                          <input
                                                type="text"
                                                value={newFloor}
                                                onChange={(e) =>
                                                      setNewFloor(e.target.value)
                                                }
                                                placeholder="New floor name"
                                                className="flex-1 p-2 sm:p-3 border rounded focus:ring-2 focus:ring-green-300 focus:border-green-500 outline-none text-sm sm:text-base"
                                          />
                                          <button
                                                onClick={handleAddFloor}
                                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-200 text-sm sm:text-base"
                                          >
                                                Add Floor
                                          </button>
                                    </div>
                              )}

                              <ul className="space-y-2 max-h-[400px] overflow-y-auto">
                                    {floors.map((floor) => (
                                          <li
                                                key={floor.id}
                                                className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 border rounded hover:bg-gray-50 transition-colors duration-200"
                                          >
                                                <span className="text-sm sm:text-base mb-2 sm:mb-0">
                                                      {floor.name}
                                                </span>
                                                <div className="flex gap-2 justify-end">
                                                      <button
                                                            onClick={() => {
                                                                  setEditingFloor(
                                                                        floor
                                                                  );
                                                                  setEditFloorName(
                                                                        floor.name
                                                                  );
                                                            }}
                                                            className="text-blue-600 hover:text-blue-800 text-sm sm:text-base px-2 py-1 hover:bg-blue-50 rounded transition-colors duration-200"
                                                      >
                                                            Edit
                                                      </button>
                                                      <button
                                                            onClick={() =>
                                                                  handleDeleteFloor(
                                                                        floor.id
                                                                  )
                                                            }
                                                            className="text-red-600 hover:text-red-800 text-sm sm:text-base px-2 py-1 hover:bg-red-50 rounded transition-colors duration-200"
                                                      >
                                                            Delete
                                                      </button>
                                                </div>
                                          </li>
                                    ))}
                              </ul>
                        </section>
                  </div>
            </div>
      );
};

export default CategoriesFloors;
