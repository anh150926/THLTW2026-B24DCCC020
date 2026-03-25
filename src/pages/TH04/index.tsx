import React from 'react';
import { Tabs } from 'antd';
import {
	BookOutlined,
	SolutionOutlined,
	SettingOutlined,
	FileTextOutlined,
	SearchOutlined,
	BarChartOutlined,
} from '@ant-design/icons';
import { useTh04Model } from './hooks/useTh04Model';
import { TabSoVanBang } from './components/TabSoVanBang';
import { TabQuyetDinh } from './components/TabQuyetDinh';
import { TabCauHinhBieuMau } from './components/TabCauHinhBieuMau';
import { TabVanBang } from './components/TabVanBang';
import { TabTraCuu } from './components/TabTraCuu';
import { TabThongKe } from './components/TabThongKe';

const { TabPane } = Tabs;

const TH04_QuanLyVanBang: React.FC = () => {
	const model = useTh04Model();

	return (
		<div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
			<h2 style={{ marginBottom: 20 }}>HỆ THỐNG QUẢN LÝ SỔ VĂN BẰNG TỐT NGHIỆP</h2>
			<Tabs defaultActiveKey='1' type='card' size='large'>
				<TabPane
					tab={
						<span>
							<BookOutlined /> 1. Sổ Văn Bằng
						</span>
					}
					key='1'
				>
					<TabSoVanBang
						dsSoVanBang={model.dsSoVanBang}
						setDsSoVanBang={model.setDsSoVanBang}
						dsQuyetDinh={model.dsQuyetDinh}
						dsVanBang={model.dsVanBang}
					/>
				</TabPane>

				<TabPane
					tab={
						<span>
							<SolutionOutlined /> 2. Quyết Định TN
						</span>
					}
					key='2'
				>
					<TabQuyetDinh
						dsQuyetDinh={model.dsQuyetDinh}
						setDsQuyetDinh={model.setDsQuyetDinh}
						dsSoVanBang={model.dsSoVanBang}
						dsVanBang={model.dsVanBang}
					/>
				</TabPane>

				<TabPane
					tab={
						<span>
							<SettingOutlined /> 3. Cấu Hình Biểu Mẫu
						</span>
					}
					key='3'
				>
					<TabCauHinhBieuMau
						dsTruongThongTin={model.dsTruongThongTin}
						setDsTruongThongTin={model.setDsTruongThongTin}
						dsVanBang={model.dsVanBang}
					/>
				</TabPane>

				<TabPane
					tab={
						<span>
							<FileTextOutlined /> 4. Văn Bằng
						</span>
					}
					key='4'
				>
					<TabVanBang
						dsVanBang={model.dsVanBang}
						setDsVanBang={model.setDsVanBang}
						dsQuyetDinh={model.dsQuyetDinh}
						dsSoVanBang={model.dsSoVanBang}
						dsTruongThongTin={model.dsTruongThongTin}
					/>
				</TabPane>

				<TabPane
					tab={
						<span>
							<SearchOutlined /> 5. Tra Cứu
						</span>
					}
					key='5'
				>
					<TabTraCuu
						dsVanBang={model.dsVanBang}
						dsQuyetDinh={model.dsQuyetDinh}
						setDsQuyetDinh={model.setDsQuyetDinh}
						dsSoVanBang={model.dsSoVanBang}
						dsTruongThongTin={model.dsTruongThongTin}
					/>
				</TabPane>

				<TabPane
					tab={
						<span>
							<BarChartOutlined /> 6. Thống Kê
						</span>
					}
					key='6'
				>
					<TabThongKe
					dsQuyetDinh={model.dsQuyetDinh}
				/>
				</TabPane>
			</Tabs>
		</div>
	);
};

export default TH04_QuanLyVanBang;
