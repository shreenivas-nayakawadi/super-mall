import { createContext, useContext, useState, useEffect } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
      const [loading, setLoading] = useState(true);
      const [shops, setShops] = useState([]);
      const [products, setProducts] = useState([]);
      const [offers, setOffers] = useState([]);
      const [categories, setCategories] = useState([]);
      const [floors, setFloors] = useState([]);
      const [selectedProducts, setSelectedProducts] = useState([]);

      // Fetch all shops with optional filters
      const fetchShops = async (filters = {}) => {
            setLoading(true);
            try {
                  let q = collection(db, "shops");

                  if (filters.category) {
                        q = query(q, where("category", "==", filters.category));
                  }
                  if (filters.floor) {
                        q = query(q, where("floor", "==", filters.floor));
                  }

                  const snapshot = await getDocs(q);
                  const data = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                  }));
                  setShops(data);
            } catch (err) {
                  console.error("Error fetching shops:", err);
            } finally {
                  setLoading(false);
            }
      };

      // Fetch products with optional filters
      const fetchProducts = async (filters = {}) => {
            setLoading(true);
            try {
                  let q = collection(db, "products");

                  if (filters.shopId) {
                        q = query(q, where("shopId", "==", filters.shopId));
                  }
                  if (filters.category) {
                        q = query(q, where("category", "==", filters.category));
                  }
                  if (filters.offerId) {
                        q = query(q, where("offerId", "!=", null));
                  }

                  const snapshot = await getDocs(q);
                  const data = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                  }));
                  setProducts(data);
            } catch (err) {
                  console.error("Error fetching products:", err);
            } finally {
                  setLoading(false);
            }
      };

      // Fetch offers with optional filters
      const fetchOffers = async (filters = {}) => {
            setLoading(true);
            try {
                  let q = collection(db, "offers");

                  if (filters.shopId) {
                        q = query(q, where("shopId", "==", filters.shopId));
                  }
                  if (filters.active) {
                        const now = new Date().toISOString();
                        q = query(
                              q,
                              where("startDate", "<=", now),
                              where("endDate", ">=", now)
                        );
                  }

                  const snapshot = await getDocs(q);
                  const data = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                  }));
                  setOffers(data);
            } catch (err) {
                  console.error("Error fetching offers:", err);
            } finally {
                  setLoading(false);
            }
      };

      // Fetch all categories
      const fetchCategories = async () => {
            setLoading(true);
            try {
                  const snapshot = await getDocs(collection(db, "categories"));
                  const data = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                  }));
                  setCategories(data);
            } catch (err) {
                  console.error("Error fetching categories:", err);
            } finally {
                  setLoading(false);
            }
      };

      // Fetch all floors
      const fetchFloors = async () => {
            setLoading(true);
            try {
                  const snapshot = await getDocs(collection(db, "floors"));
                  const data = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                  }));
                  setFloors(data);
            } catch (err) {
                  console.error("Error fetching floors:", err);
            } finally {
                  setLoading(false);
            }
      };

      // Add product to comparison list
      const addToComparison = (product) => {
            setSelectedProducts((prev) => {
                  if (prev.some((p) => p.id === product.id)) return prev;
                  return [...prev, product];
            });
      };

      // Remove product from comparison list
      const removeFromComparison = (productId) => {
            setSelectedProducts((prev) =>
                  prev.filter((p) => p.id !== productId)
            );
      };

      // Initialize data on mount
      useEffect(() => {
            const initializeData = async () => {
                  await fetchShops();
                  await fetchCategories();
                  await fetchFloors();
                  await fetchOffers({ active: true });
            };
            initializeData();
      }, []);

      const value = {
            loading,
            shops,
            products,
            offers,
            categories,
            floors,
            selectedProducts,
            fetchShops,
            fetchProducts,
            fetchOffers,
            fetchCategories,
            fetchFloors,
            addToComparison,
            removeFromComparison,
      };

      return (
            <UserContext.Provider value={value}>
                  {children}
            </UserContext.Provider>
      );
};

export const useUserContext = () => useContext(UserContext);
