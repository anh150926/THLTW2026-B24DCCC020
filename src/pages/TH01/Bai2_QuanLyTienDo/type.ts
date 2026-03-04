export interface MonHoc {
	id: string;
	tenMon: string;
}

export interface TienDo {
	id: string;
	monHocId: string;
	thoiGian: string;
	thoiLuong: number;
	noiDung: string;
	ghiChu?: string;
}

export interface MucTieu {
	id: string;
	monHocId: string | 'ALL';
	thang: string;
	thoiLuongMucTieu: number;
}
