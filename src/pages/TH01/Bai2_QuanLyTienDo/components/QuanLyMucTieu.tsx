import React, { useState } from 'react';
import { Card, Table, Progress, Button, Modal, Form, Select, InputNumber, Tag } from 'antd';
import { AimOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import { MonHoc, TienDo, MucTieu } from '../type';

const { Option } = Select;

interface Props {
	danhSachMon: MonHoc[];
	lichSuHoc: TienDo[];
	danhSachMucTieu: MucTieu[];
	themMucTieu: (mt: MucTieu) => void;
	xoaMucTieu: (id: string) => void;
}

export const QuanLyMucTieu: React.FC<Props> = ({
	danhSachMon,
	lichSuHoc,
	danhSachMucTieu,
	themMucTieu,
	xoaMucTieu,
}) => {
	const [hienModal, setHienModal] = useState(false);
	const [form] = Form.useForm();
	const thangHienTai = moment().format('YYYY-MM');

	const mucTieuThangNay = danhSachMucTieu.filter((mt) => mt.thang === thangHienTai);

	const tinhThoiGianDaHoc = (monHocId: string | 'ALL') => {
		return lichSuHoc.reduce((tong, item) => {
			const thangItem = moment(item.thoiGian).format('YYYY-MM');
			if (thangItem !== thangHienTai) return tong;
			if (monHocId === 'ALL') return tong + item.thoiLuong;
			if (item.monHocId === monHocId) return tong + item.thoiLuong;
			return tong;
		}, 0);
	};

	const xuLyThem = (values: any) => {
		const mtMoi: MucTieu = {
			id: Date.now().toString(),
			monHocId: values.monHocId,
			thang: thangHienTai,
			thoiLuongMucTieu: values.thoiLuongMucTieu,
		};
		themMucTieu(mtMoi);
		setHienModal(false);
		form.resetFields();
	};

	const columns = [
		{
			title: 'Mục Tiêu Cho',
			dataIndex: 'monHocId',
			key: 'monHocId',
			render: (id: string) => {
				if (id === 'ALL') return <Tag color='red'>TỔNG THỜI GIAN</Tag>;
				const mon = danhSachMon.find((m) => m.id === id);
				return mon ? <Tag color='blue'>{mon.tenMon}</Tag> : 'Môn đã xóa';
			},
		},
		{
			title: 'Tiến Độ',
			key: 'tienDo',
			render: (_: any, record: MucTieu) => {
				const daHoc = tinhThoiGianDaHoc(record.monHocId);
				const phanTram = Math.min(Math.round((daHoc / record.thoiLuongMucTieu) * 100), 100);
				return (
					<div style={{ width: 180 }}>
						<Progress percent={phanTram} status={phanTram >= 100 ? 'success' : 'active'} size='small' />
						<div style={{ fontSize: 11, color: '#666' }}>
							{daHoc}/{record.thoiLuongMucTieu} phút
						</div>
					</div>
				);
			},
		},
		{
			title: 'Trạng Thái',
			key: 'trangThai',
			render: (_: any, record: MucTieu) => {
				const daHoc = tinhThoiGianDaHoc(record.monHocId);
				return daHoc >= record.thoiLuongMucTieu ? (
					<Tag color='success'>ĐÃ ĐẠT</Tag>
				) : (
					<Tag color='warning'>CHƯA ĐẠT</Tag>
				);
			},
		},
		{
			title: '',
			key: 'action',
			render: (_: any, record: MucTieu) => (
				<Button type='text' danger icon={<DeleteOutlined />} onClick={() => xoaMucTieu(record.id)} />
			),
		},
	];

	return (
		<Card
			title={
				<span>
					<AimOutlined /> Mục Tiêu Tháng {thangHienTai}
				</span>
			}
			extra={
				<Button type='primary' size='small' icon={<PlusOutlined />} onClick={() => setHienModal(true)}>
					Đặt Mục Tiêu
				</Button>
			}
			bodyStyle={{ padding: '0 10px 10px' }}
		>
			<Table dataSource={mucTieuThangNay} columns={columns} rowKey='id' pagination={false} size='small' />

			<Modal title='Thiết Lập Mục Tiêu Mới' visible={hienModal} onCancel={() => setHienModal(false)} onOk={form.submit}>
				<Form form={form} onFinish={xuLyThem} layout='vertical'>
					<Form.Item name='monHocId' label='Chọn đối tượng áp dụng' rules={[{ required: true }]}>
						<Select>
							<Option value='ALL'>-- Tổng thời gian học (Tất cả môn) --</Option>
							{danhSachMon.map((m) => (
								<Option key={m.id} value={m.id}>
									Môn: {m.tenMon}
								</Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item name='thoiLuongMucTieu' label='Mục tiêu (phút/tháng)' rules={[{ required: true }]}>
						<InputNumber style={{ width: '100%' }} min={1} />
					</Form.Item>
				</Form>
			</Modal>
		</Card>
	);
};
