const ProductCard = ({ item, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col h-full gap-3 transform transition hover:-translate-y-1 hover:shadow-lg">
      {/* Gambar */}
      <div className="w-full aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
        <img
          src={item.image || "https://via.placeholder.com/150"}
          alt={item.title}
          className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Judul & Deskripsi */}
      <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">
        {item.title}
      </h3>
      <p className="text-xs text-gray-500 line-clamp-3 flex-1">
        {item.description}
      </p>

      {/* Footer */}
      <div className="mt-2 flex justify-between items-center">
        <div className="text-indigo-600 font-semibold">${item.price}</div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(item)}
            className="px-2 py-1 text-xs bg-indigo-50 text-indigo-700 rounded hover:bg-indigo-100 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(item)}
            className="px-2 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
