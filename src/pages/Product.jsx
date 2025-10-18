import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import { fetchProduct } from "../service/api";

gsap.registerPlugin(ScrollToPlugin);

const STORAGE_KEY = "local_products_v1";

const Product = () => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const cardsRef = useRef([]);
  const formRef = useRef(null);
  const hasAnimated = useRef(false);
  const emptyRef = useRef(null);

  // Load data
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const api = await fetchProduct();
        const local = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        setItems([...local, ...api]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    const localOnly = items.filter((i) => String(i.id).startsWith("local-"));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(localOnly));
  }, [items]);

  // Animasi cards
  useEffect(() => {
    if (!loading && cardsRef.current.length > 0 && !hasAnimated.current) {
      hasAnimated.current = true;
      requestAnimationFrame(() => {
        const ctx = gsap.context(() => {
          gsap.from(cardsRef.current, {
            opacity: 0,
            y: 80,
            duration: 1.1,
            stagger: 0.2,
            ease: "back.out(1.7)",
          });
        });
        return () => ctx.revert();
      });
    }
  }, [loading, items]);

  // Animasi empty state
  useEffect(() => {
    if (emptyRef.current) {
      gsap.fromTo(
        emptyRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }
  });

  const onSearch = (e) => setQuery(e.target.value);
  const filteredItems = items.filter(
    (i) =>
      i.title.toLowerCase().includes(query.toLowerCase()) ||
      i.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleAdd = () => {
    setEditing({ title: "", price: "", description: "", image: "" });
    setShowForm(true);
  };

  const handleSave = (data) => {
    if (editing?.id?.startsWith("local-")) {
      setItems((prev) =>
        prev.map((p) => (p.id === editing.id ? { ...p, ...data } : p))
      );
    } else if (editing && editing.id) {
      const localId = `local-${Date.now()}`;
      setItems((prev) =>
        prev.map((p) =>
          p.id === editing.id ? { ...p, ...data, id: localId } : p
        )
      );
    } else {
      const newItem = { ...data, id: `local-${Date.now()}` };
      setItems((prev) => [newItem, ...prev]);
    }
    setShowForm(false);
    setEditing(null);
  };

  const handleEdit = (item) => {
    setEditing(item);
    setShowForm(true);
    setTimeout(() => {
      formRef.current &&
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: formRef.current, offsetY: 100 },
          ease: "power2.out",
        });
    }, 200);
  };

  const handleDelete = (item) => {
    if (!confirm("Delete this item?")) return;
    setItems((prev) => prev.filter((p) => p.id !== item.id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white px-6 md:px-12 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          🛍️ Product Catalog
        </h1>
        <p className="text-gray-600 mt-2">
          Browse, search, and manage your campus products easily.
        </p>
      </div>

      {/* Search + Add */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-10 bg-white/80 backdrop-blur-md rounded-2xl shadow p-4 md:p-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <input
            value={query}
            onChange={onSearch}
            placeholder="🔍 Search products..."
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="px-4 py-2 border rounded-xl hover:bg-gray-100 transition mt-2 sm:mt-0 sm:ml-2 w-full sm:w-auto"
            >
              Clear
            </button>
          )}
        </div>

        <button
          onClick={handleAdd}
          className="px-5 py-2 bg-green-600 text-white font-medium rounded-xl shadow hover:bg-green-700 transition-transform transform hover:scale-105 mt-2 sm:mt-0"
        >
          + Add Product
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div ref={formRef} className="mb-10">
          <ProductForm
            initial={editing}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditing(null);
            }}
          />
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center h-56">
          <div className="w-14 h-14 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredItems.length === 0 ? (
        <div
          ref={emptyRef}
          className="flex flex-col justify-center items-center h-64 text-center text-gray-500"
        >
          <div className="text-5xl mb-4">🧐</div>
          <p className="text-lg font-medium text-gray-700">
            Tidak ada produk ditemukan
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Coba gunakan kata kunci lain atau tambahkan produk baru ✨
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
          {(() => (cardsRef.current = []))()}
          {filteredItems.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="h-full"
            >
              <ProductCard
                item={item}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;
