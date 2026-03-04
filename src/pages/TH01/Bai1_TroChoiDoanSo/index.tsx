import React, { useState, useEffect } from 'react';
import { Card, Button, Progress, Row, Col, Tag, message } from 'antd';
import { ReloadOutlined, TrophyOutlined } from '@ant-design/icons';
import useLocalStorage from '../hooks/useLocalStorage';
import { FormDoanSo } from './components/FormDoanSo';
import { KetQuaLuotChoi } from './components/KetQuaLuotChoi';
import { LichSuDoan } from './components/LichSuDoan';

const Bai1_TroChoiDoanSo: React.FC = () => {
	const [soBiMat, setSoBiMat] = useState<number>(0);
	const [soDuDoan, setSoDuDoan] = useState<number | null>(null);
	const [lichSu, setLichSu] = useState<{ so: number; ketQua: string }[]>([]);
	const [trangThai, setTrangThai] = useState<'dang_choi' | 'thang' | 'thua'>('dang_choi');
	const [kyLuc, setKyLuc] = useLocalStorage<number>('TH01_Game_HighScore', 100);
	const [thongBao, setThongBao] = useState<{ msg: string; type: 'info' | 'success' | 'warning' | 'error' }>({
		msg: 'Hãy nhập số từ 1 đến 100!',
		type: 'info',
	});

	useEffect(() => {
		khoiTaoGame();
	}, []);

	const khoiTaoGame = () => {
		setSoBiMat(Math.floor(Math.random() * 100) + 1);
		setLichSu([]);
		setSoDuDoan(null);
		setTrangThai('dang_choi');
		setThongBao({ msg: 'Hệ thống đã sinh số mới. Bắt đầu!', type: 'info' });
	};

	const xuLyDoan = () => {
		if (soDuDoan === null) return;

		let ketQuaText = '';
		let trangThaiMoi = trangThai;
		const luotChoiHienTai = lichSu.length + 1;

		if (soDuDoan === soBiMat) {
			setThongBao({ msg: `Chính xác! Số đúng là ${soBiMat}`, type: 'success' });
			ketQuaText = 'Đúng';
			trangThaiMoi = 'thang';

			if (luotChoiHienTai < kyLuc) {
				setKyLuc(luotChoiHienTai);
				message.success(`Kỷ lục mới: ${luotChoiHienTai} lượt!`);
			}
		} else if (soDuDoan < soBiMat) {
			setThongBao({ msg: 'Thấp quá!', type: 'warning' });
			ketQuaText = 'Thấp';
		} else {
			setThongBao({ msg: 'Cao quá!', type: 'warning' });
			ketQuaText = 'Cao';
		}

		const itemMoi = { so: soDuDoan, ketQua: ketQuaText };
		const lichSuMoi = [itemMoi, ...lichSu];
		setLichSu(lichSuMoi);

		if (trangThaiMoi !== 'thang' && lichSuMoi.length >= 10) {
			setThongBao({ msg: `Thua rồi! Số đúng là ${soBiMat}`, type: 'error' });
			trangThaiMoi = 'thua';
		}
		setTrangThai(trangThaiMoi);
	};

	return (
		<Row justify='center'>
			<Col xs={24} md={12} lg={10}>
				<Card
					title='Trò Chơi Đoán Số'
					extra={
						<div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
							{kyLuc < 100 && (
								<Tag color='gold' icon={<TrophyOutlined />}>
									Kỷ lục: {kyLuc} lượt
								</Tag>
							)}
							{trangThai !== 'dang_choi' && (
								<Button icon={<ReloadOutlined />} onClick={khoiTaoGame}>
									Chơi lại
								</Button>
							)}
						</div>
					}
				>
					<KetQuaLuotChoi trangThai={trangThai} thongBao={thongBao.msg} loaiThongBao={thongBao.type} />
					<FormDoanSo
						soDuDoan={soDuDoan}
						setSoDuDoan={setSoDuDoan}
						xuLyDoan={xuLyDoan}
						dangChoi={trangThai === 'dang_choi'}
					/>

					<div style={{ marginTop: 10 }}>
						<Progress
							percent={lichSu.length * 10}
							status={lichSu.length >= 10 ? 'exception' : 'active'}
							showInfo={false}
						/>
					</div>

					<LichSuDoan lichSu={lichSu} />
				</Card>
			</Col>
		</Row>
	);
};

export default Bai1_TroChoiDoanSo;
