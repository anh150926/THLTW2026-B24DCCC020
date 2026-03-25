export enum KieuDuLieu {
	STRING = 'String',
	NUMBER = 'Number',
	DATE = 'Date',
}

export interface SoVanBang {
	id: string;
	nam: number;
	moTa: string;
}

export interface QuyetDinhTotNghiep {
	id: string;
	soQD: string;
	ngayBanHanh: string;
	trichYeu: string;
	soVanBangId: string;
	luotTraCuu: number;
}

export interface TruongThongTin {
	id: string;
	tenTruong: string;
	kieuDuLieu: KieuDuLieu;
}

export interface ThongTinVanBang {
	id: string;
	soVaoSo: number;
	soHieuVanBang: string;
	maSinhVien: string;
	hoTen: string;
	ngaySinh: string;
	quyetDinhId: string;
	truongDongMap: Record<string, any>;
}

export interface ThamSoTraCuu {
	soHieuVanBang?: string;
	soVaoSo?: string;
	maSinhVien?: string;
	hoTen?: string;
	ngaySinh?: string;
}
