import useLocalStorage from './useLocalStorage';
import { CauLacBo, DonDangKy, LichSuThaoTac } from '../types';

export const useTh05Model = () => {
	const [dsCauLacBo, setDsCauLacBo] = useLocalStorage<CauLacBo[]>('TH05_CauLacBo', []);
	const [dsDonDangKy, setDsDonDangKy] = useLocalStorage<DonDangKy[]>('TH05_DonDangKy', []);
	const [dsLichSu, setDsLichSu] = useLocalStorage<LichSuThaoTac[]>('TH05_LichSu', []);

	return {
		dsCauLacBo,
		setDsCauLacBo,
		dsDonDangKy,
		setDsDonDangKy,
		dsLichSu,
		setDsLichSu,
	};
};
