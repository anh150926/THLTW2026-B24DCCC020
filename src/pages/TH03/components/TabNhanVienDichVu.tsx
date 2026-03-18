import React, { useState, useEffect } from 'react';
import {
	Card,
	Row,
	Col,
	Table,
	Button,
	Modal,
	Form,
	Input,
	InputNumber,
	TimePicker,
	Popconfirm,
	Space,
	message,
	Checkbox,
	Tag,
} from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, CalendarOutlined } from '@ant-design/icons';
import { DichVu, NhanVien, LichHen, TrangThaiLich } from '../types';
import { NGAY_TRONG_TUAN } from '../constants';
import moment from 'moment';

interface Props {
	dsDichVu: DichVu[];
	setDsDichVu: (d: DichVu[]) => void;
	dsNhanVien: NhanVien[];
	setDsNhanVien: (n: NhanVien[]) => void;
	dsLichHen: LichHen[];
}

export const TabNhanVienDichVu: React.FC<Props> = ({ dsDichVu, setDsDichVu, dsNhanVien, setDsNhanVien, dsLichHen }) => {
	const [modalDV, setModalDV] = useState(false);
	const [dangSuaDV, setDangSuaDV] = useState<DichVu | null>(null);
	const [modalNV, setModalNV] = useState(false);
	const [dangSuaNV, setDangSuaNV] = useState<NhanVien | null>(null);

	const [formDV] = Form.useForm();
	const [formNV] = Form.useForm();

	useEffect(() => {
		if (modalDV) {
			if (dangSuaDV) formDV.setFieldsValue(dangSuaDV);
			else formDV.resetFields();
		}
	}, [modalDV, dangSuaDV, formDV]);

	useEffect(() => {
		if (modalNV) {
			if (dangSuaNV) {
				formNV.setFieldsValue({
					...dangSuaNV,
					caLamViec: [moment(dangSuaNV.gioBatDau, 'HH:mm'), moment(dangSuaNV.gioKetThuc, 'HH:mm')],
					ngayLamViec: dangSuaNV.ngayLamViec || [],
				});
			} else {
				formNV.resetFields();
			}
		}
	}, [modalNV, dangSuaNV, formNV]);

	const luuDichVu = (values: any) => {
		const dvMoi = { id: dangSuaDV ? dangSuaDV.id : Date.now().toString(), ...values };
		if (dangSuaDV) setDsDichVu(dsDichVu.map((d) => (d.id === dvMoi.id ? dvMoi : d)));
		else setDsDichVu([dvMoi, ...dsDichVu]);
		setModalDV(false);
	};

	const luuNhanVien = (values: any) => {
		const nvMoi: NhanVien = {
			id: dangSuaNV ? dangSuaNV.id : Date.now().toString(),
			tenNhanVien: values.tenNhanVien,
			gioiHanKhach: values.gioiHanKhach,
			gioBatDau: values.caLamViec[0].format('HH:mm'),
			gioKetThuc: values.caLamViec[1].format('HH:mm'),
			ngayLamViec: values.ngayLamViec || [],
		};
		if (dangSuaNV) setDsNhanVien(dsNhanVien.map((n) => (n.id === nvMoi.id ? nvMoi : n)));
		else setDsNhanVien([nvMoi, ...dsNhanVien]);
		setModalNV(false);
	};

	const xoaDichVu = (id: string) => {
		if (dsLichHen.some((l) => l.dichVuId === id && l.trangThai !== TrangThaiLich.HUY)) {
			message.error('Không thể xóa! Dịch vụ này đang có lịch hẹn.');
			return;
		}
		setDsDichVu(dsDichVu.filter((d) => d.id !== id));
	};

	const xoaNhanVien = (id: string) => {
		if (dsLichHen.some((l) => l.nhanVienId === id && l.trangThai !== TrangThaiLich.HUY)) {
			message.error('Không thể xóa! Nhân viên này đang có lịch hẹn.');
			return;
		}
		setDsNhanVien(dsNhanVien.filter((n) => n.id !== id));
	};

	const cotDV = [
		{ title: 'Tên Dịch Vụ', dataIndex: 'tenDichVu' },
		{ title: 'Giá (VNĐ)', dataIndex: 'giaTien', render: (v: number) => v.toLocaleString() + ' đ' },
		{ title: 'Thời gian', dataIndex: 'thoiGianPhut', render: (v: number) => `${v} phút` },
		{
			title: 'Thao tác',
			render: (_: any, r: DichVu) => (
				<Space>
					<Button
						type='text'
						style={{ color: '#1890ff' }}
						icon={<EditOutlined />}
						onClick={() => {
							setDangSuaDV(r);
							setModalDV(true);
						}}
					/>
					<Popconfirm title='Xóa dịch vụ này?' onConfirm={() => xoaDichVu(r.id)}>
						<Button danger type='text' icon={<DeleteOutlined />} />
					</Popconfirm>
				</Space>
			),
		},
	];

	const cotNV = [
		{ title: 'Tên Nhân Viên', dataIndex: 'tenNhanVien' },
		{ title: 'Ca làm việc', render: (_: any, r: NhanVien) => `${r.gioBatDau} - ${r.gioKetThuc}` },
		{
			title: 'Ngày làm việc',
			render: (_: any, r: NhanVien) => (
				<Space wrap size={4}>
					{(r.ngayLamViec || []).sort().map((v) => (
						<Tag key={v} color='blue'>
							{NGAY_TRONG_TUAN.find((n) => n.value === v)?.label}
						</Tag>
					))}
				</Space>
			),
		},
		{ title: 'KH tối đa/ngày', dataIndex: 'gioiHanKhach' },
		{
			title: 'Thao tác',
			render: (_: any, r: NhanVien) => (
				<Space>
					<Button
						type='text'
						style={{ color: '#1890ff' }}
						icon={<EditOutlined />}
						onClick={() => {
							setDangSuaNV(r);
							setModalNV(true);
						}}
					/>
					<Popconfirm title='Xóa nhân viên này?' onConfirm={() => xoaNhanVien(r.id)}>
						<Button danger type='text' icon={<DeleteOutlined />} />
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<Row gutter={[16, 16]}>
			<Col xs={24} lg={12}>
				<Card
					title='Quản Lý Dịch Vụ'
					extra={
						<Button
							icon={<PlusOutlined />}
							onClick={() => {
								setDangSuaDV(null);
								setModalDV(true);
							}}
						>
							Thêm
						</Button>
					}
				>
					<Table dataSource={dsDichVu} columns={cotDV} rowKey='id' pagination={false} size='small' />
				</Card>
			</Col>
			<Col xs={24} lg={12}>
				<Card
					title={
						<Space>
							<CalendarOutlined /> Quản Lý Nhân Viên
						</Space>
					}
					extra={
						<Button
							icon={<PlusOutlined />}
							onClick={() => {
								setDangSuaNV(null);
								setModalNV(true);
							}}
						>
							Thêm
						</Button>
					}
				>
					<Table dataSource={dsNhanVien} columns={cotNV} rowKey='id' pagination={false} size='small' />
				</Card>
			</Col>

			<Modal
				title={dangSuaDV ? 'Sửa Dịch Vụ' : 'Thêm Dịch Vụ'}
				visible={modalDV}
				onCancel={() => setModalDV(false)}
				onOk={formDV.submit}
			>
				<Form form={formDV} layout='vertical' onFinish={luuDichVu}>
					<Form.Item name='tenDichVu' label='Tên dịch vụ' rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item name='giaTien' label='Giá tiền (VNĐ)' rules={[{ required: true }]}>
						<InputNumber
							style={{ width: '100%' }}
							min={0}
							step={10000}
							formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ'}
							parser={(value) => (value ? Number(value.replace(/\$\s?|(,*)/g, '').replace(/\s?đ/g, '')) : 0) as any}
						/>
					</Form.Item>
					<Form.Item name='thoiGianPhut' label='Thời lượng (Phút)' rules={[{ required: true }]}>
						<InputNumber style={{ width: '100%' }} min={5} step={5} />
					</Form.Item>
				</Form>
			</Modal>

			<Modal
				title={dangSuaNV ? 'Sửa Nhân Viên' : 'Thêm Nhân Viên'}
				visible={modalNV}
				onCancel={() => setModalNV(false)}
				onOk={formNV.submit}
			>
				<Form form={formNV} layout='vertical' onFinish={luuNhanVien}>
					<Form.Item name='tenNhanVien' label='Tên nhân viên' rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item name='caLamViec' label='Ca làm việc' rules={[{ required: true }]}>
						<TimePicker.RangePicker format='HH:mm' style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item label='Ngày làm việc'>
						<Space>
							<Form.Item name='ngayLamViec' noStyle rules={[{ required: true, type: 'array', min: 1 }]}>
								<Checkbox.Group>
									{NGAY_TRONG_TUAN.map((ngay) => (
										<Checkbox key={ngay.value} value={ngay.value}>
											{ngay.label}
										</Checkbox>
									))}
								</Checkbox.Group>
							</Form.Item>
							<Button
								type='link'
								size='small'
								onClick={() => formNV.setFieldsValue({ ngayLamViec: [0, 1, 2, 3, 4, 5, 6] })}
							>
								Cả tuần
							</Button>
						</Space>
					</Form.Item>
					<Form.Item name='gioiHanKhach' label='Giờ hạn khách/ngày' rules={[{ required: true }]}>
						<InputNumber min={1} style={{ width: '100%' }} />
					</Form.Item>
				</Form>
			</Modal>
		</Row>
	);
};
