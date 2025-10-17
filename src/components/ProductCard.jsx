const ProductCard = ({ item, onEdit, onDelete }) => {
  return (
    <div className="border rounded-lg p-4 flex flex-col">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-44 object-contain mb-3"
      />
      <h3 className="font-medium text-sm mb-1">{item.title}</h3>
      <p className="text-xs text-gray-500 mb-3 line-clamp-3">
        {item.description}
      </p>
      <div className="mt-auto flex items-center justify-between">
        <div className="text-indigo-600 font-semibold">${item.price}</div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(item)}
            className="text-xs px-2 py-1 border rounded cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(item)}
            className="text-xs px-2 py-1 border rounded text-red-600 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
