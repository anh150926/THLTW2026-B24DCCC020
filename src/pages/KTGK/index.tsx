import React from 'react';
import DanhSachPhongHoc from './components/DanhSachPhongHoc';

const KTGKPage: React.FC = () => {
	return (
		<div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
			<h2 style={{ marginBottom: 20 }}>HỆ THỐNG QUẢN LÝ PHÒNG HỌC</h2>
			<DanhSachPhongHoc />
		</div>
	);
};

export default KTGKPage;
