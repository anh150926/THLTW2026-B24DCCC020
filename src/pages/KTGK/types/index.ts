export enum ELoaiPhong {
	LyThuyet = 'Lý thuyết',
	ThucHanh = 'Thực hành',
	HoiTruong = 'Hội trường',
}

export interface IPhongHoc {
	id: string;
	maPhong: string;
	tenPhong: string;
	soChoNgoi: number;
	loaiPhong: ELoaiPhong;
	nguoiPhuTrach: string;
}
