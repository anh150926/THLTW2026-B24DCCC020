import React from 'react';
import { Tabs } from 'antd';
import {
	DashboardOutlined,
	CalendarOutlined,
	HeartOutlined,
	TrophyOutlined,
	ThunderboltOutlined,
} from '@ant-design/icons';
import { useTh08Model } from './hooks/useTh08Model';
import TabDashboard from './components/TabDashboard';
import TabNhatKyTapLuyen from './components/TabNhatKyTapLuyen';
import TabChiSoSucKhoe from './components/TabChiSoSucKhoe';
import TabMucTieu from './components/TabMucTieu';
import TabThuVienBaiTap from './components/TabThuVienBaiTap';

const { TabPane } = Tabs;

const TH08_TheDucSucKhoe: React.FC = () => {
	const model = useTh08Model();

	return (
		<div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
			<h2 style={{ marginBottom: 20 }}>ỨNG DỤNG THỂ DỤC & THEO DÕI SỨC KHỎE</h2>
			<Tabs defaultActiveKey='1' type='card' size='large'>
				<TabPane
					tab={<span><DashboardOutlined /> 1. Dashboard</span>}
					key='1'
				>
					<TabDashboard
						dsBuoiTap={model.dsBuoiTap}
						dsChiSo={model.dsChiSo}
						dsMucTieu={model.dsMucTieu}
					/>
				</TabPane>

				<TabPane
					tab={<span><CalendarOutlined /> 2. Nhật Ký Tập Luyện</span>}
					key='2'
				>
					<TabNhatKyTapLuyen
						dsBuoiTap={model.dsBuoiTap}
						setDsBuoiTap={model.setDsBuoiTap}
					/>
				</TabPane>

				<TabPane
					tab={<span><HeartOutlined /> 3. Chỉ Số Sức Khỏe</span>}
					key='3'
				>
					<TabChiSoSucKhoe
						dsChiSo={model.dsChiSo}
						setDsChiSo={model.setDsChiSo}
					/>
				</TabPane>

				<TabPane
					tab={<span><TrophyOutlined /> 4. Mục Tiêu</span>}
					key='4'
				>
					<TabMucTieu
						dsMucTieu={model.dsMucTieu}
						setDsMucTieu={model.setDsMucTieu}
					/>
				</TabPane>

				<TabPane
					tab={<span><ThunderboltOutlined /> 5. Thư Viện Bài Tập</span>}
					key='5'
				>
					<TabThuVienBaiTap
						dsBaiTap={model.dsBaiTap}
						setDsBaiTap={model.setDsBaiTap}
					/>
				</TabPane>
			</Tabs>
		</div>
	);
};

export default TH08_TheDucSucKhoe;
