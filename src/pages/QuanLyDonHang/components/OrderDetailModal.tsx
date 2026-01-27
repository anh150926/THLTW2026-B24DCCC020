import React from 'react';
import { Modal, Descriptions, Table } from 'antd';

const OrderDetailModal = ({ visible, onCancel, donHang }: any) => {
	if (!donHang) return null;

	const columns = [
		{ title: 'Sản phẩm', dataIndex: 'tenSanPham' },
		{ title: 'Đơn giá', dataIndex: 'gia', render: (v: number) => v.toLocaleString() },
		{ title: 'Số lượng', dataIndex: 'soLuong' },
		{ title: 'Thành tiền', render: (_: any, r: any) => (r.gia * r.soLuong).toLocaleString() },
	];

	return (
		<Modal title='Chi tiết đơn hàng' visible={visible} onCancel={onCancel} footer={null} width={700}>
			<Descriptions bordered column={1} size='small'>
				<Descriptions.Item label='Mã ĐH'>{donHang.id}</Descriptions.Item>
				<Descriptions.Item label='Khách hàng'>
					{donHang.tenKhachHang} - {donHang.sdt}
				</Descriptions.Item>
				<Descriptions.Item label='Địa chỉ'>{donHang.diaChi}</Descriptions.Item>
				<Descriptions.Item label='Ngày tạo'>{donHang.ngayTao}</Descriptions.Item>
				<Descriptions.Item label='Trạng thái'>
					<span style={{ fontWeight: 'bold', color: donHang.trangThai === 'Hoàn thành' ? 'green' : 'blue' }}>
						{donHang.trangThai}
					</span>
				</Descriptions.Item>
			</Descriptions>
			<br />
			<Table dataSource={donHang.sanPham} columns={columns} pagination={false} rowKey='idSanPham' />
			<div style={{ textAlign: 'right', marginTop: 16, fontSize: 18, fontWeight: 'bold', color: '#cf1322' }}>
				Tổng cộng: {donHang.tongTien.toLocaleString()} đ
			</div>
		</Modal>
	);
};
export default OrderDetailModal;
