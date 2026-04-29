import React, { useState } from 'react';
import { Table, Button, Modal, Form, InputNumber, DatePicker, Tag, Space, Popconfirm, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import type { IChiSoSucKhoe } from '../types';
import { taoId, tinhBMI, phanLoaiBMI } from '../utils';

interface Props {
	dsChiSo: IChiSoSucKhoe[];
	setDsChiSo: (ds: IChiSoSucKhoe[]) => void;
}

const TabChiSoSucKhoe: React.FC<Props> = ({ dsChiSo, setDsChiSo }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [editing, setEditing] = useState<IChiSoSucKhoe | null>(null);
	const [form] = Form.useForm();

	const moModalThem = () => {
		setEditing(null);
		form.resetFields();
		setModalVisible(true);
	};

	const moModalSua = (record: IChiSoSucKhoe) => {
		setEditing(record);
		form.setFieldsValue({
			...record,
			ngay: moment(record.ngay),
		});
		setModalVisible(true);
	};

	const xuLyLuu = () => {
		form.validateFields().then((values) => {
			const duLieu: IChiSoSucKhoe = {
				id: editing?.id || taoId(),
				ngay: values.ngay.format('YYYY-MM-DD'),
				canNang: values.canNang,
				chieuCao: values.chieuCao,
				nhipTim: values.nhipTim,
				gioNgu: values.gioNgu,
			};

			if (editing) {
				setDsChiSo(dsChiSo.map((cs) => (cs.id === editing.id ? duLieu : cs)));
				message.success('Đã cập nhật chỉ số!');
			} else {
				setDsChiSo([duLieu, ...dsChiSo]);
				message.success('Đã thêm chỉ số mới!');
			}
			setModalVisible(false);
		});
	};

	const xuLyXoa = (id: string) => {
		setDsChiSo(dsChiSo.filter((cs) => cs.id !== id));
		message.success('Đã xóa chỉ số!');
	};

	const duLieuHienThi = [...dsChiSo].sort((a, b) => b.ngay.localeCompare(a.ngay));

	const columns = [
		{
			title: 'Ngày',
			dataIndex: 'ngay',
			key: 'ngay',
			width: 120,
			render: (val: string) => moment(val).format('DD/MM/YYYY'),
		},
		{
			title: 'Cân nặng (kg)',
			dataIndex: 'canNang',
			key: 'canNang',
			width: 130,
			align: 'center' as const,
			render: (val: number) => <strong>{val}</strong>,
		},
		{
			title: 'Chiều cao (cm)',
			dataIndex: 'chieuCao',
			key: 'chieuCao',
			width: 130,
			align: 'center' as const,
		},
		{
			title: 'BMI',
			key: 'bmi',
			width: 180,
			align: 'center' as const,
			render: (_: any, record: IChiSoSucKhoe) => {
				const bmi = tinhBMI(record.canNang, record.chieuCao);
				const phanLoai = phanLoaiBMI(bmi);
				return (
					<Space>
						<strong>{bmi}</strong>
						<Tag color={phanLoai.color}>{phanLoai.text}</Tag>
					</Space>
				);
			},
		},
		{
			title: 'Nhịp tim (bpm)',
			dataIndex: 'nhipTim',
			key: 'nhipTim',
			width: 130,
			align: 'center' as const,
			render: (val: number) => <span style={{ color: '#f5222d' }}>❤ {val}</span>,
		},
		{
			title: 'Giờ ngủ',
			dataIndex: 'gioNgu',
			key: 'gioNgu',
			width: 110,
			align: 'center' as const,
			render: (val: number) => `${val}h`,
		},
		{
			title: 'Thao tác',
			key: 'action',
			width: 120,
			align: 'center' as const,
			render: (_: any, record: IChiSoSucKhoe) => (
				<Space>
					<Button type='link' icon={<EditOutlined />} onClick={() => moModalSua(record)} />
					<Popconfirm title='Bạn chắc chắn muốn xóa?' onConfirm={() => xuLyXoa(record.id)} okText='Xóa' cancelText='Hủy'>
						<Button type='link' danger icon={<DeleteOutlined />} />
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<div>
			<div style={{ marginBottom: 16 }}>
				<Button type='primary' icon={<PlusOutlined />} onClick={moModalThem}>
					Thêm chỉ số
				</Button>
			</div>

			<Table
				columns={columns}
				dataSource={duLieuHienThi}
				rowKey='id'
				pagination={{ pageSize: 8 }}
				bordered
				size='middle'
			/>

			<Modal
				title={editing ? 'Sửa chỉ số sức khỏe' : 'Thêm chỉ số mới'}
				visible={modalVisible}
				onOk={xuLyLuu}
				onCancel={() => setModalVisible(false)}
				okText='Lưu'
				cancelText='Hủy'
				destroyOnClose
			>
				<Form form={form} layout='vertical'>
					<Form.Item name='ngay' label='Ngày' rules={[{ required: true, message: 'Chọn ngày!' }]}>
						<DatePicker format='DD/MM/YYYY' style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name='canNang' label='Cân nặng (kg)' rules={[{ required: true, message: 'Nhập cân nặng!' }]}>
						<InputNumber min={20} max={300} step={0.1} style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name='chieuCao' label='Chiều cao (cm)' rules={[{ required: true, message: 'Nhập chiều cao!' }]}>
						<InputNumber min={50} max={250} style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name='nhipTim' label='Nhịp tim lúc nghỉ (bpm)' rules={[{ required: true, message: 'Nhập nhịp tim!' }]}>
						<InputNumber min={30} max={200} style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name='gioNgu' label='Giờ ngủ' rules={[{ required: true, message: 'Nhập giờ ngủ!' }]}>
						<InputNumber min={0} max={24} step={0.5} style={{ width: '100%' }} />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default TabChiSoSucKhoe;
