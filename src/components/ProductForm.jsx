import { useEffect, useState } from "react";

const ProductForm = ({ initial, onSave, onCancel }) => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });
  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  function update(k, v) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }
  return (
    <div className="p-4 border rounded bg-white">
      <label className="block text-xs">
        Title
        <input
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          className="mt-1 block w-full border rounded px-2 py-1 text-sm"
        />
      </label>
      <label className="block text-xs mt-2">
        Price
        <input
          value={form.price}
          onChange={(e) => update("price", e.target.value)}
          className="mt-1 block w-full border rounded px-2 py-1 text-sm"
        />
      </label>
      <label className="block text-xs mt-2">
        Image URL
        <input
          value={form.image}
          onChange={(e) => update("image", e.target.value)}
          className="mt-1 block w-full border rounded px-2 py-1 text-sm"
        />
      </label>
      <label className="block text-xs mt-2">
        Description
        <textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          className="mt-1 block w-full border rounded px-2 py-1 text-sm"
          rows="3"
        />
      </label>
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onSave(form)}
          className="px-3 py-1 bg-indigo-600 text-white rounded cursor-pointer"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-3 py-1 border rounded cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
