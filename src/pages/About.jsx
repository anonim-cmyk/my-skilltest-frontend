import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const About = () => {
  const textRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-6 py-16">
      <div className="max-w-2xl bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 md:p-12 space-y-6 text-gray-800">
        <h1
          ref={(el) => (textRef.current[0] = el)}
          className="text-4xl font-bold text-gray-900 font-display"
        >
          About <span className="text-indigo-600">CampusStore</span>
        </h1>

        <p
          ref={(el) => (textRef.current[1] = el)}
          className="text-gray-600 leading-relaxed text-lg"
        >
          <strong>CampusStore</strong> is a minimal, elegant demo web app
          created as part of a frontend skill test. It demonstrates responsive
          UI built with{" "}
          <span className="font-medium text-indigo-600">React</span> and{" "}
          <span className="font-medium text-indigo-600">Tailwind CSS</span>,
          product listings with search, and clean component organization.
        </p>

        <div
          ref={(el) => (textRef.current[2] = el)}
          className="mt-8 bg-gradient-to-r from-indigo-100 to-indigo-50 rounded-2xl p-6 shadow-inner"
        >
          <h2 className="font-semibold text-lg text-gray-800 mb-2">
            📞 Contact Customer Service
          </h2>
          <p className="text-sm text-gray-700">
            Email:{" "}
            <a
              href="mailto:cs@campusstore.example"
              className="text-indigo-600 hover:underline font-medium"
            >
              cs@campusstore.example
            </a>
          </p>
          <p className="mt-1 text-sm text-gray-700">
            Phone / WA:{" "}
            <span className="font-medium text-indigo-600">
              +62 812-3456-7890
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
