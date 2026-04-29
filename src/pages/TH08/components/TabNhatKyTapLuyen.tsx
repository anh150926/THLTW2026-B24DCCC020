import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Select, DatePicker, Tag, Space, Popconfirm, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import type { IBuoiTap } from '../types';
import { ELoaiBaiTap, ETrangThaiBuoiTap } from '../types';
import { DS_LOAI_BAI_TAP, DS_TRANG_THAI_BUOI_TAP, MAU_LOAI_BAI_TAP } from '../constants';
import { taoId } from '../utils';

const { RangePicker } = DatePicker;

interface Props {
	dsBuoiTap: IBuoiTap[];
	setDsBuoiTap: (ds: IBuoiTap[]) => void;
}

const TabNhatKyTapLuyen: React.FC<Props> = ({ dsBuoiTap, setDsBuoiTap }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [editing, setEditing] = useState<IBuoiTap | null>(null);
	const [form] = Form.useForm();

	const [timKiem, setTimKiem] = useState('');
	const [locLoai, setLocLoai] = useState<ELoaiBaiTap | ''>('');
	const [locNgay, setLocNgay] = useState<[moment.Moment, moment.Moment] | null>(null);

	const moModalThem = () => {
		setEditing(null);
		form.resetFields();
		form.setFieldsValue({ trangThai: ETrangThaiBuoiTap.HoanThanh });
		setModalVisible(true);
	};

	const moModalSua = (record: IBuoiTap) => {
		setEditing(record);
		form.setFieldsValue({
			...record,
			ngay: moment(record.ngay),
		});
		setModalVisible(true);
	};

	const xuLyLuu = () => {
		form.validateFields().then((values) => {
			const duLieu: IBuoiTap = {
				id: editing?.id || taoId(),
				ngay: values.ngay.format('YYYY-MM-DD'),
				loaiBaiTap: values.loaiBaiTap,
				thoiLuong: values.thoiLuong,
				caloDot: values.caloDot,
				ghiChu: values.ghiChu || '',
				trangThai: values.trangThai,
			};

			if (editing) {
				setDsBuoiTap(dsBuoiTap.map((bt) => (bt.id === editing.id ? duLieu : bt)));
				message.success('Đã cập nhật buổi tập!');
			} else {
				setDsBuoiTap([duLieu, ...dsBuoiTap]);
				message.success('Đã thêm buổi tập mới!');
			}
			setModalVisible(false);
		});
	};

	const xuLyXoa = (id: string) => {
		setDsBuoiTap(dsBuoiTap.filter((bt) => bt.id !== id));
		message.success('Đã xóa buổi tập!');
	};

	const duLieuHienThi = dsBuoiTap
		.filter((bt) => {
			if (timKiem && !bt.loaiBaiTap.toLowerCase().includes(timKiem.toLowerCase()) && !bt.ghiChu.toLowerCase().includes(timKiem.toLowerCase())) return false;
			if (locLoai && bt.loaiBaiTap !== locLoai) return false;
			if (locNgay) {
				const ngay = moment(bt.ngay);
				if (!ngay.isBetween(locNgay[0], locNgay[1], undefined, '[]')) return false;
			}
			return true;
		})
		.sort((a, b) => b.ngay.localeCompare(a.ngay));

	const columns = [
		{
			title: 'Ngày',
			dataIndex: 'ngay',
			key: 'ngay',
			width: 120,
			render: (val: string) => moment(val).format('DD/MM/YYYY'),
		},
		{
			title: 'Loại bài tập',
			dataIndex: 'loaiBaiTap',
			key: 'loaiBaiTap',
			width: 120,
			render: (val: ELoaiBaiTap) => <Tag color={MAU_LOAI_BAI_TAP[val]}>{val}</Tag>,
		},
		{
			title: 'Thời lượng (phút)',
			dataIndex: 'thoiLuong',
			key: 'thoiLuong',
			width: 130,
			align: 'center' as const,
		},
		{
			title: 'Calo đốt',
			dataIndex: 'caloDot',
			key: 'caloDot',
			width: 110,
			align: 'center' as const,
			render: (val: number) => <span style={{ color: '#fa541c', fontWeight: 600 }}>{val} kcal</span>,
		},
		{
			title: 'Ghi chú',
			dataIndex: 'ghiChu',
			key: 'ghiChu',
			ellipsis: true,
		},
		{
			title: 'Trạng thái',
			dataIndex: 'trangThai',
			key: 'trangThai',
			width: 130,
			render: (val: ETrangThaiBuoiTap) => (
				<Tag color={val === ETrangThaiBuoiTap.HoanThanh ? 'success' : 'error'}>{val}</Tag>
			),
		},
		{
			title: 'Thao tác',
			key: 'action',
			width: 120,
			align: 'center' as const,
			render: (_: any, record: IBuoiTap) => (
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
			<div style={{ marginBottom: 16, display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'space-between' }}>
				<Space wrap>
					<Input
						placeholder='Tìm theo bài tập, ghi chú...'
						prefix={<SearchOutlined />}
						allowClear
						onChange={(e) => setTimKiem(e.target.value)}
						style={{ width: 250 }}
					/>
					<Select
						placeholder='Lọc loại bài tập'
						allowClear
						options={DS_LOAI_BAI_TAP}
						onChange={(val) => setLocLoai(val || '')}
						style={{ width: 160 }}
					/>
					<RangePicker
						onChange={(dates) => setLocNgay(dates as [moment.Moment, moment.Moment] | null)}
						format='DD/MM/YYYY'
					/>
				</Space>
				<Button type='primary' icon={<PlusOutlined />} onClick={moModalThem}>
					Thêm buổi tập
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
				title={editing ? 'Sửa buổi tập' : 'Thêm buổi tập mới'}
				visible={modalVisible}
				onOk={xuLyLuu}
				onCancel={() => setModalVisible(false)}
				okText='Lưu'
				cancelText='Hủy'
				destroyOnClose
			>
				<Form form={form} layout='vertical'>
					<Form.Item name='ngay' label='Ngày tập' rules={[{ required: true, message: 'Chọn ngày!' }]}>
						<DatePicker format='DD/MM/YYYY' style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name='loaiBaiTap' label='Loại bài tập' rules={[{ required: true, message: 'Chọn loại!' }]}>
						<Select options={DS_LOAI_BAI_TAP} placeholder='Chọn loại bài tập' />
					</Form.Item>
					<Form.Item name='thoiLuong' label='Thời lượng (phút)' rules={[{ required: true, message: 'Nhập thời lượng!' }]}>
						<InputNumber min={1} max={300} style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name='caloDot' label='Calo đốt' rules={[{ required: true, message: 'Nhập calo!' }]}>
						<InputNumber min={0} max={5000} style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name='ghiChu' label='Ghi chú'>
						<Input.TextArea rows={2} />
					</Form.Item>
					<Form.Item name='trangThai' label='Trạng thái' rules={[{ required: true, message: 'Chọn trạng thái!' }]}>
						<Select options={DS_TRANG_THAI_BUOI_TAP} />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default TabNhatKyTapLuyen;
