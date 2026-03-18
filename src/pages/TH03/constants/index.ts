import { TrangThaiLich } from '../types';

export const LIST_TRANG_THAI = Object.values(TrangThaiLich);

export const TRANG_THAI_COLOR: Record<TrangThaiLich, string> = {
	[TrangThaiLich.CHO_DUYET]: 'orange',
	[TrangThaiLich.XAC_NHAN]: 'blue',
	[TrangThaiLich.HOAN_THANH]: 'green',
	[TrangThaiLich.HUY]: 'red',
};

export const NGAY_TRONG_TUAN = [
	{ label: 'CN', value: 0 },
	{ label: 'T2', value: 1 },
	{ label: 'T3', value: 2 },
	{ label: 'T4', value: 3 },
	{ label: 'T5', value: 4 },
	{ label: 'T6', value: 5 },
	{ label: 'T7', value: 6 },
];
