import React from 'react';
import { Tabs } from 'antd';
import {
	CompassOutlined,
	ScheduleOutlined,
	WalletOutlined,
	SettingOutlined,
} from '@ant-design/icons';
import { useTh06Model } from './hooks/useTh06Model';
import { TabKhamPha } from './components/TabKhamPha';
import { TabLichTrinh } from './components/TabLichTrinh';
import { TabNganSach } from './components/TabNganSach';
import { TabQuanTri } from './components/TabQuanTri';

const { TabPane } = Tabs;

const TH06_KeHoachDuLich: React.FC = () => {
	const model = useTh06Model();

	return (
		<div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
			<h2 style={{ marginBottom: 20 }}>ỨNG DỤNG LẬP KẾ HOẠCH DU LỊCH</h2>
			<Tabs defaultActiveKey='1' type='card' size='large'>
				<TabPane
					tab={
						<span>
							<CompassOutlined /> 1. Khám Phá Điểm Đến
						</span>
					}
					key='1'
				>
					<TabKhamPha dsDiemDen={model.dsDiemDen} />
				</TabPane>

				<TabPane
					tab={
						<span>
							<ScheduleOutlined /> 2. Lịch Trình
						</span>
					}
					key='2'
				>
					<TabLichTrinh
						dsDiemDen={model.dsDiemDen}
						setDsDiemDen={model.setDsDiemDen}
						dsLichTrinh={model.dsLichTrinh}
						setDsLichTrinh={model.setDsLichTrinh}
					/>
				</TabPane>

				<TabPane
					tab={
						<span>
							<WalletOutlined /> 3. Ngân Sách
						</span>
					}
					key='3'
				>
					<TabNganSach dsDiemDen={model.dsDiemDen} dsLichTrinh={model.dsLichTrinh} />
				</TabPane>

				<TabPane
					tab={
						<span>
							<SettingOutlined /> 4. Quản Trị (Admin)
						</span>
					}
					key='4'
				>
					<TabQuanTri
						dsDiemDen={model.dsDiemDen}
						setDsDiemDen={model.setDsDiemDen}
						dsLichTrinh={model.dsLichTrinh}
					/>
				</TabPane>
			</Tabs>
		</div>
	);
};

export default TH06_KeHoachDuLich;
