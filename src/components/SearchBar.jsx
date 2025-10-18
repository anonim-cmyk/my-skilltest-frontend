export default function SearchBar({ query, setQuery, onAdd }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-10 bg-white/80 backdrop-blur-md rounded-2xl shadow p-4 md:p-6">
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="🔍 Search products..."
          className="flex-1 sm:flex-none border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="px-3 py-2 border rounded-xl hover:bg-gray-100 transition"
            aria-label="Clear search"
          >
            Clear
          </button>
        )}
      </div>

      <button
        onClick={onAdd}
        className="px-5 py-2 bg-green-600 text-white font-medium rounded-xl shadow hover:bg-green-700 transition-transform transform hover:scale-105"
      >
        + Add Product
      </button>
    </div>
  );
}
