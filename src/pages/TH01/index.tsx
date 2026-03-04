import React from 'react';
import { Tabs } from 'antd';
import { RocketOutlined, ReadOutlined } from '@ant-design/icons';
import Bai1_TroChoiDoanSo from './Bai1_TroChoiDoanSo';
import Bai2_QuanLyTienDo from './Bai2_QuanLyTienDo';

const { TabPane } = Tabs;

const BaiThucHanhSo1: React.FC = () => {
	return (
		<div className='thuc-hanh-container' style={{ minHeight: '100vh', background: '#f0f2f5', padding: 20 }}>
			<Tabs defaultActiveKey='bai2' type='card' size='large'>
				<TabPane
					tab={
						<span>
							<RocketOutlined /> Bài 1: Game Đoán Số
						</span>
					}
					key='bai1'
				>
					<Bai1_TroChoiDoanSo />
				</TabPane>
				<TabPane
					tab={
						<span>
							<ReadOutlined /> Bài 2: Quản Lý Học Tập
						</span>
					}
					key='bai2'
				>
					<Bai2_QuanLyTienDo />
				</TabPane>
			</Tabs>
		</div>
	);
};

export default BaiThucHanhSo1;
