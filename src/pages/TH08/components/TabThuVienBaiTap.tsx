import React, { useState } from 'react';
import { Card, Col, Row, Button, Modal, Form, Input, InputNumber, Select, Tag, Space, Popconfirm, Empty, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, EyeOutlined } from '@ant-design/icons';
import type { IBaiTap } from '../types';
import { ENhomCo, EMucDoKho } from '../types';
import { DS_NHOM_CO, DS_MUC_DO_KHO, MAU_MUC_DO_KHO } from '../constants';
import { taoId } from '../utils';

interface Props {
	dsBaiTap: IBaiTap[];
	setDsBaiTap: (ds: IBaiTap[]) => void;
}

const TabThuVienBaiTap: React.FC<Props> = ({ dsBaiTap, setDsBaiTap }) => {
	const [modalFormVisible, setModalFormVisible] = useState(false);
	const [modalChiTietVisible, setModalChiTietVisible] = useState(false);
	const [editing, setEditing] = useState<IBaiTap | null>(null);
	const [chiTiet, setChiTiet] = useState<IBaiTap | null>(null);
	const [form] = Form.useForm();

	const [timKiem, setTimKiem] = useState('');
	const [locNhomCo, setLocNhomCo] = useState<ENhomCo | ''>('');
	const [locMucDo, setLocMucDo] = useState<EMucDoKho | ''>('');

	const moModalThem = () => {
		setEditing(null);
		form.resetFields();
		setModalFormVisible(true);
	};

	const moModalSua = (record: IBaiTap) => {
		setEditing(record);
		form.setFieldsValue(record);
		setModalFormVisible(true);
	};

	const moChiTiet = (record: IBaiTap) => {
		setChiTiet(record);
		setModalChiTietVisible(true);
	};

	const xuLyLuu = () => {
		form.validateFields().then((values) => {
			const duLieu: IBaiTap = {
				id: editing?.id || taoId(),
				tenBaiTap: values.tenBaiTap,
				nhomCo: values.nhomCo,
				mucDoKho: values.mucDoKho,
				moTaNgan: values.moTaNgan || '',
				huongDan: values.huongDan || '',
				caloDotTrungBinh: values.caloDotTrungBinh,
			};

			if (editing) {
				setDsBaiTap(dsBaiTap.map((bt) => (bt.id === editing.id ? duLieu : bt)));
				message.success('Đã cập nhật bài tập!');
			} else {
				setDsBaiTap([...dsBaiTap, duLieu]);
				message.success('Đã thêm bài tập mới!');
			}
			setModalFormVisible(false);
		});
	};

	const xuLyXoa = (id: string) => {
		setDsBaiTap(dsBaiTap.filter((bt) => bt.id !== id));
		message.success('Đã xóa bài tập!');
	};

	const duLieuHienThi = dsBaiTap.filter((bt) => {
		if (timKiem && !bt.tenBaiTap.toLowerCase().includes(timKiem.toLowerCase())) return false;
		if (locNhomCo && bt.nhomCo !== locNhomCo) return false;
		if (locMucDo && bt.mucDoKho !== locMucDo) return false;
		return true;
	});

	return (
		<div>
			<div style={{ marginBottom: 16, display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'space-between' }}>
				<Space wrap>
					<Input
						placeholder='Tìm theo tên bài tập...'
						prefix={<SearchOutlined />}
						allowClear
						onChange={(e) => setTimKiem(e.target.value)}
						style={{ width: 220 }}
					/>
					<Select
						placeholder='Lọc nhóm cơ'
						allowClear
						options={DS_NHOM_CO}
						onChange={(val) => setLocNhomCo(val || '')}
						style={{ width: 150 }}
					/>
					<Select
						placeholder='Lọc mức độ'
						allowClear
						options={DS_MUC_DO_KHO}
						onChange={(val) => setLocMucDo(val || '')}
						style={{ width: 140 }}
					/>
				</Space>
				<Button type='primary' icon={<PlusOutlined />} onClick={moModalThem}>
					Thêm bài tập
				</Button>
			</div>

			{duLieuHienThi.length > 0 ? (
				<Row gutter={[16, 16]}>
					{duLieuHienThi.map((bt) => (
						<Col xs={24} sm={12} lg={8} key={bt.id}>
							<Card
								hoverable
								onClick={() => moChiTiet(bt)}
								actions={[
									<EyeOutlined key='view' onClick={(e) => { e.stopPropagation(); moChiTiet(bt); }} />,
									<EditOutlined key='edit' onClick={(e) => { e.stopPropagation(); moModalSua(bt); }} />,
									<Popconfirm
										key='delete'
										title='Xóa bài tập này?'
										onConfirm={() => xuLyXoa(bt.id)}
										okText='Xóa'
										cancelText='Hủy'
									>
										<DeleteOutlined
											style={{ color: '#ff4d4f' }}
											onClick={(e) => e.stopPropagation()}
										/>
									</Popconfirm>,
								]}
							>
								<Card.Meta
									title={bt.tenBaiTap}
									description={
										<div>
											<div style={{ marginBottom: 8 }}>
												<Tag color='purple'>{bt.nhomCo}</Tag>
												<Tag color={MAU_MUC_DO_KHO[bt.mucDoKho]}>{bt.mucDoKho}</Tag>
											</div>
											<p style={{ color: '#666', fontSize: 13, marginBottom: 8 }}>{bt.moTaNgan}</p>
											<div style={{ color: '#fa541c', fontWeight: 600 }}>
												🔥 {bt.caloDotTrungBinh} kcal/giờ
											</div>
										</div>
									}
								/>
							</Card>
						</Col>
					))}
				</Row>
			) : (
				<Empty description='Không tìm thấy bài tập nào' />
			)}

			{/* Modal chi tiết */}
			<Modal
				title={chiTiet?.tenBaiTap}
				visible={modalChiTietVisible}
				onCancel={() => setModalChiTietVisible(false)}
				footer={[
					<Button key='close' onClick={() => setModalChiTietVisible(false)}>
						Đóng
					</Button>,
				]}
				width={500}
			>
				{chiTiet && (
					<div>
						<div style={{ marginBottom: 12 }}>
							<Tag color='purple'>{chiTiet.nhomCo}</Tag>
							<Tag color={MAU_MUC_DO_KHO[chiTiet.mucDoKho]}>{chiTiet.mucDoKho}</Tag>
							<Tag color='volcano'>🔥 {chiTiet.caloDotTrungBinh} kcal/giờ</Tag>
						</div>
						<p style={{ color: '#666' }}>{chiTiet.moTaNgan}</p>
						<h4 style={{ marginTop: 16 }}>Hướng dẫn thực hiện:</h4>
						<div style={{ whiteSpace: 'pre-line', background: '#f6f6f6', padding: 16, borderRadius: 8, lineHeight: 1.8 }}>
							{chiTiet.huongDan}
						</div>
					</div>
				)}
			</Modal>

			{/* Modal thêm/sửa */}
			<Modal
				title={editing ? 'Sửa bài tập' : 'Thêm bài tập mới'}
				visible={modalFormVisible}
				onOk={xuLyLuu}
				onCancel={() => setModalFormVisible(false)}
				okText='Lưu'
				cancelText='Hủy'
				destroyOnClose
				width={520}
			>
				<Form form={form} layout='vertical'>
					<Form.Item name='tenBaiTap' label='Tên bài tập' rules={[{ required: true, message: 'Nhập tên!' }]}>
						<Input placeholder='VD: Push-up' />
					</Form.Item>
					<Form.Item name='nhomCo' label='Nhóm cơ tác động' rules={[{ required: true, message: 'Chọn nhóm cơ!' }]}>
						<Select options={DS_NHOM_CO} placeholder='Chọn nhóm cơ' />
					</Form.Item>
					<Form.Item name='mucDoKho' label='Mức độ khó' rules={[{ required: true, message: 'Chọn mức độ!' }]}>
						<Select options={DS_MUC_DO_KHO} placeholder='Chọn mức độ' />
					</Form.Item>
					<Form.Item name='moTaNgan' label='Mô tả ngắn'>
						<Input.TextArea rows={2} placeholder='Mô tả ngắn gọn về bài tập' />
					</Form.Item>
					<Form.Item name='huongDan' label='Hướng dẫn chi tiết'>
						<Input.TextArea rows={4} placeholder='Các bước thực hiện chi tiết...' />
					</Form.Item>
					<Form.Item name='caloDotTrungBinh' label='Calo đốt trung bình/giờ' rules={[{ required: true, message: 'Nhập calo!' }]}>
						<InputNumber min={0} max={2000} style={{ width: '100%' }} />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default TabThuVienBaiTap;
