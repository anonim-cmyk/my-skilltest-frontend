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
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1
        ref={(el) => (textRef.current[0] = el)}
        className="text-3xl font-display font-semibold"
      >
        About CampusStore
      </h1>
      <p
        ref={(el) => (textRef.current[1] = el)}
        className="mt-3 text-gray-600 leading-relaxed"
      >
        CampusStore is a minimal demo web app built as a skill test. It
        demonstrates responsive UI using React and Tailwind, product listing
        with search, and code organization.
      </p>
      <div ref={(el) => (textRef.current[2] = el)} className="mt-6">
        <h2 className="font-medium text-lg">Contact Customer Service</h2>
        <p className="mt-2 text-sm">
          Email:{" "}
          <a
            href="mailto:cs@campusstore.example"
            className="text-indigo-600 hover:underline"
          >
            cs@campusstore.example
          </a>
        </p>
        <p className="mt-1 text-sm">Phone/WA: +62 812-3456-7890</p>
      </div>
    </div>
  );
};

export default About;
