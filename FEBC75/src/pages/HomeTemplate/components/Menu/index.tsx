import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListMenu } from "./slide"; // Import action fetchListMenu
import { RootState, AppDispatch } from "./../../../../store"; // Import kiểu RootState từ store của bạn
import { useNavigate } from "react-router-dom"; // Import hook điều hướng
import "./Sass/sass.scss"; // Import file CSS nếu cần

const MenuBar: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate(); // Sử dụng navigate để điều hướng
  const { data, error } = useSelector((state: RootState) => state.listMenuReducer);

  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchListMenu());
  }, [dispatch]);

  const handleMenuClick = (id: number) => {
    setSelectedMenuId(id === selectedMenuId ? null : id); // Toggle menu
  };

  const handleDetailClick = (id: number) => {
    navigate(`/detailType/${id}`); // Điều hướng đến trang detailType với id
  };

  if (error) {
    return <div>Error: {error.message || "Something went wrong!"}</div>;
  }

  return (
    <nav className="menu-bar container justify-items-center border-b ">
      <ul className="menu-list">
        {data &&
          data.map((item) => (
            <li key={item.id} className="menu-item">
              {/* Tên loại công việc */}
              <div onClick={() => handleMenuClick(item.id)} className="cursor-pointer">
                {item.tenLoaiCongViec}
              </div>

              {/* Hiển thị danh sách nhóm và chi tiết nếu được chọn */}
              {selectedMenuId === item.id && (
                <ul className="submenu-list pl-4">
                  {item.dsNhomChiTietLoai.map((nhom) => (
                    <li key={nhom.id} className="submenu-item">
                      <strong>{nhom.tenNhom}</strong>
                      <ul className="detail-list pl-4">
                        {nhom.dsChiTietLoai.map((chiTiet) => (
                          <li
                            key={chiTiet.id}
                            className="detail-item cursor-pointer"
                            onClick={() => handleDetailClick(chiTiet.id)} // Chuyển hướng đến trang detailType
                          >
                            {chiTiet.tenChiTiet}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default MenuBar;
