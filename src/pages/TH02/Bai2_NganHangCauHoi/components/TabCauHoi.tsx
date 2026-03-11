import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Form, Input, Select, Popconfirm, Tag, Row, Col, Space } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { CauHoi, MonHoc, KhoiKienThuc } from '../types';
import { DANH_SACH_MUC_DO } from '../../constants';

const { Option } = Select;

interface Props {
	dsCauHoi: CauHoi[];
	dsMon: MonHoc[];
	dsKhoi: KhoiKienThuc[];
	luuCauHoi: (c: CauHoi) => void;
	xoaCauHoi: (id: string) => void;
}

export const TabCauHoi: React.FC<Props> = ({ dsCauHoi, dsMon, dsKhoi, luuCauHoi, xoaCauHoi }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [dangSuaCH, setDangSuaCH] = useState<CauHoi | null>(null);

	const [locMon, setLocMon] = useState<string>('');
	const [locMucDo, setLocMucDo] = useState<string>('');
	const [locKhoi, setLocKhoi] = useState<string>('');
	const [loaiCauHoi, setLoaiCauHoi] = useState<'Trắc nghiệm' | 'Tự luận'>('Trắc nghiệm');
	const [form] = Form.useForm();

	// Đổ dữ liệu vào form khi mở Modal Sửa
	useEffect(() => {
		if (modalVisible) {
			if (dangSuaCH) {
				form.setFieldsValue(dangSuaCH);
				setLoaiCauHoi(dangSuaCH.loaiCauHoi);
			} else {
				form.resetFields();
				setLoaiCauHoi('Trắc nghiệm');
			}
		}
	}, [modalVisible, dangSuaCH, form]);

	const xuLyLuu = (values: any) => {
		luuCauHoi({ id: dangSuaCH ? dangSuaCH.id : Date.now().toString(), ...values });
		setModalVisible(false);
	};

	const dlHienThi = dsCauHoi.filter(
		(c) =>
			(!locMon || c.maMon === locMon) &&
			(!locMucDo || c.mucDo === locMucDo) &&
			(!locKhoi || c.khoiKienThucId === locKhoi),
	);

	const columns = [
		{ title: 'Mã CH', dataIndex: 'maCauHoi', key: 'maCauHoi', width: 90 },
		{
			title: 'Loại',
			dataIndex: 'loaiCauHoi',
			key: 'loaiCauHoi',
			width: 120,
			render: (l: string) => <Tag color={l === 'Trắc nghiệm' ? 'cyan' : 'purple'}>{l}</Tag>,
		},
		{ title: 'Nội dung', dataIndex: 'noiDung', key: 'noiDung' },
		{
			title: 'Mức độ',
			dataIndex: 'mucDo',
			key: 'mucDo',
			width: 100,
			render: (m: string) => <Tag color='blue'>{m}</Tag>,
		},
		{
			title: 'Thao tác',
			key: 'action',
			align: 'right' as const,
			width: 100,
			render: (_: any, r: CauHoi) => (
				<Space>
					<Button
						type='text'
						style={{ color: '#1890ff' }}
						icon={<EditOutlined />}
						onClick={() => {
							setDangSuaCH(r);
							setModalVisible(true);
						}}
					/>
					<Popconfirm title='Xóa câu hỏi này?' onConfirm={() => xoaCauHoi(r.id)}>
						<Button danger type='text' icon={<DeleteOutlined />} />
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<Card>
			<Row gutter={16} style={{ marginBottom: 16 }}>
				<Col span={5}>
					<Select placeholder='Môn học' allowClear style={{ width: '100%' }} onChange={setLocMon}>
						{dsMon.map((m) => (
							<Option key={m.maMon} value={m.maMon}>
								{m.tenMon}
							</Option>
						))}
					</Select>
				</Col>
				<Col span={5}>
					<Select placeholder='Khối kiến thức' allowClear style={{ width: '100%' }} onChange={setLocKhoi}>
						{dsKhoi.map((k) => (
							<Option key={k.id} value={k.id}>
								{k.tenKhoi}
							</Option>
						))}
					</Select>
				</Col>
				<Col span={5}>
					<Select placeholder='Mức độ' allowClear style={{ width: '100%' }} onChange={setLocMucDo}>
						{DANH_SACH_MUC_DO.map((m: string) => (
							<Option key={m} value={m}>
								{m}
							</Option>
						))}
					</Select>
				</Col>
				<Col span={9} style={{ textAlign: 'right' }}>
					<Button
						type='primary'
						icon={<PlusOutlined />}
						onClick={() => {
							setDangSuaCH(null);
							setModalVisible(true);
						}}
					>
						Thêm Câu Hỏi
					</Button>
				</Col>
			</Row>

			<Table dataSource={dlHienThi} columns={columns} rowKey='id' />

			<Modal
				title={dangSuaCH ? 'Sửa Câu Hỏi' : 'Thêm Câu Hỏi Mới'}
				visible={modalVisible}
				onCancel={() => setModalVisible(false)}
				onOk={form.submit}
				width={800}
			>
				<Form form={form} layout='vertical' onFinish={xuLyLuu} initialValues={{ loaiCauHoi: 'Trắc nghiệm' }}>
					<Row gutter={16}>
						<Col span={6}>
							<Form.Item name='maCauHoi' label='Mã CH' rules={[{ required: true }]}>
								<Input />
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item name='maMon' label='Môn Học' rules={[{ required: true }]}>
								<Select>
									{dsMon.map((m) => (
										<Option key={m.maMon} value={m.maMon}>
											{m.tenMon}
										</Option>
									))}
								</Select>
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item name='khoiKienThucId' label='Khối Kiến Thức' rules={[{ required: true }]}>
								<Select>
									{dsKhoi.map((k) => (
										<Option key={k.id} value={k.id}>
											{k.tenKhoi}
										</Option>
									))}
								</Select>
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item name='mucDo' label='Mức độ' rules={[{ required: true }]}>
								<Select>
									{DANH_SACH_MUC_DO.map((m: string) => (
										<Option key={m} value={m}>
											{m}
										</Option>
									))}
								</Select>
							</Form.Item>
						</Col>
					</Row>

					<Form.Item name='loaiCauHoi' label='Loại câu hỏi'>
						<Select onChange={(val) => setLoaiCauHoi(val as 'Trắc nghiệm' | 'Tự luận')}>
							<Option value='Trắc nghiệm'>Trắc nghiệm</Option>
							<Option value='Tự luận'>Tự luận</Option>
						</Select>
					</Form.Item>

					<Form.Item name='noiDung' label='Nội dung câu hỏi' rules={[{ required: true }]}>
						<Input.TextArea rows={3} />
					</Form.Item>

					{loaiCauHoi === 'Trắc nghiệm' ? (
						<div style={{ background: '#fafafa', padding: 15, borderRadius: 8, border: '1px solid #f0f0f0' }}>
							<p style={{ fontWeight: 600, marginBottom: 10 }}>Thiết lập đáp án trắc nghiệm:</p>
							<Row gutter={16}>
								<Col span={12}>
									<Form.Item name='dapAnA' label='Đáp án A' rules={[{ required: true }]}>
										<Input />
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item name='dapAnB' label='Đáp án B' rules={[{ required: true }]}>
										<Input />
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={16}>
								<Col span={12}>
									<Form.Item name='dapAnC' label='Đáp án C' rules={[{ required: true }]}>
										<Input />
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item name='dapAnD' label='Đáp án D' rules={[{ required: true }]}>
										<Input />
									</Form.Item>
								</Col>
							</Row>
							<Form.Item name='dapAnDung' label='Phương án đúng' rules={[{ required: true }]}>
								<Select style={{ width: 150 }}>
									<Option value='A'>Đáp án A</Option>
									<Option value='B'>Đáp án B</Option>
									<Option value='C'>Đáp án C</Option>
									<Option value='D'>Đáp án D</Option>
								</Select>
							</Form.Item>
						</div>
					) : (
						<div style={{ background: '#fafafa', padding: 15, borderRadius: 8, border: '1px solid #f0f0f0' }}>
							<p style={{ fontWeight: 600, marginBottom: 10 }}>Thiết lập đáp án tự luận:</p>
							<Form.Item name='dapAnTuLuan' label='Đáp án gợi ý / Thang điểm' rules={[{ required: true }]}>
								<Input.TextArea rows={4} placeholder='Nhập hướng dẫn chấm...' />
							</Form.Item>
						</div>
					)}
				</Form>
			</Modal>
		</Card>
	);
};
