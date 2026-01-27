import React, { useState } from 'react';
import { Table, Button, Input, Select, Tag, Space, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';

interface ProductTabProps {
	danhSachSanPham: any[];
	onThemMoi: () => void;
	onChinhSua: (sanPham: any) => void;
	onXoa: (id: number) => void;
}

const ProductTab: React.FC<ProductTabProps> = ({ danhSachSanPham, onThemMoi, onChinhSua, onXoa }) => {
	const [tuKhoa, setTuKhoa] = useState('');
	const [locDanhMuc, setLocDanhMuc] = useState<string | null>(null);
	const [locTrangThai, setLocTrangThai] = useState<string | null>(null);
	const [locKhoangGia, setLocKhoangGia] = useState<string | null>(null);

	const columns = [
		{ title: 'STT', render: (_: any, __: any, index: number) => index + 1, width: 60, align: 'center' as const },
		{
			title: 'Tên sản phẩm',
			dataIndex: 'tenSanPham',
			sorter: (a: any, b: any) => a.tenSanPham.localeCompare(b.tenSanPham),
		},
		{ title: 'Danh mục', dataIndex: 'danhMuc' },
		{
			title: 'Giá bán',
			dataIndex: 'gia',
			align: 'right' as const,
			render: (gia: number) => `${gia.toLocaleString()} đ`,
			sorter: (a: any, b: any) => a.gia - b.gia,
		},
		{
			title: 'Tồn kho',
			dataIndex: 'soLuong',
			align: 'center' as const,
			sorter: (a: any, b: any) => a.soLuong - b.soLuong,
		},
		{
			title: 'Trạng thái',
			key: 'trangThai',
			render: (_: any, record: any) => {
				if (record.soLuong === 0) return <Tag color='red'>Hết hàng</Tag>;
				if (record.soLuong <= 10) return <Tag color='orange'>Sắp hết</Tag>;
				return <Tag color='green'>Còn hàng</Tag>;
			},
		},
		{
			title: 'Thao tác',
			key: 'thaotac',
			align: 'center' as const,
			render: (_: any, record: any) => (
				<Space>
					<Button icon={<EditOutlined />} onClick={() => onChinhSua(record)} />
					<Popconfirm title='Bạn có chắc muốn xóa?' onConfirm={() => onXoa(record.id)}>
						<Button danger icon={<DeleteOutlined />} />
					</Popconfirm>
				</Space>
			),
		},
	];

	const duLieuDaLoc = danhSachSanPham.filter((sp: any) => {
		const khopTen = sp.tenSanPham.toLowerCase().includes(tuKhoa.toLowerCase());
		const khopDanhMuc = locDanhMuc ? sp.danhMuc === locDanhMuc : true;

		let khopTrangThai = true;
		if (locTrangThai === 'Hết hàng') khopTrangThai = sp.soLuong === 0;
		else if (locTrangThai === 'Sắp hết') khopTrangThai = sp.soLuong > 0 && sp.soLuong <= 10;
		else if (locTrangThai === 'Còn hàng') khopTrangThai = sp.soLuong > 10;

		let khopGia = true;
		if (locKhoangGia === 'duoi10') khopGia = sp.gia < 10000000;
		else if (locKhoangGia === '10-20') khopGia = sp.gia >= 10000000 && sp.gia <= 20000000;
		else if (locKhoangGia === 'tren20') khopGia = sp.gia > 20000000;

		return khopTen && khopDanhMuc && khopTrangThai && khopGia;
	});

	return (
		<div>
			<Space style={{ marginBottom: 16, flexWrap: 'wrap' }}>
				<Input
					placeholder='Tìm tên sản phẩm...'
					prefix={<SearchOutlined />}
					onChange={(e) => setTuKhoa(e.target.value)}
					style={{ width: 200 }}
				/>

				<Select placeholder='Danh mục' allowClear onChange={setLocDanhMuc} style={{ width: 150 }}>
					{['Laptop', 'Điện thoại', 'Máy tính bảng', 'Phụ kiện'].map((c) => (
						<Select.Option key={c} value={c}>
							{c}
						</Select.Option>
					))}
				</Select>

				<Select placeholder='Mức giá' allowClear onChange={setLocKhoangGia} style={{ width: 180 }}>
					<Select.Option value='duoi10'>Dưới 10 triệu</Select.Option>
					<Select.Option value='10-20'>10 triệu - 20 triệu</Select.Option>
					<Select.Option value='tren20'>Trên 20 triệu</Select.Option>
				</Select>

				<Select placeholder='Trạng thái' allowClear onChange={setLocTrangThai} style={{ width: 150 }}>
					<Select.Option value='Còn hàng'>Còn hàng</Select.Option>
					<Select.Option value='Sắp hết'>Sắp hết</Select.Option>
					<Select.Option value='Hết hàng'>Hết hàng</Select.Option>
				</Select>

				<Button type='primary' icon={<PlusOutlined />} onClick={onThemMoi}>
					Thêm sản phẩm
				</Button>
			</Space>

			<Table dataSource={duLieuDaLoc} columns={columns} rowKey='id' pagination={{ pageSize: 5 }} />
		</div>
	);
};

export default ProductTab;
