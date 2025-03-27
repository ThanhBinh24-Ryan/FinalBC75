import React from "react";

const ResponsiveLayout = () => {
  return (
    <div className="bg-gray-50 p-6 container mx-auto">
      {/* Footer Layout */}
      <footer className="mt-12 border-t border-gray-200 pt-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-start">
          {/* Categories Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 tracking-wide">
              Categories
            </h3>
            <ul className="space-y-3">
              {[
                "Graphics & Design",
                "Digital Marketing",
                "Writing & Translation",
                "Video & Animation",
                "Music & Audio",
                "Programming & Tech",
                "Data",
                "Business",
                "Lifestyle",
                "Sitemap",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-green-600 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 tracking-wide">
              About
            </h3>
            <ul className="space-y-3">
              {[
                "Careers",
                "Press & News",
                "Partnerships",
                "Privacy Policy",
                "Terms of Service",
                "Intellectual Property Claims",
                "Investor Relations",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-green-600 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 tracking-wide">
              Support
            </h3>
            <ul className="space-y-3">
              {[
                "Help & Support",
                "Trust & Safety",
                "Selling on Fiverr",
                "Buying on Fiverr",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-green-600 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 tracking-wide">
              Community
            </h3>
            <ul className="space-y-3">
              {[
                "Events",
                "Blog",
                "Forum",
                "Community Standards",
                "Podcast",
                "Affiliates",
                "Invite a Friend",
                "Become a Seller",
                "Fiverr Elevate",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-green-600 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* More From Fiverr Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 tracking-wide">
              More From Fiverr
            </h3>
            <ul className="space-y-3">
              {[
                "Fiverr Business",
                "Fiverr Pro",
                "Fiverr Studios",
                "Fiverr Logo Maker",
                "Get Inspired",
                "ClearVoice",
                "AND CO",
                "Learn",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-green-600 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
          <div className="flex items-center space-x-3">
            <span
              className="text-xl font-extrabold text-gray-800 tracking-tight"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Fiverr
            </span>
            <p>© Fiverr International Ltd. 2021</p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              <i className="fab fa-facebook-f text-lg"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-400 transition-colors duration-200"
            >
              <i className="fab fa-twitter text-lg"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-700 transition-colors duration-200"
            >
              <i className="fab fa-linkedin-in text-lg"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-500 transition-colors duration-200"
            >
              <i className="fab fa-instagram text-lg"></i>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-red-600 transition-colors duration-200"
            >
              <i className="fab fa-youtube text-lg"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResponsiveLayout;
