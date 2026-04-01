export enum GioiTinh {
	NAM = 'Nam',
	NU = 'Nữ',
	KHAC = 'Khác',
}

export enum TrangThaiDon {
	PENDING = 'Pending',
	APPROVED = 'Approved',
	REJECTED = 'Rejected',
}

export interface CauLacBo {
	id: string;
	anhDaiDien: any;
	tenCLB: string;
	ngayThanhLap: string;
	moTa: string;
	chuNhiem: string;
	hoatDong: boolean;
}

export interface DonDangKy {
	id: string;
	hoTen: string;
	email: string;
	sdt: string;
	gioiTinh: GioiTinh;
	diaChi: string;
	soTruong: string;
	cauLacBoId: string;
	lyDoDangKy: string;
	trangThai: TrangThaiDon;
	ghiChu: string;
	ngayDangKy: string;
}

export interface LichSuThaoTac {
	id: string;
	donDangKyId: string;
	hanhDong: TrangThaiDon;
	thoiGian: string;
	lyDo: string;
	nguoiThucHien: string;
}
