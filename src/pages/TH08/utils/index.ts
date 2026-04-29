import { IBuoiTap, ETrangThaiBuoiTap } from '../types';
import moment from 'moment';

export function taoId(): string {
	return `th08_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
}

export function tinhBMI(canNang: number, chieuCaoCm: number): number {
	const chieuCaoM = chieuCaoCm / 100;
	if (chieuCaoM <= 0) return 0;
	return Number((canNang / (chieuCaoM * chieuCaoM)).toFixed(1));
}

export function phanLoaiBMI(bmi: number): { text: string; color: string } {
	if (bmi < 18.5) return { text: 'Thiếu cân', color: 'blue' };
	if (bmi < 25) return { text: 'Bình thường', color: 'green' };
	if (bmi < 30) return { text: 'Thừa cân', color: 'gold' };
	return { text: 'Béo phì', color: 'red' };
}

export function tinhStreak(dsBuoiTap: IBuoiTap[]): number {
	const dsNgay = [
		...new Set(
			dsBuoiTap
				.filter((bt) => bt.trangThai === ETrangThaiBuoiTap.HoanThanh)
				.map((bt) => moment(bt.ngay).format('YYYY-MM-DD')),
		),
	].sort((a, b) => b.localeCompare(a));

	let streak = 0;
	let ngayKiemTra = moment().startOf('day');

	for (const ngay of dsNgay) {
		const diff = ngayKiemTra.diff(moment(ngay).startOf('day'), 'days');
		if (diff <= 1) {
			streak++;
			ngayKiemTra = moment(ngay).startOf('day');
		} else {
			break;
		}
	}
	return streak;
}

export function tinhTongBuoiTapThang(dsBuoiTap: IBuoiTap[]): number {
	const dauThang = moment().startOf('month');
	const cuoiThang = moment().endOf('month');
	return dsBuoiTap.filter(
		(bt) =>
			bt.trangThai === ETrangThaiBuoiTap.HoanThanh &&
			moment(bt.ngay).isBetween(dauThang, cuoiThang, undefined, '[]'),
	).length;
}

export function tinhTongCaloThang(dsBuoiTap: IBuoiTap[]): number {
	const dauThang = moment().startOf('month');
	const cuoiThang = moment().endOf('month');
	return dsBuoiTap
		.filter(
			(bt) =>
				bt.trangThai === ETrangThaiBuoiTap.HoanThanh &&
				moment(bt.ngay).isBetween(dauThang, cuoiThang, undefined, '[]'),
		)
		.reduce((sum, bt) => sum + bt.caloDot, 0);
}

export function tinhBuoiTapTheoTuan(dsBuoiTap: IBuoiTap[]): number[] {
	const dauThang = moment().startOf('month');
	const cuoiThang = moment().endOf('month');
	const result = [0, 0, 0, 0];

	dsBuoiTap
		.filter(
			(bt) =>
				bt.trangThai === ETrangThaiBuoiTap.HoanThanh &&
				moment(bt.ngay).isBetween(dauThang, cuoiThang, undefined, '[]'),
		)
		.forEach((bt) => {
			const ngayTrongThang = moment(bt.ngay).date();
			const tuan = Math.min(Math.floor((ngayTrongThang - 1) / 7), 3);
			result[tuan]++;
		});

	return result;
}

export function tinhPhanTramMucTieu(mucTieu: number, hienTai: number): number {
	if (mucTieu <= 0) return 0;
	return Math.min(Math.round((hienTai / mucTieu) * 100), 100);
}
