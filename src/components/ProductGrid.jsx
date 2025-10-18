import { useEffect, useRef } from "react";
import gsap from "gsap";
import ProductCard from "./ProductCard";

export default function ProductGrid({ items, onEdit, onDelete }) {
  const cardsRef = useRef([]);
  const hasAnimated = useRef(false);

  cardsRef.current = [];

  useEffect(() => {
    if (items.length > 0 && !hasAnimated.current) {
      hasAnimated.current = true;
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 80,
        duration: 1.1,
        stagger: 0.2,
        ease: "back.out(1.7)",
      });
    }
  }, [items]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item, i) => (
        <div key={item.id} ref={(el) => (cardsRef.current[i] = el)}>
          <ProductCard
            item={item}
            onEdit={() => onEdit(item)}
            onDelete={() => onDelete(item)}
          />
        </div>
      ))}
    </div>
  );
}
