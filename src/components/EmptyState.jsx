// components/EmptyState.jsx
import React, { forwardRef } from "react";

/**
 * Simple empty state. ForwardRef used so parent can animate it with GSAP.
 */
const EmptyState = forwardRef(function EmptyState(_, ref) {
  return (
    <div
      ref={ref}
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
  );
});

export default EmptyState;
