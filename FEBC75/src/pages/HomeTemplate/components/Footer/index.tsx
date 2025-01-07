

const ResponsiveLayout = () => {
  return (
    <div className="bg-white p-6 container mx-auto">
      {/* Footer Layout */}
      <footer className="mt-12 border-t border-gray-300 pt-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center ">
          {/* Categories Section */}
          <div className="">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600">Graphics & Design</li>
              <li className="text-sm text-gray-600">Digital Marketing</li>
              <li className="text-sm text-gray-600">Writing & Translation</li>
              <li className="text-sm text-gray-600">Video & Animation</li>
              <li className="text-sm text-gray-600">Music & Audio</li>
              <li className="text-sm text-gray-600">Programming & Tech</li>
              <li className="text-sm text-gray-600">Data</li>
              <li className="text-sm text-gray-600">Business</li>
              <li className="text-sm text-gray-600">Lifestyle</li>
              <li className="text-sm text-gray-600">Sitemap</li>
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">About</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600">Careers</li>
              <li className="text-sm text-gray-600">Press & News</li>
              <li className="text-sm text-gray-600">Partnerships</li>
              <li className="text-sm text-gray-600">Privacy Policy</li>
              <li className="text-sm text-gray-600">Terms of Service</li>
              <li className="text-sm text-gray-600">Intellectual Property Claims</li>
              <li className="text-sm text-gray-600">Investor Relations</li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Support</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600">Help & Support</li>
              <li className="text-sm text-gray-600">Trust & Safety</li>
              <li className="text-sm text-gray-600">Selling on Fiverr</li>
              <li className="text-sm text-gray-600">Buying on Fiverr</li>
            </ul>
          </div>

          {/* Community Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Community</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600">Events</li>
              <li className="text-sm text-gray-600">Blog</li>
              <li className="text-sm text-gray-600">Forum</li>
              <li className="text-sm text-gray-600">Community Standards</li>
              <li className="text-sm text-gray-600">Podcast</li>
              <li className="text-sm text-gray-600">Affiliates</li>
              <li className="text-sm text-gray-600">Invite a Friend</li>
              <li className="text-sm text-gray-600">Become a Seller</li>
              <li className="text-sm text-gray-600">Fiverr Elevate</li>
            </ul>
          </div>

          {/* More From Fiverr Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">More From Fiverr</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600">Fiverr Business</li>
              <li className="text-sm text-gray-600">Fiverr Pro</li>
              <li className="text-sm text-gray-600">Fiverr Studios</li>
              <li className="text-sm text-gray-600">Fiverr Logo Maker</li>
              <li className="text-sm text-gray-600">Get Inspired</li>
              <li className="text-sm text-gray-600">ClearVoice</li>
              <li className="text-sm text-gray-600">AND CO</li>
              <li className="text-sm text-gray-600">Learn</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-200 pt-4 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
          <p>© Fiverr International Ltd. 2021</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-linkedin-in"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-youtube"></i>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResponsiveLayout;
