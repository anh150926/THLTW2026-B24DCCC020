export enum ELoaiBaiTap {
	Cardio = 'Cardio',
	Strength = 'Strength',
	Yoga = 'Yoga',
	HIIT = 'HIIT',
	Other = 'Other',
}

export enum ETrangThaiBuoiTap {
	HoanThanh = 'Hoàn thành',
	BoLo = 'Bỏ lỡ',
}

export enum ENhomCo {
	Chest = 'Chest',
	Back = 'Back',
	Legs = 'Legs',
	Shoulders = 'Shoulders',
	Arms = 'Arms',
	Core = 'Core',
	FullBody = 'Full Body',
}

export enum EMucDoKho {
	De = 'Dễ',
	TrungBinh = 'Trung bình',
	Kho = 'Khó',
}

export enum ETrangThaiMucTieu {
	DangThucHien = 'Đang thực hiện',
	DaDat = 'Đã đạt',
	DaHuy = 'Đã hủy',
}

export enum ELoaiMucTieu {
	GiamCan = 'Giảm cân',
	TangCo = 'Tăng cơ',
	CaiThienSucBen = 'Cải thiện sức bền',
	Khac = 'Khác',
}

export interface IBuoiTap {
	id: string;
	ngay: string;
	loaiBaiTap: ELoaiBaiTap;
	thoiLuong: number;
	caloDot: number;
	ghiChu: string;
	trangThai: ETrangThaiBuoiTap;
}

export interface IChiSoSucKhoe {
	id: string;
	ngay: string;
	canNang: number;
	chieuCao: number;
	nhipTim: number;
	gioNgu: number;
}

export interface IMucTieu {
	id: string;
	tenMucTieu: string;
	loai: ELoaiMucTieu;
	giaTriMucTieu: number;
	giaTriHienTai: number;
	donVi: string;
	deadline: string;
	trangThai: ETrangThaiMucTieu;
}

export interface IBaiTap {
	id: string;
	tenBaiTap: string;
	nhomCo: ENhomCo;
	mucDoKho: EMucDoKho;
	moTaNgan: string;
	huongDan: string;
	caloDotTrungBinh: number;
}
