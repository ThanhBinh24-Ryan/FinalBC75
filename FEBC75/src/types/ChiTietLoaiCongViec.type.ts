export type ChiTietLoaiCongViec = {
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
