import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const homeRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.8, ease: "power3.out" },
    });

    // Animasi utama: elemen muncul satu per satu
    tl.fromTo(
      homeRef.current.querySelector("h1"),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1 }
    )
      .fromTo(
        homeRef.current.querySelector("p"),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=0.4" // mulai sedikit lebih awal dari animasi sebelumnya
      )
      .fromTo(
        homeRef.current.querySelectorAll("a"),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2 },
        "-=0.3"
      )
      .fromTo(
        homeRef.current.querySelector("img"),
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1 },
        "-=0.5"
      )
      .fromTo(
        homeRef.current.querySelectorAll("li"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15 },
        "-=0.3"
      );
  }, []);

  return (
    <div ref={homeRef} className="space-y-8 px-8">
      {/* Hero Section */}
      <section className="hero-bg rounded-lg p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-semibold">
            CampusStore — Simple campus product catalog
          </h1>

          <p className="mt-3 text-gray-600">
            A minimal landing page + product listing. Built with React +
            Tailwind. Features search, responsive UI, and a small local CRUD
            demo for adding sample products.
          </p>

          <div className="mt-4 flex gap-3">
            <Link
              to="/products"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              View Products
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 border rounded hover:bg-gray-50 transition"
            >
              About
            </Link>
          </div>
        </div>

        <div className="w-full md:w-1/3">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=8b8f0c6a9b"
            alt="hero"
            className="rounded shadow-md"
          />
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-xl font-semibold">What you get</h2>
        <ul className="mt-3 grid md:grid-cols-3 gap-4">
          <li className="p-4 border rounded">
            Responsive pages: Home, Products, About
          </li>
          <li className="p-4 border rounded">Shared Navbar & Footer</li>
          <li className="p-4 border rounded">
            Products listing with search + CRUD (local)
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
