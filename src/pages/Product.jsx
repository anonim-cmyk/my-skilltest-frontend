import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import { fetchProduct } from "../service/api";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

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
  const hasAnimated = useRef(false); // ⬅️ flag biar animasi cuma sekali

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const api = await fetchProduct();
        const local = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        setItems([...local, ...api]);
      } catch (error) {
        console.error(error);
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

  // ✅ Animasi hanya sekali setelah data dimuat
  useEffect(() => {
    if (!loading && cardsRef.current.length > 0 && !hasAnimated.current) {
      hasAnimated.current = true; // pasang flag dulu biar cuma sekali

      // 🔧 pastikan ref sudah terisi penuh sebelum animasi
      requestAnimationFrame(() => {
        const ctx = gsap.context(() => {
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

          tl.from(cardsRef.current, {
            opacity: 0,
            y: 100,
            duration: 1.2,
            stagger: 0.25,
            ease: "back.out(1.7)", // efek bounce ringan
            immediateRender: false,
          });
        });
        return () => ctx.revert();
      });
    }
  }, [loading, items]);

  const onSearch = (e) => setQuery(e.target.value);

  const filtered = () => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        (i.title || "").toLowerCase().includes(q) ||
        (i.description || "").toLowerCase().includes(q)
    );
  };

  const handleAdd = () => {
    setEditing({ title: "", price: "", description: "", image: "" });
    setShowForm(true);
  };

  const handleSave = (data) => {
    if (String(editing?.id || "").startsWith("local-")) {
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
      // scroll halus ke form pakai GSAP
      if (formRef.current) {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: formRef.current, offsetY: 100 },
          ease: "power2.out",
        });
      } else {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 200);
  };

  const handleDelete = (item) => {
    if (!confirm("Delete this item?")) return;
    setItems((prev) => prev.filter((p) => p.id !== item.id));
  };

  return (
    <div className="px-6 md:px-12 mt-8 md:mt-12">
      {/* Search + Add */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={onSearch}
            placeholder="Search products..."
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <button
            onClick={() => setQuery("")}
            className="px-3 py-2 border rounded hover:bg-gray-50 transition"
          >
            Clear
          </button>
        </div>

        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Add Product
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div ref={formRef} className="mb-6">
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
        <div className="flex justify-center items-center h-48">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Reset refs setiap render */}
          {(() => (cardsRef.current = []))()}
          {filtered().map((item, i) => (
            <div key={item.id} ref={(el) => (cardsRef.current[i] = el)}>
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
