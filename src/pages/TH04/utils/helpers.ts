import { SoVanBang, QuyetDinhTotNghiep, ThongTinVanBang } from '../types';

export const countVanBangTrongSo = (
	soId: string,
	dsQuyetDinh: QuyetDinhTotNghiep[],
	dsVanBang: ThongTinVanBang[]
): number => {
	const qdIdsTrongSo = dsQuyetDinh.filter((q) => q.soVanBangId === soId).map((q) => q.id);
	return dsVanBang.filter((v) => qdIdsTrongSo.includes(v.quyetDinhId)).length;
};

export const getNextSoVaoSo = (
	soId: string,
	dsQuyetDinh: QuyetDinhTotNghiep[],
	dsVanBang: ThongTinVanBang[]
): number => {
	const qdIdsTrongSo = dsQuyetDinh.filter((q) => q.soVanBangId === soId).map((q) => q.id);
	const dsVbTrongSo = dsVanBang.filter((v) => qdIdsTrongSo.includes(v.quyetDinhId));
	return dsVbTrongSo.length > 0 ? Math.max(...dsVbTrongSo.map((v) => v.soVaoSo)) + 1 : 1;
};

export const countLuotTraCuuCuaSo = (
	soId: string,
	dsQuyetDinh: QuyetDinhTotNghiep[]
): number => {
	return dsQuyetDinh.filter((q) => q.soVanBangId === soId).reduce((sum, q) => sum + q.luotTraCuu, 0);
};

export const getSoVanBangName = (
	soId: string,
	dsSoVanBang: SoVanBang[]
): string => {
	const so = dsSoVanBang.find((s) => s.id === soId);
	return so ? `Năm ${so.nam}` : '-';
};

export const getQuyetDinhName = (
	qdId: string,
	dsQuyetDinh: QuyetDinhTotNghiep[]
): string => {
	const qd = dsQuyetDinh.find((q) => q.id === qdId);
	return qd ? qd.soQD : '-';
};
