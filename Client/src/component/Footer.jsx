import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 px-4 text-sm">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <h3 className="font-semibold text-base mb-2">Find Your Accommodation</h3>
        </div>
        <div>
          <h3 className="font-semibold text-base mb-2">Navigation</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-base mb-2">Others</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Application Guide</a></li>
            <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-base mb-2">Contact Us</h3>
          <p>Rajapur, Pabna Sadar, Pabna - 6600</p>
          <p>+88016789347843</p>
          <p>support.pusthall@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
