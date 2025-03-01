import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © {currentYear} Tech Store. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="/about" className="text-sm hover:text-gray-300">
              About Us
            </a>
            <a href="/contact" className="text-sm hover:text-gray-300">
              Contact
            </a>
            <a href="/privacy" className="text-sm hover:text-gray-300">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
