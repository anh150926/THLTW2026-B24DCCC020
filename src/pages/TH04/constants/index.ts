import { KieuDuLieu } from '../types';

export const KIEU_DU_LIEU_OPTIONS = [
	{ label: 'Chuỗi ký tự (String)', value: KieuDuLieu.STRING },
	{ label: 'Số (Number)', value: KieuDuLieu.NUMBER },
	{ label: 'Ngày (Date)', value: KieuDuLieu.DATE },
];

export const TRUONG_MAC_DINH = ['Số vào sổ', 'Số hiệu văn bằng', 'Mã sinh viên', 'Họ tên', 'Ngày sinh'];

export const KIEU_COLOR: Record<KieuDuLieu, string> = {
	[KieuDuLieu.STRING]: 'blue',
	[KieuDuLieu.NUMBER]: 'green',
	[KieuDuLieu.DATE]: 'orange',
};
