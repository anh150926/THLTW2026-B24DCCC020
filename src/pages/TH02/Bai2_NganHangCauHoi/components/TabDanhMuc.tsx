import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Button, Modal, Form, Input, InputNumber, Popconfirm, Space } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { KhoiKienThuc, MonHoc } from '../types';

interface Props {
	dsKhoi: KhoiKienThuc[];
	dsMon: MonHoc[];
	luuKhoi: (k: KhoiKienThuc) => void;
	xoaKhoi: (id: string) => void;
	luuMon: (m: MonHoc) => void;
	xoaMon: (maMon: string) => void;
}

export const TabDanhMuc: React.FC<Props> = ({ dsKhoi, dsMon, luuKhoi, xoaKhoi, luuMon, xoaMon }) => {
	const [modalKhoi, setModalKhoi] = useState(false);
	const [dangSuaKhoi, setDangSuaKhoi] = useState<KhoiKienThuc | null>(null);

	const [modalMon, setModalMon] = useState(false);
	const [dangSuaMon, setDangSuaMon] = useState<MonHoc | null>(null);

	const [formKhoi] = Form.useForm();
	const [formMon] = Form.useForm();

	// Đổ dữ liệu cũ vào form khi bấm Sửa
	useEffect(() => {
		if (modalKhoi) {
			if (dangSuaKhoi) formKhoi.setFieldsValue(dangSuaKhoi);
			else formKhoi.resetFields();
		}
	}, [modalKhoi, dangSuaKhoi, formKhoi]);

	useEffect(() => {
		if (modalMon) {
			if (dangSuaMon) formMon.setFieldsValue(dangSuaMon);
			else formMon.resetFields();
		}
	}, [modalMon, dangSuaMon, formMon]);

	const moSuaKhoi = (k: KhoiKienThuc) => {
		setDangSuaKhoi(k);
		setModalKhoi(true);
	};
	const moSuaMon = (m: MonHoc) => {
		setDangSuaMon(m);
		setModalMon(true);
	};

	const cotKhoi = [
		{ title: 'Tên Khối Kiến Thức', dataIndex: 'tenKhoi', key: 'tenKhoi' },
		{
			title: 'Thao tác',
			key: 'action',
			align: 'right' as const,
			width: 100,
			render: (_: any, r: KhoiKienThuc) => (
				<Space>
					<Button type='text' style={{ color: '#1890ff' }} icon={<EditOutlined />} onClick={() => moSuaKhoi(r)} />
					<Popconfirm title='Xóa?' onConfirm={() => xoaKhoi(r.id)}>
						<Button danger type='text' icon={<DeleteOutlined />} />
					</Popconfirm>
				</Space>
			),
		},
	];

	const cotMon = [
		{ title: 'Mã Môn', dataIndex: 'maMon', key: 'maMon' },
		{ title: 'Tên Môn', dataIndex: 'tenMon', key: 'tenMon' },
		{ title: 'Tín chỉ', dataIndex: 'soTinChi', key: 'soTinChi' },
		{
			title: 'Thao tác',
			key: 'action',
			align: 'right' as const,
			width: 100,
			render: (_: any, r: MonHoc) => (
				<Space>
					<Button type='text' style={{ color: '#1890ff' }} icon={<EditOutlined />} onClick={() => moSuaMon(r)} />
					<Popconfirm title='Xóa?' onConfirm={() => xoaMon(r.maMon)}>
						<Button danger type='text' icon={<DeleteOutlined />} />
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<Row gutter={16}>
			<Col span={10}>
				<Card
					title='Khối Kiến Thức'
					extra={
						<Button
							size='small'
							icon={<PlusOutlined />}
							onClick={() => {
								setDangSuaKhoi(null);
								setModalKhoi(true);
							}}
						>
							Thêm Khối
						</Button>
					}
				>
					<Table dataSource={dsKhoi} columns={cotKhoi} rowKey='id' pagination={false} size='small' />
				</Card>
			</Col>
			<Col span={14}>
				<Card
					title='Môn Học'
					extra={
						<Button
							size='small'
							icon={<PlusOutlined />}
							onClick={() => {
								setDangSuaMon(null);
								setModalMon(true);
							}}
						>
							Thêm Môn
						</Button>
					}
				>
					<Table dataSource={dsMon} columns={cotMon} rowKey='maMon' pagination={false} size='small' />
				</Card>
			</Col>

			<Modal
				title={dangSuaKhoi ? 'Sửa Khối Kiến Thức' : 'Thêm Khối Kiến Thức'}
				visible={modalKhoi}
				onCancel={() => setModalKhoi(false)}
				onOk={formKhoi.submit}
			>
				<Form
					form={formKhoi}
					onFinish={(v) => {
						luuKhoi({ id: dangSuaKhoi ? dangSuaKhoi.id : Date.now().toString(), tenKhoi: v.tenKhoi });
						setModalKhoi(false);
					}}
					layout='vertical'
				>
					<Form.Item name='tenKhoi' label='Tên khối' rules={[{ required: true }]}>
						<Input />
					</Form.Item>
				</Form>
			</Modal>

			<Modal
				title={dangSuaMon ? 'Sửa Môn Học' : 'Thêm Môn Học'}
				visible={modalMon}
				onCancel={() => setModalMon(false)}
				onOk={formMon.submit}
			>
				<Form
					form={formMon}
					onFinish={(v) => {
						luuMon(v);
						setModalMon(false);
					}}
					layout='vertical'
				>
					<Form.Item name='maMon' label='Mã Môn' rules={[{ required: true }]}>
						<Input disabled={!!dangSuaMon} placeholder='Mã môn không thể đổi sau khi tạo' />
					</Form.Item>
					<Form.Item name='tenMon' label='Tên Môn' rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item name='soTinChi' label='Số tín chỉ' rules={[{ required: true }]}>
						<InputNumber min={1} style={{ width: '100%' }} />
					</Form.Item>
				</Form>
			</Modal>
		</Row>
	);
};
