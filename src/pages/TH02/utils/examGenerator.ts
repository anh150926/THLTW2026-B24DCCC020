import { CauTrucDe, CauHoi, KhoiKienThuc } from '../Bai2_NganHangCauHoi/types';

export const sinhDeThiTuDong = (
	cauTruc: CauTrucDe,
	dsCauHoi: CauHoi[],
	dsKhoi: KhoiKienThuc[],
): { thanhCong: boolean; data?: CauHoi[]; thongBao: string } => {
	let danhSachChon: CauHoi[] = [];

	for (const dk of cauTruc.dieuKien) {
		const cauHoiPhuHop = dsCauHoi.filter(
			(c) => c.maMon === cauTruc.maMon && c.mucDo === dk.mucDo && c.khoiKienThucId === dk.khoiKienThucId,
		);

		if (cauHoiPhuHop.length < dk.soLuong) {
			const tenKhoi = dsKhoi.find((k) => k.id === dk.khoiKienThucId)?.tenKhoi || 'Không xác định';
			return {
				thanhCong: false,
				thongBao: `Lỗi: Không đủ câu hỏi cho khối [${tenKhoi}], mức độ [${dk.mucDo}]. Cần ${dk.soLuong}, hiện có ${cauHoiPhuHop.length}.`,
			};
		}

		const shuffled = [...cauHoiPhuHop].sort(() => 0.5 - Math.random());
		danhSachChon = danhSachChon.concat(shuffled.slice(0, dk.soLuong));
	}

	return { thanhCong: true, data: danhSachChon, thongBao: 'Sinh đề thành công' };
};
