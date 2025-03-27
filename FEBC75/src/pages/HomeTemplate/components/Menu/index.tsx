import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListMenu } from "./slide";
import { RootState, AppDispatch } from "./../../../../store";
import { useNavigate } from "react-router-dom";
import "./Sass/sass.scss"; // Keep if custom SCSS is still needed

const MenuBar: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error } = useSelector(
    (state: RootState) => state.listMenuReducer
  );
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchListMenu());
  }, [dispatch]);

  const handleMenuClick = (id: number) => {
    setSelectedMenuId(id === selectedMenuId ? null : id); // Toggle submenu visibility
  };

  const handleDetailClick = (id: number) => {
    navigate(`/detailType/${id}`); // Navigate to detail page
  };

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Error: {error.message || "Something went wrong!"}
      </div>
    );
  }

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4 justify-items-center">
          {data?.map((item) => (
            <li key={item.id} className="w-full text-center">
              {/* Menu Item */}
              <button
                onClick={() => handleMenuClick(item.id)}
                className="w-full py-2 text-gray-800 font-semibold hover:text-indigo-600 transition-colors focus:outline-none"
              >
                {item.tenLoaiCongViec}
              </button>

              {/* Submenu (Dropdown) */}
              {selectedMenuId === item.id && (
                <div className="absolute left-0 w-full bg-white border-t border-gray-200 shadow-lg z-10 mt-2">
                  <div className="container mx-auto px-4 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {item.dsNhomChiTietLoai.map((nhom) => (
                      <div key={nhom.id} className="submenu-item">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          {nhom.tenNhom}
                        </h3>
                        <ul className="space-y-2">
                          {nhom.dsChiTietLoai.map((chiTiet) => (
                            <li key={chiTiet.id}>
                              <button
                                onClick={() => handleDetailClick(chiTiet.id)}
                                className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors w-full text-left"
                              >
                                {chiTiet.tenChiTiet}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default MenuBar;
