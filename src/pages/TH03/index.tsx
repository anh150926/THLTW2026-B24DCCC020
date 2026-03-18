import React from 'react';
import { Tabs } from 'antd';
import { TeamOutlined, CalendarOutlined, StarOutlined, BarChartOutlined } from '@ant-design/icons';
import { useTh03Model } from './hooks/useTh03Model';
import { TabNhanVienDichVu } from './components/TabNhanVienDichVu';
import { TabQuanLyLichHen } from './components/TabQuanLyLichHen';
import { TabDanhGia } from './components/TabDanhGia';
import { TabThongKe } from './components/TabThongKe';

const { TabPane } = Tabs;

const TH03_DatLichDichVu: React.FC = () => {
	const model = useTh03Model();

	return (
		<div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
			<h2 style={{ marginBottom: 20 }}>HỆ THỐNG ĐẶT LỊCH DỊCH VỤ (SPA/SALON)</h2>
			<Tabs defaultActiveKey='1' type='card' size='large'>
				<TabPane
					tab={
						<span>
							<TeamOutlined /> 1. Dịch Vụ & Nhân Viên
						</span>
					}
					key='1'
				>
					<TabNhanVienDichVu
						dsDichVu={model.dsDichVu}
						setDsDichVu={model.setDsDichVu}
						dsNhanVien={model.dsNhanVien}
						setDsNhanVien={model.setDsNhanVien}
						dsLichHen={model.dsLichHen}
					/>
				</TabPane>
				<TabPane
					tab={
						<span>
							<CalendarOutlined /> 2. Quản Lý Lịch Hẹn
						</span>
					}
					key='2'
				>
					<TabQuanLyLichHen
						dsLichHen={model.dsLichHen}
						setDsLichHen={model.setDsLichHen}
						dsDichVu={model.dsDichVu}
						dsNhanVien={model.dsNhanVien}
					/>
				</TabPane>
				<TabPane
					tab={
						<span>
							<StarOutlined /> 3. Khảo Sát & Đánh Giá
						</span>
					}
					key='3'
				>
					<TabDanhGia
						dsLichHen={model.dsLichHen}
						dsNhanVien={model.dsNhanVien}
						dsDanhGia={model.dsDanhGia}
						setDsDanhGia={model.setDsDanhGia}
					/>
				</TabPane>
				<TabPane
					tab={
						<span>
							<BarChartOutlined /> 4. Thống Kê Báo Cáo
						</span>
					}
					key='4'
				>
					<TabThongKe dsLichHen={model.dsLichHen} dsDichVu={model.dsDichVu} dsNhanVien={model.dsNhanVien} />
				</TabPane>
			</Tabs>
		</div>
	);
};

export default TH03_DatLichDichVu;
