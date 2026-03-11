import { VU_KHI, DANH_SACH_VU_KHI } from '../constants';

export const phanDinhThangThua = (nguoiChon: string): { mayChon: string; ketQua: string } => {
	const mayChon = DANH_SACH_VU_KHI[Math.floor(Math.random() * 3)];

	if (nguoiChon === mayChon) return { mayChon, ketQua: 'Hòa' };

	if (
		(nguoiChon === VU_KHI.KEO && mayChon === VU_KHI.BAO) ||
		(nguoiChon === VU_KHI.BUA && mayChon === VU_KHI.KEO) ||
		(nguoiChon === VU_KHI.BAO && mayChon === VU_KHI.BUA)
	) {
		return { mayChon, ketQua: 'Thắng' };
	}

	return { mayChon, ketQua: 'Thua' };
};
