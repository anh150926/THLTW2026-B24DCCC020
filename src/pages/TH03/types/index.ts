export enum TrangThaiLich {
	CHO_DUYET = 'Chờ duyệt',
	XAC_NHAN = 'Xác nhận',
	HOAN_THANH = 'Hoàn thành',
	HUY = 'Hủy',
}

export interface DichVu {
	id: string;
	tenDichVu: string;
	giaTien: number;
	thoiGianPhut: number;
}

export interface NhanVien {
	id: string;
	tenNhanVien: string;
	gioBatDau: string;
	gioKetThuc: string;
	gioiHanKhach: number;
	/** Mảng số ngày làm việc: 0=CN, 1=T2, 2=T3, 3=T4, 4=T5, 5=T6, 6=T7 */
	ngayLamViec: number[];
}

export interface LichHen {
	id: string;
	tenKhachHang: string;
	soDienThoai: string;
	dichVuId: string;
	nhanVienId: string;
	ngayDat: string;
	gioBatDau: string;
	gioKetThuc: string;
	trangThai: TrangThaiLich;
}

export interface DanhGia {
	id: string;
	lichHenId: string;
	nhanVienId: string;
	soSao: number;
	nhanXet: string;
	phanHoiNhanVien?: string;
	ngayDanhGia: string;
}
