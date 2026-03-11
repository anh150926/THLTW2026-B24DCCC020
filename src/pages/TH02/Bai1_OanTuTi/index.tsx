import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Alert, Button, Popconfirm } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { ChonVuKhi } from './components/ChonVuKhi';
import { LichSuOanTuTi } from './components/LichSuOanTuTi';
import useLocalStorage from '../hooks/useLocalStorage';
import { phanDinhThangThua } from '../utils/gameLogic';

const Bai1_OanTuTi: React.FC = () => {
	const [lichSu, setLichSu] = useLocalStorage<any[]>('TH02_OanTuTi', []);
	const [thongBao, setThongBao] = useState<{ msg: string; type: 'success' | 'info' | 'error' | 'warning' } | null>(
		null,
	);

	const xuLyTranDau = (nguoiChon: string) => {
		const { mayChon, ketQua } = phanDinhThangThua(nguoiChon);
		const msgType = ketQua === 'Thắng' ? 'success' : ketQua === 'Hòa' ? 'warning' : 'error';

		setThongBao({ msg: `Bạn chọn ${nguoiChon}, Máy chọn ${mayChon}. Bạn ${ketQua}!`, type: msgType });

		const luotMoi = { id: Date.now().toString(), luot: lichSu.length + 1, nguoi: nguoiChon, may: mayChon, ketQua };
		setLichSu([luotMoi, ...lichSu]);
	};

	const xuLyReset = () => {
		setLichSu([]);
		setThongBao(null);
	};

	const soThang = lichSu.filter((x: any) => x.ketQua === 'Thắng').length;
	const soThua = lichSu.filter((x: any) => x.ketQua === 'Thua').length;

	return (
		<Row justify='center'>
			<Col xs={24} md={16} lg={12}>
				<Card
					title='Oẳn Tù Tì'
					extra={
						<Popconfirm title='Bạn có chắc muốn xóa hết lịch sử chơi?' onConfirm={xuLyReset}>
							<Button danger size='small' icon={<ReloadOutlined />}>
								Chơi lại từ đầu
							</Button>
						</Popconfirm>
					}
				>
					<Row gutter={16} style={{ marginBottom: 20 }}>
						<Col span={12}>
							<Statistic title='Thắng' value={soThang} valueStyle={{ color: '#3f8600' }} />
						</Col>
						<Col span={12}>
							<Statistic title='Thua' value={soThua} valueStyle={{ color: '#cf1322' }} />
						</Col>
					</Row>
					{thongBao && <Alert message={thongBao.msg} type={thongBao.type} showIcon style={{ marginBottom: 20 }} />}
					<ChonVuKhi xuLyChon={xuLyTranDau} />
					<LichSuOanTuTi duLieu={lichSu} />
				</Card>
			</Col>
		</Row>
	);
};

export default Bai1_OanTuTi;
