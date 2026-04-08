import { DiemDen, LichTrinh, HangMucChiPhi } from '../types';
import * as XLSX from 'xlsx';

/** Lookup điểm đến theo id */
export const getDiemDenById = (id: string, dsDiemDen: DiemDen[]): DiemDen | undefined => {
	return dsDiemDen.find((d) => d.id === id);
};

/** Tính tổng chi phí 1 điểm đến */
export const tongChiPhiDiemDen = (dd: DiemDen): number => {
	return dd.chiPhiAnUong + dd.chiPhiLuuTru + dd.chiPhiDiChuyen + dd.chiPhiThamQuan;
};

/** Tính tổng chi phí toàn bộ lịch trình */
export const tinhTongChiPhi = (lichTrinh: LichTrinh, dsDiemDen: DiemDen[]): number => {
	let tong = 0;
	lichTrinh.dsNgay.forEach((ngay) => {
		ngay.diemDenIds.forEach((id) => {
			const dd = getDiemDenById(id, dsDiemDen);
			if (dd) tong += tongChiPhiDiemDen(dd);
		});
	});
	return tong;
};

/** Tính chi phí theo từng hạng mục */
export const tinhChiPhiTheoHangMuc = (
	lichTrinh: LichTrinh,
	dsDiemDen: DiemDen[],
): Record<string, number> => {
	const result: Record<string, number> = {
		[HangMucChiPhi.AN_UONG]: 0,
		[HangMucChiPhi.DI_CHUYEN]: 0,
		[HangMucChiPhi.LUU_TRU]: 0,
		[HangMucChiPhi.THAM_QUAN]: 0,
		[HangMucChiPhi.MUA_SAM]: 0,
		[HangMucChiPhi.KHAC]: 0,
	};

	lichTrinh.dsNgay.forEach((ngay) => {
		ngay.diemDenIds.forEach((id) => {
			const dd = getDiemDenById(id, dsDiemDen);
			if (dd) {
				result[HangMucChiPhi.AN_UONG] += dd.chiPhiAnUong;
				result[HangMucChiPhi.DI_CHUYEN] += dd.chiPhiDiChuyen;
				result[HangMucChiPhi.LUU_TRU] += dd.chiPhiLuuTru;
				result[HangMucChiPhi.THAM_QUAN] += dd.chiPhiThamQuan;
			}
		});
	});

	return result;
};

/** Tính tổng thời gian tham quan cho 1 ngày */
export const tinhThoiGianNgay = (diemDenIds: string[], dsDiemDen: DiemDen[]): number => {
	let tong = 0;
	diemDenIds.forEach((id) => {
		const dd = getDiemDenById(id, dsDiemDen);
		if (dd) tong += dd.thoiGianThamQuan;
	});
	// Thêm ~1h di chuyển giữa mỗi 2 điểm
	if (diemDenIds.length > 1) tong += (diemDenIds.length - 1) * 1;
	return tong;
};

/** Tính chi phí cho 1 ngày */
export const tinhChiPhiNgay = (diemDenIds: string[], dsDiemDen: DiemDen[]): number => {
	let tong = 0;
	diemDenIds.forEach((id) => {
		const dd = getDiemDenById(id, dsDiemDen);
		if (dd) tong += tongChiPhiDiemDen(dd);
	});
	return tong;
};

/** Format tiền VND */
export const formatTienVND = (amount: number): string => {
	return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

/** Format số ngắn gọn */
export const formatSoNganGon = (amount: number): string => {
	if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}M`;
	if (amount >= 1000) return `${(amount / 1000).toFixed(0)}K`;
	return amount.toString();
};

/** Export dữ liệu ra XLSX */
export const exportToXLSX = (data: Record<string, any>[], fileName: string): void => {
	const ws = XLSX.utils.json_to_sheet(data);
	const wb = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, ws, 'DuLieu');
	XLSX.writeFile(wb, `${fileName}.xlsx`);
};

/** Format ngày tạo */
export const formatDateTime = (isoString: string): string => {
	const d = new Date(isoString);
	const pad = (n: number) => n.toString().padStart(2, '0');
	return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

/** Lấy tháng/năm từ ISO string */
export const getThangNam = (isoString: string): string => {
	const d = new Date(isoString);
	return `T${d.getMonth() + 1}/${d.getFullYear()}`;
};
