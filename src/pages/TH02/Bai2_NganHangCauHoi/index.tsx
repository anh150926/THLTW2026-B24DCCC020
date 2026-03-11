import React from 'react';
import { Tabs, message } from 'antd';
import { useNganHang } from '../hooks/useNganHang';
import { KhoiKienThuc, MonHoc, CauHoi, CauTrucDe, DeThi } from './types';
import { TabDanhMuc } from './components/TabDanhMuc';
import { TabCauHoi } from './components/TabCauHoi';
import { TabDeThi } from './components/TabDeThi';

const { TabPane } = Tabs;

const Bai2_NganHangCauHoi: React.FC = () => {
	const { dsKhoi, setDsKhoi, dsMon, setDsMon, dsCauHoi, setDsCauHoi, dsCauTruc, setDsCauTruc, dsDeThi, setDsDeThi } =
		useNganHang();
	// logic lưu
	const xuLyLuuKhoi = (k: KhoiKienThuc) => {
		const idx = dsKhoi.findIndex((x) => x.id === k.id);
		if (idx >= 0) {
			const newData = [...dsKhoi];
			newData[idx] = k;
			setDsKhoi(newData);
		} else {
			setDsKhoi([k, ...dsKhoi]);
		}
		message.success('Đã lưu khối kiến thức!');
	};

	const xuLyLuuMon = (m: MonHoc) => {
		const idx = dsMon.findIndex((x) => x.maMon === m.maMon);
		if (idx >= 0) {
			const newData = [...dsMon];
			newData[idx] = m;
			setDsMon(newData);
		} else {
			if (dsMon.some((x) => x.maMon === m.maMon)) {
				message.error('Mã môn học này đã tồn tại!');
				return;
			}
			setDsMon([m, ...dsMon]);
		}
		message.success('Đã lưu môn học!');
	};

	const xuLyLuuCauHoi = (c: CauHoi) => {
		const idx = dsCauHoi.findIndex((x) => x.id === c.id);
		if (idx >= 0) {
			const newData = [...dsCauHoi];
			newData[idx] = c;
			setDsCauHoi(newData);
		} else {
			setDsCauHoi([c, ...dsCauHoi]);
		}
		message.success('Đã lưu câu hỏi!');
	};

	const xuLyLuuCauTruc = (ct: CauTrucDe) => {
		const idx = dsCauTruc.findIndex((x) => x.id === ct.id);
		if (idx >= 0) {
			const newData = [...dsCauTruc];
			newData[idx] = ct;
			setDsCauTruc(newData);
		} else {
			setDsCauTruc([ct, ...dsCauTruc]);
		}
		message.success('Đã lưu cấu trúc đề thi!');
	};

	// logic xóa
	const xuLyXoaKhoi = (id: string) => {
		// Ktra xem có câu hỏi nào đang dùng khối này k
		if (dsCauHoi.some((c) => c.khoiKienThucId === id)) {
			message.error('Không thể xóa! Đang có câu hỏi thuộc khối kiến thức này.');
			return;
		}
		setDsKhoi(dsKhoi.filter((k) => k.id !== id));
		message.success('Đã xóa khối kiến thức.');
	};

	const xuLyXoaMon = (maMon: string) => {
		// Ktra xem có câu hỏi hoặc cấu trúc đề nào đang dùng môn này không
		if (dsCauHoi.some((c) => c.maMon === maMon) || dsCauTruc.some((ct) => ct.maMon === maMon)) {
			message.error('Không thể xóa! Đang có câu hỏi hoặc đề thi thuộc môn học này.');
			return;
		}
		setDsMon(dsMon.filter((m) => m.maMon !== maMon));
		message.success('Đã xóa môn học.');
	};

	const xuLyXoaCauTruc = (id: string) => {
		// Ktra xem có đề thi nào được sinh ra từ cấu trúc này không
		if (dsDeThi.some((dt) => dt.cauTrucId === id)) {
			message.error('Không thể xóa! Đã có đề thi được sinh ra từ cấu trúc này.');
			return;
		}
		setDsCauTruc(dsCauTruc.filter((ct) => ct.id !== id));
		message.success('Đã xóa cấu trúc đề.');
	};

	return (
		<div style={{ padding: 20 }}>
			<Tabs defaultActiveKey='1' type='card'>
				<TabPane tab='1. Quản Lý Danh Mục' key='1'>
					<TabDanhMuc
						dsKhoi={dsKhoi}
						dsMon={dsMon}
						luuKhoi={xuLyLuuKhoi}
						xoaKhoi={xuLyXoaKhoi}
						luuMon={xuLyLuuMon}
						xoaMon={xuLyXoaMon}
					/>
				</TabPane>

				<TabPane tab='2. Ngân Hàng Câu Hỏi' key='2'>
					<TabCauHoi
						dsCauHoi={dsCauHoi}
						dsMon={dsMon}
						dsKhoi={dsKhoi}
						luuCauHoi={xuLyLuuCauHoi}
						xoaCauHoi={(id: string) => {
							setDsCauHoi(dsCauHoi.filter((c) => c.id !== id));
							message.success('Đã xóa câu hỏi.');
						}}
					/>
				</TabPane>

				<TabPane tab='3. Sinh Đề Thi' key='3'>
					<TabDeThi
						dsCauTruc={dsCauTruc}
						dsDeThi={dsDeThi}
						dsMon={dsMon}
						dsKhoi={dsKhoi}
						dsCauHoi={dsCauHoi}
						luuCauTruc={xuLyLuuCauTruc}
						xoaCauTruc={xuLyXoaCauTruc}
						luuDeThi={(dt: DeThi) => setDsDeThi([dt, ...dsDeThi])}
					/>
				</TabPane>
			</Tabs>
		</div>
	);
};
export default Bai2_NganHangCauHoi;
