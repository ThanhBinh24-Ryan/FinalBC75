export type MenuLoaiCongViec = {
  id?:                number;
  tenLoaiCongViec?:   string;
  dsNhomChiTietLoai?: DsNhomChiTietLoai[];
}

export type DsNhomChiTietLoai = {
  id?:             number;
  tenNhom?:        string;
  hinhAnh?:        string;
  maLoaiCongviec?: number;
  dsChiTietLoai?:  DsChiTietLoai[];
}

export type DsChiTietLoai = {
  id?:         number;
  tenChiTiet?: string;
}
