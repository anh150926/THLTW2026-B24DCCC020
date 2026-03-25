import useLocalStorage from './useLocalStorage';
import { SoVanBang, QuyetDinhTotNghiep, TruongThongTin, ThongTinVanBang } from '../types';

export const useTh04Model = () => {
	const [dsSoVanBang, setDsSoVanBang] = useLocalStorage<SoVanBang[]>('TH04_SoVanBang', []);
	const [dsQuyetDinh, setDsQuyetDinh] = useLocalStorage<QuyetDinhTotNghiep[]>('TH04_QuyetDinh', []);
	const [dsTruongThongTin, setDsTruongThongTin] = useLocalStorage<TruongThongTin[]>('TH04_TruongThongTin', []);
	const [dsVanBang, setDsVanBang] = useLocalStorage<ThongTinVanBang[]>('TH04_VanBang', []);

	return {
		dsSoVanBang,
		setDsSoVanBang,
		dsQuyetDinh,
		setDsQuyetDinh,
		dsTruongThongTin,
		setDsTruongThongTin,
		dsVanBang,
		setDsVanBang,
	};
};
