import { createContext, useContext, useState, useEffect } from "react";
import {
      collection,
      doc,
      setDoc,
      getDocs,
      deleteDoc,
      updateDoc,
      query,
      where,
} from "firebase/firestore";
import { db } from "../firebase/config";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
      const [loading, setLoading] = useState(true);

      //========================= SHOPS =========================
      const [shops, setShops] = useState([]);

      // Fetch all shops
      const fetchShops = async () => {
            try {
                  setLoading(true);
                  const querySnapshot = await getDocs(collection(db, "shops"));
                  const shopsData = [];
                  querySnapshot.forEach((doc) => {
                        shopsData.push({ id: doc.id, ...doc.data() });
                  });
                  setShops(shopsData);
            } catch (error) {
                  console.error("Error fetching shops:", error);
            } finally {
                  setLoading(false);
            }
      };

      // Add new shop
      const addShop = async (shopData) => {
            try {
                  setLoading(true);
                  const newShopRef = doc(collection(db, "shops"));
                  await setDoc(newShopRef, {
                        name: shopData.name,
                        description: shopData.description,
                        category: shopData.category,
                        floor: shopData.floor,
                        location: shopData.location,
                        contact: shopData.contact,
                        openingHours: shopData.openingHours,
                        createdAt: new Date().toISOString(),
                  });
                  await fetchShops();
                  return { success: true };
            } catch (error) {
                  console.error("Error adding shop:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      // Update shop
      const updateShop = async (id, updatedData) => {
            try {
                  setLoading(true);
                  const shopRef = doc(db, "shops", id);
                  await updateDoc(shopRef, updatedData);
                  await fetchShops();
                  return { success: true };
            } catch (error) {
                  console.error("Error updating shop:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      // Delete shop
      const deleteShop = async (id) => {
            try {
                  setLoading(true);
                  await deleteDoc(doc(db, "shops", id));
                  await fetchShops();
                  return { success: true };
            } catch (error) {
                  console.error("Error deleting shop:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      //========================= PRODUCTS =========================
      const [products, setProducts] = useState([]);

      // Fetch all products
      const fetchAllProducts = async () => {
            try {
                  setLoading(true);
                  const querySnapshot = await getDocs(collection(db, "products"));
                  const productsData = [];
                  querySnapshot.forEach((doc) => {
                        productsData.push({ id: doc.id, ...doc.data() });
                  });
                  setProducts(productsData);
            } catch (error) {
                  console.error("Error fetching all products:", error);
            } finally {
                  setLoading(false);
            }
      };

      // Fetch products by shop
      const fetchProductsByShop = async (shopId) => {
            try {
                  setLoading(true);
                  const q = query(
                        collection(db, "products"),
                        where("shopId", "==", shopId)
                  );
                  const querySnapshot = await getDocs(q);
                  const productsData = [];
                  querySnapshot.forEach((doc) => {
                        productsData.push({ id: doc.id, ...doc.data() });
                  });
                  setProducts(productsData);
            } catch (error) {
                  console.error("Error fetching products:", error);
            } finally {
                  setLoading(false);
            }
      };

      // Add product
      const addProduct = async (productData) => {
            try {
                  setLoading(true);
                  const newProductRef = doc(collection(db, "products"));
                  await setDoc(newProductRef, {
                        name: productData.name,
                        description: productData.description,
                        price: productData.price,
                        category: productData.category,
                        shopId: productData.shopId,
                        offerId: productData.offerId || null,
                        createdAt: new Date().toISOString(),
                  });
                  await fetchProductsByShop(productData.shopId);
                  return { success: true };
            } catch (error) {
                  console.error("Error adding product:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      // Update product
      const updateProduct = async (id, updatedData) => {
            try {
                  setLoading(true);
                  const productRef = doc(db, "products", id);
                  await updateDoc(productRef, updatedData);
                  if (updatedData.shopId) {
                        await fetchProductsByShop(updatedData.shopId);
                  }
                  return { success: true };
            } catch (error) {
                  console.error("Error updating product:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      // Delete product
      const deleteProduct = async (id, shopId) => {
            try {
                  setLoading(true);
                  await deleteDoc(doc(db, "products", id));
                  await fetchProductsByShop(shopId);
                  return { success: true };
            } catch (error) {
                  console.error("Error deleting product:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      //========================= OFFERS =========================
      const [offers, setOffers] = useState([]);

      // Fetch all offers
      const fetchAllOffers = async () => {
            try {
                  setLoading(true);
                  const querySnapshot = await getDocs(collection(db, "offers"));
                  const offersData = [];
                  querySnapshot.forEach((doc) => {
                        offersData.push({ id: doc.id, ...doc.data() });
                  });
                  setOffers(offersData);
            } catch (error) {
                  console.error("Error fetching all offers:", error);
            } finally {
                  setLoading(false);
            }
      };

      // Fetch offers by shop
      const fetchOffersByShop = async (shopId) => {
            try {
                  setLoading(true);
                  const q = query(
                        collection(db, "offers"),
                        where("shopId", "==", shopId)
                  );
                  const querySnapshot = await getDocs(q);
                  const offersData = [];
                  querySnapshot.forEach((doc) => {
                        offersData.push({ id: doc.id, ...doc.data() });
                  });
                  setOffers(offersData);
            } catch (error) {
                  console.error("Error fetching offers:", error);
            } finally {
                  setLoading(false);
            }
      };

      // Add offer
      const addOffer = async (offerData) => {
            try {
                  setLoading(true);
                  const newOfferRef = doc(collection(db, "offers"));
                  await setDoc(newOfferRef, {
                        title: offerData.title,
                        description: offerData.description,
                        discount: offerData.discount,
                        startDate: offerData.startDate,
                        endDate: offerData.endDate,
                        shopId: offerData.shopId,
                        createdAt: new Date().toISOString(),
                  });
                  await fetchOffersByShop(offerData.shopId);
                  return { success: true };
            } catch (error) {
                  console.error("Error adding offer:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      // Update offer
      const updateOffer = async (id, updatedData) => {
            try {
                  setLoading(true);
                  const offerRef = doc(db, "offers", id);
                  await updateDoc(offerRef, updatedData);
                  if (updatedData.shopId) {
                        await fetchOffersByShop(updatedData.shopId);
                  }
                  return { success: true };
            } catch (error) {
                  console.error("Error updating offer:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      // Delete offer
      const deleteOffer = async (id, shopId) => {
            try {
                  setLoading(true);
                  await deleteDoc(doc(db, "offers", id));
                  await fetchOffersByShop(shopId);
                  return { success: true };
            } catch (error) {
                  console.error("Error deleting offer:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      //========================= CATEGORIES & FLOORS =========================
      const [categories, setCategories] = useState([]);
      const [floors, setFloors] = useState([]);

      // Fetch all categories
      const fetchCategories = async () => {
            try {
                  setLoading(true);
                  const querySnapshot = await getDocs(
                        collection(db, "categories")
                  );
                  const categoriesData = [];
                  querySnapshot.forEach((doc) => {
                        categoriesData.push({ id: doc.id, ...doc.data() });
                  });
                  setCategories(categoriesData);
            } catch (error) {
                  console.error("Error fetching categories:", error);
            } finally {
                  setLoading(false);
            }
      };

      // Fetch all floors
      const fetchFloors = async () => {
            try {
                  setLoading(true);
                  const querySnapshot = await getDocs(collection(db, "floors"));
                  const floorsData = [];
                  querySnapshot.forEach((doc) => {
                        floorsData.push({ id: doc.id, ...doc.data() });
                  });
                  setFloors(floorsData);
            } catch (error) {
                  console.error("Error fetching floors:", error);
            } finally {
                  setLoading(false);
            }
      };

      const addCategory = async (categoryData) => {
            try {
                  setLoading(true);
                  const newCategoryRef = doc(collection(db, "categories"));
                  await setDoc(newCategoryRef, {
                        name: categoryData.name,
                        createdAt: new Date().toISOString(),
                  });
                  await fetchCategories();
                  return { success: true };
            } catch (error) {
                  console.error("Error adding category:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      const addFloor = async (floorData) => {
            try {
                  setLoading(true);
                  const newFloorRef = doc(collection(db, "floors"));
                  await setDoc(newFloorRef, {
                        name: floorData.name,
                        createdAt: new Date().toISOString(),
                  });
                  await fetchFloors();
                  return { success: true };
            } catch (error) {
                  console.error("Error adding floor:", error);
                  return { success: false, error: error.message };
            } finally {
                  setLoading(false);
            }
      };

      //========================= INITIALIZATION =========================
      useEffect(() => {
            const initializeData = async () => {
                  try {
                        setLoading(true);
                        await Promise.all([
                              fetchShops(),
                              fetchAllProducts(),
                              fetchAllOffers(),
                              fetchCategories(),
                              fetchFloors(),
                        ]);
                  } catch (error) {
                        console.error("Error initializing data:", error);
                  } finally {
                        setLoading(false);
                  }
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
            fetchShops,
            addShop,
            updateShop,
            deleteShop,
            fetchCategories,
            fetchFloors ,
            fetchProductsByShop,
            fetchAllProducts,
            addProduct,
            updateProduct,
            deleteProduct,
            fetchOffersByShop,
            fetchAllOffers,
            addOffer,
            updateOffer,
            deleteOffer,
            addCategory,
            addFloor,
      };

      return (
            <AdminContext.Provider value={value}>
                  {children}
            </AdminContext.Provider>
      );
};

export const useAdminContext = () => useContext(AdminContext);
