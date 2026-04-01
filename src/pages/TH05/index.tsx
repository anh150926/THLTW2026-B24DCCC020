import React from 'react';
import { Tabs } from 'antd';
import {
	TeamOutlined,
	SolutionOutlined,
	UserOutlined,
	BarChartOutlined,
} from '@ant-design/icons';
import { useTh05Model } from './hooks/useTh05Model';
import { TabDanhSachCLB } from './components/TabDanhSachCLB';
import { TabDonDangKy } from './components/TabDonDangKy';
import { TabThanhVien } from './components/TabThanhVien';
import { TabThongKe } from './components/TabThongKe';

const { TabPane } = Tabs;

const TH05_QuanLyCLB: React.FC = () => {
	const model = useTh05Model();

	return (
		<div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
			<h2 style={{ marginBottom: 20 }}>HỆ THỐNG QUẢN LÝ CÂU LẠC BỘ VÀ ĐĂNG KÝ THAM GIA</h2>
			<Tabs defaultActiveKey='1' type='card' size='large'>
				<TabPane
					tab={
						<span>
							<TeamOutlined /> 1. Danh Sách CLB
						</span>
					}
					key='1'
				>
					<TabDanhSachCLB
						dsCauLacBo={model.dsCauLacBo}
						setDsCauLacBo={model.setDsCauLacBo}
						dsDonDangKy={model.dsDonDangKy}
					/>
				</TabPane>

				<TabPane
					tab={
						<span>
							<SolutionOutlined /> 2. Đơn Đăng Ký
						</span>
					}
					key='2'
				>
					<TabDonDangKy
						dsDonDangKy={model.dsDonDangKy}
						setDsDonDangKy={model.setDsDonDangKy}
						dsCauLacBo={model.dsCauLacBo}
						dsLichSu={model.dsLichSu}
						setDsLichSu={model.setDsLichSu}
					/>
				</TabPane>

				<TabPane
					tab={
						<span>
							<UserOutlined /> 3. Thành Viên CLB
						</span>
					}
					key='3'
				>
					<TabThanhVien
						dsCauLacBo={model.dsCauLacBo}
						dsDonDangKy={model.dsDonDangKy}
						setDsDonDangKy={model.setDsDonDangKy}
					/>
				</TabPane>

				<TabPane
					tab={
						<span>
							<BarChartOutlined /> 4. Thống Kê
						</span>
					}
					key='4'
				>
					<TabThongKe
						dsCauLacBo={model.dsCauLacBo}
						dsDonDangKy={model.dsDonDangKy}
					/>
				</TabPane>
			</Tabs>
		</div>
	);
};

export default TH05_QuanLyCLB;
