import React from 'react';
import { Tabs } from 'antd';
import {
	ReadOutlined,
	EditOutlined,
	TagsOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { useTh07Model } from './hooks/useTh07Model';
import TrangChu from './components/TrangChu';
import QuanLyBaiViet from './components/QuanLyBaiViet';
import QuanLyThe from './components/QuanLyThe';
import GioiThieu from './components/GioiThieu';

const { TabPane } = Tabs;

const TH07_BlogCaNhan: React.FC = () => {
	const model = useTh07Model();

	return (
		<div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
			<h2 style={{ marginBottom: 20 }}>ỨNG DỤNG BLOG CÁ NHÂN</h2>
			<Tabs defaultActiveKey='1' type='card' size='large'>
				<TabPane
					tab={<span><ReadOutlined /> 1. Trang Chủ</span>}
					key='1'
				>
					<TrangChu
						dsBaiViet={model.dsBaiViet}
						setDsBaiViet={model.setDsBaiViet}
						dsThe={model.dsThe}
					/>
				</TabPane>

				<TabPane
					tab={<span><EditOutlined /> 2. Quản Lý Bài Viết</span>}
					key='2'
				>
					<QuanLyBaiViet
						dsBaiViet={model.dsBaiViet}
						setDsBaiViet={model.setDsBaiViet}
						dsThe={model.dsThe}
					/>
				</TabPane>

				<TabPane
					tab={<span><TagsOutlined /> 3. Quản Lý Thẻ</span>}
					key='3'
				>
					<QuanLyThe
						dsThe={model.dsThe}
						setDsThe={model.setDsThe}
						dsBaiViet={model.dsBaiViet}
					/>
				</TabPane>

				<TabPane
					tab={<span><UserOutlined /> 4. Giới Thiệu</span>}
					key='4'
				>
					<GioiThieu />
				</TabPane>
			</Tabs>
		</div>
	);
};

export default TH07_BlogCaNhan;
