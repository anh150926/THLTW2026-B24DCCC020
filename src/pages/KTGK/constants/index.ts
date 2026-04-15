import { ELoaiPhong, IPhongHoc } from '../types';

export const MAPPING_MAU_LOAI_PHONG: Record<ELoaiPhong, string> = {
	[ELoaiPhong.LyThuyet]: 'geekblue',
	[ELoaiPhong.ThucHanh]: 'cyan',
	[ELoaiPhong.HoiTruong]: 'magenta',
};

export const DS_LOAI_PHONG = [
	{ label: ELoaiPhong.LyThuyet, value: ELoaiPhong.LyThuyet },
	{ label: ELoaiPhong.ThucHanh, value: ELoaiPhong.ThucHanh },
	{ label: ELoaiPhong.HoiTruong, value: ELoaiPhong.HoiTruong },
];

export const DS_PHU_TRACH = [
	'Nguyễn Thanh Tùng',
	'Trần Thị Mai Hương',
	'Lê Quốc Bảo',
	'Phạm Thị Ngọc Ánh',
	'Hoàng Minh Đức',
];

export const NGƯỠNG_XOA_PHONG = 30;

export const DU_LIEU_BAN_DAU: IPhongHoc[] = [
	{
		id: 'ph_001',
		maPhong: 'A101',
		tenPhong: 'Phòng Lý thuyết 1',
		soChoNgoi: 50,
		loaiPhong: ELoaiPhong.LyThuyet,
		nguoiPhuTrach: 'Nguyễn Thanh Tùng',
	},
	{
		id: 'ph_002',
		maPhong: 'B201',
		tenPhong: 'Phòng Thực hành CNTT',
		soChoNgoi: 40,
		loaiPhong: ELoaiPhong.ThucHanh,
		nguoiPhuTrach: 'Trần Thị Mai Hương',
	},
	{
		id: 'ph_003',
		maPhong: 'C301',
		tenPhong: 'Hội trường A',
		soChoNgoi: 200,
		loaiPhong: ELoaiPhong.HoiTruong,
		nguoiPhuTrach: 'Lê Quốc Bảo',
	},
	{
		id: 'ph_004',
		maPhong: 'A102',
		tenPhong: 'Phòng Lý thuyết 2',
		soChoNgoi: 60,
		loaiPhong: ELoaiPhong.LyThuyet,
		nguoiPhuTrach: 'Phạm Thị Ngọc Ánh',
	},
	{
		id: 'ph_005',
		maPhong: 'B202',
		tenPhong: 'Phòng TH Điện tử',
		soChoNgoi: 25,
		loaiPhong: ELoaiPhong.ThucHanh,
		nguoiPhuTrach: 'Hoàng Minh Đức',
	},
	{
		id: 'ph_006',
		maPhong: 'A103',
		tenPhong: 'Phòng Tin học',
		soChoNgoi: 35,
		loaiPhong: ELoaiPhong.LyThuyet,
		nguoiPhuTrach: 'Nguyễn Thanh Tùng',
	},
	{
		id: 'ph_007',
		maPhong: 'C302',
		tenPhong: 'Hội trường B',
		soChoNgoi: 150,
		loaiPhong: ELoaiPhong.HoiTruong,
		nguoiPhuTrach: 'Trần Thị Mai Hương',
	},
	{
		id: 'ph_008',
		maPhong: 'B203',
		tenPhong: 'Phòng TH Vật lý',
		soChoNgoi: 20,
		loaiPhong: ELoaiPhong.ThucHanh,
		nguoiPhuTrach: 'Lê Quốc Bảo',
	},
];
