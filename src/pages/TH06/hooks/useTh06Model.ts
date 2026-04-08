import useLocalStorage from './useLocalStorage';
import { DiemDen, LichTrinh } from '../types';
import { SAMPLE_DESTINATIONS } from '../constants';

export const useTh06Model = () => {
	const [dsDiemDen, setDsDiemDen] = useLocalStorage<DiemDen[]>('TH06_DiemDen', SAMPLE_DESTINATIONS);
	const [dsLichTrinh, setDsLichTrinh] = useLocalStorage<LichTrinh[]>('TH06_LichTrinh', []);

	return {
		dsDiemDen,
		setDsDiemDen,
		dsLichTrinh,
		setDsLichTrinh,
	};
};
