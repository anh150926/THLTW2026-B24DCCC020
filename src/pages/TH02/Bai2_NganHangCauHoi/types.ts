export interface KhoiKienThuc {
	id: string;
	tenKhoi: string;
}
export interface MonHoc {
	maMon: string;
	tenMon: string;
	soTinChi: number;
}

export interface CauHoi {
	id: string;
	maCauHoi: string;
	maMon: string;
	noiDung: string;
	mucDo: string;
	khoiKienThucId: string;
	loaiCauHoi: 'Trắc nghiệm' | 'Tự luận';

	// Trắc nghiệm
	dapAnA?: string;
	dapAnB?: string;
	dapAnC?: string;
	dapAnD?: string;
	dapAnDung?: 'A' | 'B' | 'C' | 'D';

	//Tự luận
	dapAnTuLuan?: string;
}

export interface DieuKienCauTruc {
	khoiKienThucId: string;
	mucDo: string;
	soLuong: number;
}
export interface CauTrucDe {
	id: string;
	tenCauTruc: string;
	maMon: string;
	dieuKien: DieuKienCauTruc[];
}
export interface DeThi {
	id: string;
	tenDe: string;
	maMon: string;
	cauTrucId: string;
	danhSachCauHoi: CauHoi[];
	ngayTao: string;
}
