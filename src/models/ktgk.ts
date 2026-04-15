import { useState, useCallback } from 'react';
import useLuuTru from '@/hooks/useLocalStorage';
import { IPhongHoc } from '@/pages/KTGK/types';
import { DU_LIEU_BAN_DAU } from '@/pages/KTGK/constants';

const STORAGE_KEY = 'ktgk_ds_phong_hoc';

export default () => {
	const [danhSach, setDanhSach] = useLuuTru<IPhongHoc[]>(STORAGE_KEY, DU_LIEU_BAN_DAU);
	const [modalMo, setModalMo] = useState(false);
	const [phongDangSua, setPhongDangSua] = useState<IPhongHoc | null>(null);

	const themPhong = useCallback(
		(phong: IPhongHoc) => {
			setDanhSach((prev) => [...prev, phong]);
		},
		[setDanhSach],
	);

	const suaPhong = useCallback(
		(phong: IPhongHoc) => {
			setDanhSach((prev) => prev.map((item) => (item.id === phong.id ? phong : item)));
		},
		[setDanhSach],
	);

	const xoaPhong = useCallback(
		(id: string) => {
			setDanhSach((prev) => prev.filter((item) => item.id !== id));
		},
		[setDanhSach],
	);

	return {
		danhSach,
		modalMo,
		setModalMo,
		phongDangSua,
		setPhongDangSua,
		themPhong,
		suaPhong,
		xoaPhong,
	};
};
