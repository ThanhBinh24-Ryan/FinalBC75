import "./Sass/sass.scss";

export default function Section() {
  return (
    <section className="category-section">
      {/* Header Section */}
      <div className="header flex items-center justify-center h-screen  ">
        <div className="header-content text-center">
        <h1>Graphics & Design</h1>
        <p>Designs to make you stand out.</p>
        <button className="cta-button">How Fiverr Works</button>
        </div>
      </div>

      {/* Categories Section */}
      <div className="categories">
        <h2>Most popular in Graphics & Design</h2>
        <div className="category-list ">
          {/* Thủ công từng danh mục */}
          <div className="category-item">
            <span className="icon bg-black text-white p-3 rounded-md"><i className=" fa-solid fa-a"></i></span>
            <span>Minimalist Logo Design</span>
            <span className="arrow">→</span>
          </div>
          <div className="category-item">
            <span className="icon">🏠</span>
            <span>Architecture & Interior Design</span>
            <span className="arrow">→</span>
          </div>
          <div className="category-item">
            <span className="icon">🖌️</span>
            <span>Image Editing</span>
            <span className="arrow">→</span>
          </div>
          <div className="category-item">
            <span className="icon">🐒</span>
            <span>NFT Art</span>
            <span className="arrow">→</span>
          </div>
          <div className="category-item">
            <span className="icon">👕</span>
            <span>T-Shirts & Merchandise</span>
            <span className="arrow">→</span>
          </div>
        </div>
      </div>
    </section>
  );
}
