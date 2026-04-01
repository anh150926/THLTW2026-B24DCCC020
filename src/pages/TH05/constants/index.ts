import { GioiTinh, TrangThaiDon } from '../types';

export const GIOI_TINH_OPTIONS = [
	{ label: 'Nam', value: GioiTinh.NAM },
	{ label: 'Nữ', value: GioiTinh.NU },
	{ label: 'Khác', value: GioiTinh.KHAC },
];

export const TRANG_THAI_OPTIONS = [
	{ label: 'Chờ duyệt', value: TrangThaiDon.PENDING },
	{ label: 'Đã duyệt', value: TrangThaiDon.APPROVED },
	{ label: 'Từ chối', value: TrangThaiDon.REJECTED },
];

export const TRANG_THAI_COLOR: Record<TrangThaiDon, string> = {
	[TrangThaiDon.PENDING]: 'orange',
	[TrangThaiDon.APPROVED]: 'green',
	[TrangThaiDon.REJECTED]: 'red',
};

export const TRANG_THAI_TEXT: Record<TrangThaiDon, string> = {
	[TrangThaiDon.PENDING]: 'Chờ duyệt',
	[TrangThaiDon.APPROVED]: 'Đã duyệt',
	[TrangThaiDon.REJECTED]: 'Từ chối',
};
