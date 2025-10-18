import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const homeRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.8, ease: "power3.out" },
    });

    tl.fromTo(
      homeRef.current.querySelector("h1"),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1 }
    )
      .fromTo(
        homeRef.current.querySelector("p"),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=0.4"
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
    <div
      ref={homeRef}
      className="space-y-16 px-4 md:px-12 py-12 bg-gradient-to-b from-indigo-50 to-white text-gray-800"
    >
      {/* Hero Section */}
      <section className="rounded-3xl flex flex-col md:flex-row items-center gap-10 md:gap-16 bg-white/70 backdrop-blur-md shadow-lg p-8 md:p-12">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            CampusStore — Your Modern Campus Product Catalog
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed">
            Discover a clean, modern catalog app built with React and Tailwind.
            Enjoy seamless navigation, a responsive design, and a mini local
            CRUD demo for managing your own product list.
          </p>

          <div className="flex gap-4">
            <Link
              to="/products"
              className="px-5 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition-transform transform hover:scale-105"
            >
              View Products
            </Link>
            <Link
              to="/about"
              className="px-5 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition-transform transform hover:scale-105"
            >
              About
            </Link>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=8b8f0c6a9b"
            alt="hero"
            className="rounded-2xl shadow-2xl w-full md:w-4/5 object-cover"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
          ✨ What You Get
        </h2>

        <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <li className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg text-indigo-600 mb-2">
              Responsive Layout
            </h3>
            <p>Beautifully designed pages for Home, Products, and About.</p>
          </li>

          <li className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg text-indigo-600 mb-2">
              Shared Components
            </h3>
            <p>Consistent Navbar and Footer across all pages.</p>
          </li>

          <li className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg text-indigo-600 mb-2">
              Local CRUD System
            </h3>
            <p>Manage your sample products with smooth local CRUD features.</p>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
