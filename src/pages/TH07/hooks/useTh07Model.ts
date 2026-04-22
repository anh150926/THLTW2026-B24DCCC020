import useLocalStorage from './useLocalStorage';
import { IBaiViet, IThe } from '../types';
import { DS_BAI_VIET_BAN_DAU, DS_THE_BAN_DAU } from '../constants';

export const useTh07Model = () => {
	const [dsBaiViet, setDsBaiViet] = useLocalStorage<IBaiViet[]>('TH07_BaiViet', DS_BAI_VIET_BAN_DAU);
	const [dsThe, setDsThe] = useLocalStorage<IThe[]>('TH07_The', DS_THE_BAN_DAU);

	return {
		dsBaiViet,
		setDsBaiViet,
		dsThe,
		setDsThe,
	};
};
