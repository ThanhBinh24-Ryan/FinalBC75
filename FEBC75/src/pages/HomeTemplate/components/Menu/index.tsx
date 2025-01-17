import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListMenu } from "./slide"; // Import action fetchListMenu
import { RootState, AppDispatch } from "./../../../../store"; // Import kiểu RootState từ store của bạn
import "./Sass/sass.scss"; // Import file CSS nếu cần

const MenuBar: React.FC = () => {
  const dispatch:AppDispatch = useDispatch();
  const { data, error } = useSelector((state: RootState) => state.listMenuReducer);

  // Gọi API khi component được mount
    useEffect(() => {
        dispatch(fetchListMenu());
    }, [dispatch]);


  // Render trạng thái lỗi
  if (error) {
    return <div>Error: {error.message || "Something went wrong!"}</div>;
  }

  // Render menu
  return (
    <nav className="menu-bar container justify-items-center border-b  border-t border-gray-200">
      <ul className="menu-list">
        {data &&
          data.map((item) => (
            <li key={item.id} className="menu-item">
              {item.tenLoaiCongViec}
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default MenuBar;
