import { SoVanBang, QuyetDinhTotNghiep, ThongTinVanBang } from '../types';

/**
 * Đếm số lượng văn bằng đã phát hành trong 1 sổ
 */
export const countVanBangTrongSo = (
	soId: string,
	dsQuyetDinh: QuyetDinhTotNghiep[],
	dsVanBang: ThongTinVanBang[]
): number => {
	const qdIdsTrongSo = dsQuyetDinh.filter((q) => q.soVanBangId === soId).map((q) => q.id);
	return dsVanBang.filter((v) => qdIdsTrongSo.includes(v.quyetDinhId)).length;
};

/**
 * Lấy số vào sổ tiếp theo tự động tăng theo từng sổ văn bằng
 */
export const getNextSoVaoSo = (
	soId: string,
	dsQuyetDinh: QuyetDinhTotNghiep[],
	dsVanBang: ThongTinVanBang[]
): number => {
	const qdIdsTrongSo = dsQuyetDinh.filter((q) => q.soVanBangId === soId).map((q) => q.id);
	const dsVbTrongSo = dsVanBang.filter((v) => qdIdsTrongSo.includes(v.quyetDinhId));
	return dsVbTrongSo.length > 0 ? Math.max(...dsVbTrongSo.map((v) => v.soVaoSo)) + 1 : 1;
};

/**
 * Thống kê lượt tra cứu của 1 sổ (tổng luợt tra cứu của tất cả quyết định trong sổ đó)
 */
export const countLuotTraCuuCuaSo = (
	soId: string,
	dsQuyetDinh: QuyetDinhTotNghiep[]
): number => {
	return dsQuyetDinh.filter((q) => q.soVanBangId === soId).reduce((sum, q) => sum + q.luotTraCuu, 0);
};

/**
 * Lấy string hiển thị tên Sổ văn bằng từ ID
 */
export const getSoVanBangName = (
	soId: string,
	dsSoVanBang: SoVanBang[]
): string => {
	const so = dsSoVanBang.find((s) => s.id === soId);
	return so ? `Năm ${so.nam}` : '-';
};

/**
 * Láy string hiển thị số QĐ từ ID
 */
export const getQuyetDinhName = (
	qdId: string,
	dsQuyetDinh: QuyetDinhTotNghiep[]
): string => {
	const qd = dsQuyetDinh.find((q) => q.id === qdId);
	return qd ? qd.soQD : '-';
};
