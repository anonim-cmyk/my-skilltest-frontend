// hooks/useProducts.js
import { useEffect, useState, useCallback } from "react";
import { fetchProduct } from "../service/api";

const STORAGE_KEY = "local_products_v1";

export default function useProducts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const api = await fetchProduct();
      const local = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      setItems([...local, ...api]);
    } catch (err) {
      console.error("useProducts: fetch error", err);
      setError("Gagal memuat produk. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Load items on mount
  useEffect(() => {
    loadItems();
  }, [loadItems]);

  // Persist local items
  useEffect(() => {
    const localOnly = items.filter((i) => String(i.id).startsWith("local-"));
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(localOnly));
    } catch (e) {
      console.warn("useProducts: localStorage set failed", e);
    }
  }, [items]);

  // CRUD
  const createItem = useCallback((data) => {
    const newItem = { ...data, id: `local-${Date.now()}` };
    setItems((prev) => [newItem, ...prev]);
  }, []);

  const updateItem = useCallback((id, data) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
  }, []);

  const replaceRemoteWithLocal = useCallback((id, data) => {
    const localId = `local-${Date.now()}`;
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data, id: localId } : p))
    );
  }, []);

  const deleteItem = useCallback((id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return {
    items,
    setItems,
    loading,
    error,
    refresh: loadItems,
    createItem,
    updateItem,
    replaceRemoteWithLocal,
    deleteItem,
  };
}
