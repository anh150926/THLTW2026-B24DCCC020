import { IPhongHoc } from '../types';
import { NGƯỠNG_XOA_PHONG } from '../constants';

export function kiemTraTrungLap(
	giaTri: string,
	danhSach: IPhongHoc[],
	truong: keyof Pick<IPhongHoc, 'maPhong' | 'tenPhong'>,
	boQuaId?: string,
): boolean {
	const giaTriNormalized = giaTri.trim().toLowerCase();
	return danhSach.some(
		(item) => item[truong].toLowerCase() === giaTriNormalized && item.id !== boQuaId,
	);
}

export function coTheXoaPhong(phong: IPhongHoc): boolean {
	return phong.soChoNgoi < NGƯỠNG_XOA_PHONG;
}

export function taoIdPhongHoc(): string {
	return `ph_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
}
