import React from 'react';
import { Tabs } from 'antd';
import { PlayCircleOutlined, DatabaseOutlined } from '@ant-design/icons';
import Bai1_OanTuTi from './Bai1_OanTuTi';
import Bai2_NganHangCauHoi from './Bai2_NganHangCauHoi';

const { TabPane } = Tabs;

const BaiThucHanhSo2: React.FC = () => {
	return (
		<div style={{ minHeight: '100vh', background: '#f0f2f5', padding: 20 }}>
			<Tabs defaultActiveKey='bai2' type='card' size='large'>
				<TabPane
					tab={
						<span>
							<PlayCircleOutlined /> Bài 1: Oẳn Tù Tì
						</span>
					}
					key='bai1'
				>
					<Bai1_OanTuTi />
				</TabPane>
				<TabPane
					tab={
						<span>
							<DatabaseOutlined /> Bài 2: Hệ Thống Đề Thi
						</span>
					}
					key='bai2'
				>
					<Bai2_NganHangCauHoi />
				</TabPane>
			</Tabs>
		</div>
	);
};

export default BaiThucHanhSo2;
