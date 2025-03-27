import "./Sass/sass.scss";

export default function Section() {
  return (
    <section className="category-section">
      {/* Header Section */}
      <div
        className="header flex items-center justify-center h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="header-content text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Graphics & Design
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-6">
            Designs to make you stand out.
          </p>
          <button className="cta-button bg-green-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-green-600 transition-colors duration-200">
            How Fiverr Works
          </button>
        </div>
      </div>

      {/* Categories Section */}
      <div className="categories container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Most Popular in Graphics & Design
        </h2>
        <div className="category-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            { icon: "fa-solid fa-a", label: "Minimalist Logo Design" },
            {
              icon: "fa-solid fa-building",
              label: "Architecture & Interior Design",
            },
            { icon: "fa-solid fa-paintbrush", label: "Image Editing" },
            { icon: "fa-solid fa-coins", label: "NFT Art" },
            { icon: "fa-solid fa-shirt", label: "T-Shirts & Merchandise" },
          ].map((category, index) => (
            <div
              key={index}
              className="category-item flex items-center gap-3 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <span className="icon bg-green-500 text-white p-3 rounded-md">
                <i className={category.icon}></i>
              </span>
              <span className="text-gray-800 font-medium flex-grow">
                {category.label}
              </span>
              <span className="arrow text-gray-500 group-hover:text-green-500 transition-colors duration-200">
                →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
