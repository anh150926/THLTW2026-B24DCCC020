import useLocalStorage from './useLocalStorage';
import { DichVu, NhanVien, LichHen, DanhGia } from '../types';

export const useTh03Model = () => {
	const [dsDichVu, setDsDichVu] = useLocalStorage<DichVu[]>('TH03_DichVu', []);
	const [dsNhanVien, setDsNhanVien] = useLocalStorage<NhanVien[]>('TH03_NhanVien', []);
	const [dsLichHen, setDsLichHen] = useLocalStorage<LichHen[]>('TH03_LichHen', []);
	const [dsDanhGia, setDsDanhGia] = useLocalStorage<DanhGia[]>('TH03_DanhGia', []);

	return {
		dsDichVu,
		setDsDichVu,
		dsNhanVien,
		setDsNhanVien,
		dsLichHen,
		setDsLichHen,
		dsDanhGia,
		setDsDanhGia,
	};
};
