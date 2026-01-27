import React, { useState } from 'react';
import { Table, Button, Input, Select, DatePicker, Space, Tooltip } from 'antd';
import { PlusOutlined, EyeOutlined, SearchOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

interface OrderTabProps {
	danhSachDonHang: any[];
	onDoiTrangThai: (maDonHang: string, trangThaiMoi: string) => void;
	onXemChiTiet: (donHang: any) => void;
	onChinhSua: (donHang: any) => void;
	onTaoDon: () => void;
}

const OrderTab: React.FC<OrderTabProps> = ({ danhSachDonHang, onDoiTrangThai, onXemChiTiet, onChinhSua, onTaoDon }) => {
	const [tuKhoa, setTuKhoa] = useState('');
	const [locTrangThai, setLocTrangThai] = useState<string | null>(null);
	const [locNgay, setLocNgay] = useState<any>(null);

	const columns = [
		{ title: 'Mã ĐH', dataIndex: 'id' },
		{ title: 'Khách hàng', dataIndex: 'tenKhachHang' },
		{ title: 'Số SP', render: (_: any, r: any) => r.sanPham.length, align: 'center' as const },
		{
			title: 'Tổng tiền',
			dataIndex: 'tongTien',
			render: (v: number) => <b style={{ color: '#cf1322' }}>{v.toLocaleString()} đ</b>,
			sorter: (a: any, b: any) => a.tongTien - b.tongTien,
		},
		{
			title: 'Ngày tạo',
			dataIndex: 'ngayTao',
			sorter: (a: any, b: any) => dayjs(a.ngayTao).unix() - dayjs(b.ngayTao).unix(),
		},
		{
			title: 'Trạng thái',
			dataIndex: 'trangThai',
			render: (trangThai: string, record: any) => (
				<Select value={trangThai} onChange={(val) => onDoiTrangThai(record.id, val)} style={{ width: 140 }}>
					<Select.Option value='Chờ xử lý'>Chờ xử lý</Select.Option>
					<Select.Option value='Đang giao'>Đang giao</Select.Option>
					<Select.Option value='Hoàn thành'>Hoàn thành</Select.Option>
					<Select.Option value='Đã hủy'>Đã hủy</Select.Option>
				</Select>
			),
		},
		{
			title: 'Thao tác',
			align: 'center' as const,
			render: (_: any, record: any) => (
				<Space>
					<Tooltip title='Xem chi tiết'>
						<Button icon={<EyeOutlined />} onClick={() => onXemChiTiet(record)} />
					</Tooltip>
					<Tooltip title='Sửa đơn hàng'>
						<Button type='primary' ghost icon={<EditOutlined />} onClick={() => onChinhSua(record)} />
					</Tooltip>
				</Space>
			),
		},
	];

	const duLieuDaLoc = danhSachDonHang.filter((dh: any) => {
		const khopTen = dh.tenKhachHang.toLowerCase().includes(tuKhoa.toLowerCase()) || dh.id.includes(tuKhoa);
		const khopTrangThai = locTrangThai ? dh.trangThai === locTrangThai : true;
		const khopNgay = locNgay ? dayjs(dh.ngayTao).isAfter(locNgay[0]) && dayjs(dh.ngayTao).isBefore(locNgay[1]) : true;
		return khopTen && khopTrangThai && khopNgay;
	});

	return (
		<div>
			<Space style={{ marginBottom: 16 }}>
				<Input
					placeholder='Tìm tên KH hoặc Mã ĐH'
					prefix={<SearchOutlined />}
					onChange={(e) => setTuKhoa(e.target.value)}
					style={{ width: 250 }}
				/>
				<Select placeholder='Lọc trạng thái' allowClear onChange={setLocTrangThai} style={{ width: 150 }}>
					{['Chờ xử lý', 'Đang giao', 'Hoàn thành', 'Đã hủy'].map((s) => (
						<Select.Option key={s} value={s}>
							{s}
						</Select.Option>
					))}
				</Select>
				<DatePicker.RangePicker onChange={setLocNgay} placeholder={['Từ ngày', 'Đến ngày']} />
				<Button type='primary' icon={<PlusOutlined />} onClick={onTaoDon}>
					Tạo Đơn Hàng
				</Button>
			</Space>
			<Table dataSource={duLieuDaLoc} columns={columns} rowKey='id' />
		</div>
	);
};

export default OrderTab;
