export enum LoaiDiemDen {
	BIEN = 'Biển',
	NUI = 'Núi',
	THANH_PHO = 'Thành phố',
	NONG_THON = 'Nông thôn',
	LICH_SU = 'Lịch sử',
}

export enum HangMucChiPhi {
	AN_UONG = 'Ăn uống',
	DI_CHUYEN = 'Di chuyển',
	LUU_TRU = 'Lưu trú',
	THAM_QUAN = 'Tham quan',
	MUA_SAM = 'Mua sắm',
	KHAC = 'Khác',
}

export interface DiemDen {
	id: string;
	tenDiemDen: string;
	hinhAnh: string;
	diaChi: string;
	loaiHinh: LoaiDiemDen;
	moTa: string;
	thoiGianThamQuan: number;
	rating: number;
	chiPhiAnUong: number;
	chiPhiLuuTru: number;
	chiPhiDiChuyen: number;
	chiPhiThamQuan: number;
	luotChon: number;
}

export interface NgayLichTrinh {
	ngay: number;
	diemDenIds: string[];
}

export interface LichTrinh {
	id: string;
	tenLichTrinh: string;
	ngayTao: string;
	nganSachTongThe: number;
	dsNgay: NgayLichTrinh[];
}
