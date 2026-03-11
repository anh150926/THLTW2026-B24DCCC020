import useLocalStorage from './useLocalStorage';
import { KhoiKienThuc, MonHoc, CauHoi, CauTrucDe, DeThi } from '../Bai2_NganHangCauHoi/types';

export const useNganHang = () => {
	const [dsKhoi, setDsKhoi] = useLocalStorage<KhoiKienThuc[]>('TH02_KhoiKienThuc', []);
	const [dsMon, setDsMon] = useLocalStorage<MonHoc[]>('TH02_MonHoc', []);
	const [dsCauHoi, setDsCauHoi] = useLocalStorage<CauHoi[]>('TH02_CauHoi', []);
	const [dsCauTruc, setDsCauTruc] = useLocalStorage<CauTrucDe[]>('TH02_CauTruc', []);
	const [dsDeThi, setDsDeThi] = useLocalStorage<DeThi[]>('TH02_DeThi', []);

	return {
		dsKhoi,
		setDsKhoi,
		dsMon,
		setDsMon,
		dsCauHoi,
		setDsCauHoi,
		dsCauTruc,
		setDsCauTruc,
		dsDeThi,
		setDsDeThi,
	};
};
