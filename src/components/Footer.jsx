const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-8 w-full">
      <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between">
        <div>
          © {new Date().getFullYear()} CampusStore — Simple demo for skill test
        </div>
        <div className="mt-2 md:mt-0">
          Contact:{" "}
          <a
            href="mailto:cs@campusstore.example"
            className="text-indigo-600 hover:underline"
          >
            cs@campusstore.example
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
