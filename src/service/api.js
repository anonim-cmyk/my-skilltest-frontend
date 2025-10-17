const BASE = "https://fakestoreapi.com";

export async function fetchProduct() {
  const res = await fetch(`${BASE}/products`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}
