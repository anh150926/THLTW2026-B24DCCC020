import useLocalStorage from './useLocalStorage';
import type { IBuoiTap, IChiSoSucKhoe, IMucTieu, IBaiTap } from '../types';
import { DU_LIEU_BUOI_TAP, DU_LIEU_CHI_SO, DU_LIEU_MUC_TIEU, DU_LIEU_BAI_TAP } from '../constants';

export const useTh08Model = () => {
	const [dsBuoiTap, setDsBuoiTap] = useLocalStorage<IBuoiTap[]>('TH08_BuoiTap', DU_LIEU_BUOI_TAP);
	const [dsChiSo, setDsChiSo] = useLocalStorage<IChiSoSucKhoe[]>('TH08_ChiSo', DU_LIEU_CHI_SO);
	const [dsMucTieu, setDsMucTieu] = useLocalStorage<IMucTieu[]>('TH08_MucTieu', DU_LIEU_MUC_TIEU);
	const [dsBaiTap, setDsBaiTap] = useLocalStorage<IBaiTap[]>('TH08_BaiTap', DU_LIEU_BAI_TAP);

	return {
		dsBuoiTap,
		setDsBuoiTap,
		dsChiSo,
		setDsChiSo,
		dsMucTieu,
		setDsMucTieu,
		dsBaiTap,
		setDsBaiTap,
	};
};
