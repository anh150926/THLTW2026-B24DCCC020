import React, { useState } from 'react';
import {
	Card,
	Col,
	Row,
	Button,
	Drawer,
	Form,
	Input,
	InputNumber,
	Select,
	DatePicker,
	Tag,
	Progress,
	Popconfirm,
	Empty,
	Badge,
	message,
} from 'antd';
import { PlusOutlined, DeleteOutlined, TrophyOutlined } from '@ant-design/icons';
import moment from 'moment';
import type { IMucTieu } from '../types';
import { ETrangThaiMucTieu, ELoaiMucTieu } from '../types';
import { DS_LOAI_MUC_TIEU, MAU_TRANG_THAI_MUC_TIEU } from '../constants';
import { taoId, tinhPhanTramMucTieu } from '../utils';

interface Props {
	dsMucTieu: IMucTieu[];
	setDsMucTieu: (ds: IMucTieu[]) => void;
}

const DS_LOC_TRANG_THAI = [
	{ label: 'Tất cả', value: 'all' },
	{ label: 'Đang thực hiện', value: ETrangThaiMucTieu.DangThucHien },
	{ label: 'Đã đạt', value: ETrangThaiMucTieu.DaDat },
	{ label: 'Đã hủy', value: ETrangThaiMucTieu.DaHuy },
];

const TabMucTieu: React.FC<Props> = ({ dsMucTieu, setDsMucTieu }) => {
	const [drawerVisible, setDrawerVisible] = useState(false);
	const [locTrangThai, setLocTrangThai] = useState<string>('all');
	const [form] = Form.useForm();

	const moDrawer = () => {
		form.resetFields();
		form.setFieldsValue({ trangThai: ETrangThaiMucTieu.DangThucHien, giaTriHienTai: 0 });
		setDrawerVisible(true);
	};

	const xuLyThem = () => {
		form.validateFields().then((values) => {
			const mucTieuMoi: IMucTieu = {
				id: taoId(),
				tenMucTieu: values.tenMucTieu,
				loai: values.loai,
				giaTriMucTieu: values.giaTriMucTieu,
				giaTriHienTai: values.giaTriHienTai || 0,
				donVi: values.donVi,
				deadline: values.deadline.format('YYYY-MM-DD'),
				trangThai: values.trangThai,
			};
			setDsMucTieu([...dsMucTieu, mucTieuMoi]);
			message.success('Đã thêm mục tiêu mới!');
			setDrawerVisible(false);
		});
	};

	const capNhatGiaTri = (id: string, giaTriMoi: number) => {
		setDsMucTieu(
			dsMucTieu.map((mt) => {
				if (mt.id !== id) return mt;
				const updated = { ...mt, giaTriHienTai: giaTriMoi };
				if (giaTriMoi >= mt.giaTriMucTieu && mt.trangThai === ETrangThaiMucTieu.DangThucHien) {
					updated.trangThai = ETrangThaiMucTieu.DaDat;
					message.success(`Chúc mừng! Bạn đã đạt mục tiêu "${mt.tenMucTieu}"!`);
				}
				return updated;
			}),
		);
	};

	const xuLyXoa = (id: string) => {
		setDsMucTieu(dsMucTieu.filter((mt) => mt.id !== id));
		message.success('Đã xóa mục tiêu!');
	};

	const duLieuHienThi = locTrangThai === 'all' ? dsMucTieu : dsMucTieu.filter((mt) => mt.trangThai === locTrangThai);

	const layMauProgress = (phanTram: number) => {
		if (phanTram >= 100) return '#52c41a';
		if (phanTram >= 60) return '#1890ff';
		if (phanTram >= 30) return '#faad14';
		return '#ff4d4f';
	};

	return (
		<div>
			<div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
				<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
					{DS_LOC_TRANG_THAI.map((item) => (
						<Button
							key={item.value}
							type={locTrangThai === item.value ? 'primary' : 'default'}
							onClick={() => setLocTrangThai(item.value)}
							size='middle'
						>
							{item.label}
						</Button>
					))}
				</div>
				<Button type='primary' icon={<PlusOutlined />} onClick={moDrawer}>
					Thêm mục tiêu
				</Button>
			</div>

			{duLieuHienThi.length > 0 ? (
				<Row gutter={[16, 16]}>
					{duLieuHienThi.map((mt) => {
						const phanTram = tinhPhanTramMucTieu(mt.giaTriMucTieu, mt.giaTriHienTai);
						return (
							<Col xs={24} sm={12} lg={8} key={mt.id}>
								<Badge.Ribbon
									text={mt.trangThai}
									color={
										mt.trangThai === ETrangThaiMucTieu.DaDat
											? 'green'
											: mt.trangThai === ETrangThaiMucTieu.DaHuy
											? 'gray'
											: 'blue'
									}
								>
									<Card
										hoverable
										actions={[
											<Popconfirm
												key='delete'
												title='Xóa mục tiêu này?'
												onConfirm={() => xuLyXoa(mt.id)}
												okText='Xóa'
												cancelText='Hủy'
											>
												<DeleteOutlined style={{ color: '#ff4d4f' }} />
											</Popconfirm>,
										]}
									>
										<Card.Meta
											avatar={<TrophyOutlined style={{ fontSize: 24, color: '#faad14' }} />}
											title={mt.tenMucTieu}
											description={
												<Tag color={mt.loai === ELoaiMucTieu.GiamCan ? 'volcano' : mt.loai === ELoaiMucTieu.TangCo ? 'geekblue' : mt.loai === ELoaiMucTieu.CaiThienSucBen ? 'cyan' : 'default'}>
													{mt.loai}
												</Tag>
											}
										/>
										<div style={{ marginTop: 16 }}>
											<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
												<span>Hiện tại:</span>
												<InputNumber
													size='small'
													value={mt.giaTriHienTai}
													min={0}
													step={0.1}
													onChange={(val) => val !== null && capNhatGiaTri(mt.id, val)}
													style={{ width: 80 }}
													disabled={mt.trangThai !== ETrangThaiMucTieu.DangThucHien}
												/>
												<span>/ {mt.giaTriMucTieu} {mt.donVi}</span>
											</div>
											<Progress
												percent={phanTram}
												strokeColor={layMauProgress(phanTram)}
												size='small'
											/>
											<div style={{ marginTop: 8, color: '#999', fontSize: 12 }}>
												Deadline: {moment(mt.deadline).format('DD/MM/YYYY')}
											</div>
										</div>
									</Card>
								</Badge.Ribbon>
							</Col>
						);
					})}
				</Row>
			) : (
				<Empty description='Không có mục tiêu nào' />
			)}

			<Drawer
				title='Thêm mục tiêu mới'
				visible={drawerVisible}
				onClose={() => setDrawerVisible(false)}
				width={400}
				footer={
					<div style={{ textAlign: 'right' }}>
						<Button onClick={() => setDrawerVisible(false)} style={{ marginRight: 8 }}>
							Hủy
						</Button>
						<Button type='primary' onClick={xuLyThem}>
							Thêm
						</Button>
					</div>
				}
			>
				<Form form={form} layout='vertical'>
					<Form.Item name='tenMucTieu' label='Tên mục tiêu' rules={[{ required: true, message: 'Nhập tên!' }]}>
						<Input placeholder='VD: Giảm cân về 70kg' />
					</Form.Item>
					<Form.Item name='loai' label='Loại mục tiêu' rules={[{ required: true, message: 'Chọn loại!' }]}>
						<Select options={DS_LOAI_MUC_TIEU} placeholder='Chọn loại' />
					</Form.Item>
					<Form.Item name='giaTriMucTieu' label='Giá trị mục tiêu' rules={[{ required: true, message: 'Nhập giá trị!' }]}>
						<InputNumber min={0} style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name='giaTriHienTai' label='Giá trị hiện tại'>
						<InputNumber min={0} style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name='donVi' label='Đơn vị' rules={[{ required: true, message: 'Nhập đơn vị!' }]}>
						<Input placeholder='VD: kg, km, buổi...' />
					</Form.Item>
					<Form.Item name='deadline' label='Deadline' rules={[{ required: true, message: 'Chọn deadline!' }]}>
						<DatePicker format='DD/MM/YYYY' style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name='trangThai' label='Trạng thái'>
						<Select
							options={[
								{ label: 'Đang thực hiện', value: ETrangThaiMucTieu.DangThucHien },
								{ label: 'Đã đạt', value: ETrangThaiMucTieu.DaDat },
								{ label: 'Đã hủy', value: ETrangThaiMucTieu.DaHuy },
							]}
						/>
					</Form.Item>
				</Form>
			</Drawer>
		</div>
	);
};

export default TabMucTieu;
