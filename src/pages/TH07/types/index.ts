export enum ETrangThai {
	BanNhap = 'Nháp',
	DaDang = 'Đã đăng',
}

export interface IThe {
	id: string;
	tenThe: string;
}

export interface IBaiViet {
	id: string;
	tieuDe: string;
	slug: string;
	tomTat: string;
	noiDung: string;
	anhDaiDien: string;
	tacGia: string;
	ngayDang: string;
	trangThai: ETrangThai;
	dsTheId: string[];
	luotXem: number;
}
