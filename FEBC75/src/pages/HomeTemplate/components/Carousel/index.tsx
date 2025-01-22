
import "./Sass/sass.scss"; // Tạo file CSS riêng

export default function ServicesSection() {
  const services = [
    "Minimalist logo design",
    "Signature logo design",
    "Mascot logo design",
    "3d logo design",
    "Hand drawn logo design",
    "Vintage logo design",
    "Remove background",
    "Photo restoration",
    "Photo retouching",
    "Image resize",
    "Product label design",
    "Custom twitch overlay",
    "Custom twitch emotes",
    "Gaming logo",
    "Children book illustration",
    "Instagram design",
    "Movie poster design",
    "Box design",
    "Logo maker",
    "Logo Ideas",
  ];

  return (
    <div className="services-container">
      <h2 className="services-title">Services Related To Graphics & Design</h2>
      <div className="services-list">
        {services.map((service, index) => (
          <div key={index} className="service-item">
            {service}
          </div>
        ))}
      </div>
    </div>
  );
}
