import React from 'react';
import { Card, Col, Row, Statistic, Progress } from 'antd';
import { ShopOutlined, ShoppingCartOutlined, DollarOutlined, BarChartOutlined } from '@ant-design/icons';

interface DashboardProps {
	danhSachSanPham: any[];
	danhSachDonHang: any[];
}

const Dashboard: React.FC<DashboardProps> = ({ danhSachSanPham, danhSachDonHang }) => {
	const tongGiaTriKho = danhSachSanPham.reduce((tong, sp) => tong + sp.gia * sp.soLuong, 0);

	const doanhThu = danhSachDonHang
		.filter((dh) => dh.trangThai === 'Hoàn thành')
		.reduce((tong, dh) => tong + dh.tongTien, 0);

	const soDonHoanThanh = danhSachDonHang.filter((dh) => dh.trangThai === 'Hoàn thành').length;
	const tyLeHoanThanh = danhSachDonHang.length > 0 ? Math.round((soDonHoanThanh / danhSachDonHang.length) * 100) : 0;

	return (
		<Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
			<Col span={6}>
				<Card>
					<Statistic title='Tổng sản phẩm' value={danhSachSanPham.length} prefix={<ShopOutlined />} />
				</Card>
			</Col>
			<Col span={6}>
				<Card>
					<Statistic
						title='Giá trị tồn kho'
						value={tongGiaTriKho}
						precision={0}
						formatter={(v) => `${Number(v).toLocaleString()} đ`}
						prefix={<BarChartOutlined />}
					/>
				</Card>
			</Col>
			<Col span={6}>
				<Card>
					<Statistic title='Tổng đơn hàng' value={danhSachDonHang.length} prefix={<ShoppingCartOutlined />} />
					<div style={{ marginTop: 8 }}>
						<span>Tỷ lệ hoàn thành: </span>
						<Progress percent={tyLeHoanThanh} size='small' status='active' />
					</div>
				</Card>
			</Col>
			<Col span={6}>
				<Card>
					<Statistic
						title='Doanh thu thực tế'
						value={doanhThu}
						precision={0}
						formatter={(v) => `${Number(v).toLocaleString()} đ`}
						valueStyle={{ color: '#3f8600' }}
						prefix={<DollarOutlined />}
					/>
				</Card>
			</Col>
		</Row>
	);
};

export default Dashboard;
