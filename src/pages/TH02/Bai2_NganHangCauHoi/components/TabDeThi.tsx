import React, { useState, useEffect } from 'react';
import {
	Card,
	Table,
	Button,
	Modal,
	Form,
	Input,
	Select,
	Space,
	Row,
	Col,
	message,
	Popconfirm,
	Typography,
	Tag,
} from 'antd';
import {
	PlusOutlined,
	MinusCircleOutlined,
	SettingOutlined,
	DeleteOutlined,
	EyeOutlined,
	EditOutlined,
} from '@ant-design/icons';
import { CauTrucDe, MonHoc, KhoiKienThuc, CauHoi, DeThi } from '../types';
import { DANH_SACH_MUC_DO } from '../../constants';
import { sinhDeThiTuDong } from '../../utils/examGenerator';

const { Option } = Select;
const { Text, Title } = Typography;

interface Props {
	dsCauTruc: CauTrucDe[];
	dsDeThi: DeThi[];
	dsMon: MonHoc[];
	dsKhoi: KhoiKienThuc[];
	dsCauHoi: CauHoi[];
	luuCauTruc: (ct: CauTrucDe) => void;
	xoaCauTruc: (id: string) => void;
	luuDeThi: (dt: DeThi) => void;
}

export const TabDeThi: React.FC<Props> = ({
	dsCauTruc,
	dsDeThi,
	dsMon,
	dsKhoi,
	dsCauHoi,
	luuCauTruc,
	xoaCauTruc,
	luuDeThi,
}) => {
	const [modalCT, setModalCT] = useState(false);
	const [dangSuaCT, setDangSuaCT] = useState<CauTrucDe | null>(null);
	const [formCT] = Form.useForm();

	const [modalChiTiet, setModalChiTiet] = useState(false);
	const [deThiDangXem, setDeThiDangXem] = useState<DeThi | null>(null);

	useEffect(() => {
		if (modalCT) {
			if (dangSuaCT) formCT.setFieldsValue(dangSuaCT);
			else formCT.resetFields();
		}
	}, [modalCT, dangSuaCT, formCT]);

	const luuCT = (values: any) => {
		luuCauTruc({ id: dangSuaCT ? dangSuaCT.id : Date.now().toString(), ...values });
		setModalCT(false);
	};

	const taoDeThi = (cauTruc: CauTrucDe) => {
		const ketQua = sinhDeThiTuDong(cauTruc, dsCauHoi, dsKhoi);
		if (!ketQua.thanhCong) {
			message.error(ketQua.thongBao);
			return;
		}
		const tenM = dsMon.find((m) => m.maMon === cauTruc.maMon)?.tenMon;
		luuDeThi({
			id: Date.now().toString(),
			tenDe: `Đề thi ${tenM} - ${new Date().toLocaleTimeString()}`,
			maMon: cauTruc.maMon,
			cauTrucId: cauTruc.id,
			danhSachCauHoi: ketQua.data || [],
			ngayTao: new Date().toLocaleString(),
		});
		message.success(ketQua.thongBao);
	};

	const cotCT = [
		{ title: 'Tên Cấu Trúc', dataIndex: 'tenCauTruc', key: 'tenCauTruc' },
		{ title: 'Môn Học', dataIndex: 'maMon', key: 'maMon' },
		{
			title: 'Thao tác',
			key: 'action',
			align: 'right' as const,
			render: (_: any, r: CauTrucDe) => (
				<Space>
					<Button type='primary' size='small' icon={<SettingOutlined />} onClick={() => taoDeThi(r)}>
						Sinh Đề
					</Button>
					<Button
						size='small'
						style={{ color: '#1890ff' }}
						icon={<EditOutlined />}
						onClick={() => {
							setDangSuaCT(r);
							setModalCT(true);
						}}
					/>
					<Popconfirm title='Xóa cấu trúc này?' onConfirm={() => xoaCauTruc(r.id)}>
						<Button danger size='small' icon={<DeleteOutlined />} />
					</Popconfirm>
				</Space>
			),
		},
	];

	const cotDT = [
		{ title: 'Tên Đề Thi', dataIndex: 'tenDe', key: 'tenDe' },
		{ title: 'Ngày tạo', dataIndex: 'ngayTao', key: 'ngayTao' },
		{ title: 'Tổng câu', key: 'tong', render: (_: any, r: DeThi) => r.danhSachCauHoi.length },
		{
			title: 'Thao tác',
			key: 'action',
			align: 'right' as const,
			render: (_: any, r: DeThi) => (
				<Button
					size='small'
					icon={<EyeOutlined />}
					onClick={() => {
						setDeThiDangXem(r);
						setModalChiTiet(true);
					}}
				>
					Xem
				</Button>
			),
		},
	];

	return (
		<Row gutter={16}>
			<Col span={12}>
				<Card
					title='Cấu Trúc Đề Thi'
					extra={
						<Button
							size='small'
							icon={<PlusOutlined />}
							onClick={() => {
								setDangSuaCT(null);
								setModalCT(true);
							}}
						>
							Tạo Cấu Trúc
						</Button>
					}
				>
					<Table dataSource={dsCauTruc} columns={cotCT} rowKey='id' pagination={false} size='small' />
				</Card>
			</Col>
			<Col span={12}>
				<Card title='Danh Sách Đề Thi Đã Sinh'>
					<Table dataSource={dsDeThi} columns={cotDT} rowKey='id' pagination={false} size='small' />
				</Card>
			</Col>

			<Modal
				title={dangSuaCT ? 'Sửa Cấu Trúc Đề' : 'Tạo Cấu Trúc Đề Thi'}
				visible={modalCT}
				onCancel={() => setModalCT(false)}
				onOk={formCT.submit}
				width={800}
			>
				<Form form={formCT} layout='vertical' onFinish={luuCT}>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item name='tenCauTruc' label='Tên cấu trúc' rules={[{ required: true }]}>
								<Input />
							</Form.Item>
						</Col>
						<Col span={12}>
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
					</Row>

					<Form.List name='dieuKien' initialValue={[{}]}>
						{(fields, { add, remove }) => (
							<>
								{fields.map(({ key, name, fieldKey, ...restField }) => (
									<Space key={key} style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
										<Form.Item
											{...restField}
											name={[name, 'khoiKienThucId']}
											rules={[{ required: true, message: 'Chọn khối' }]}
										>
											<Select placeholder='Khối kiến thức' style={{ width: 200 }}>
												{dsKhoi.map((k) => (
													<Option key={k.id} value={k.id}>
														{k.tenKhoi}
													</Option>
												))}
											</Select>
										</Form.Item>
										<Form.Item
											{...restField}
											name={[name, 'mucDo']}
											rules={[{ required: true, message: 'Chọn mức độ' }]}
										>
											<Select placeholder='Mức độ' style={{ width: 120 }}>
												{DANH_SACH_MUC_DO.map((m: string) => (
													<Option key={m} value={m}>
														{m}
													</Option>
												))}
											</Select>
										</Form.Item>
										<Form.Item
											{...restField}
											name={[name, 'soLuong']}
											rules={[{ required: true, message: 'Nhập số lượng' }]}
										>
											<Input type='number' placeholder='Số lượng' min={1} style={{ width: 100 }} />
										</Form.Item>
										<MinusCircleOutlined onClick={() => remove(name)} style={{ color: 'red' }} />
									</Space>
								))}
								<Form.Item>
									<Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
										Thêm điều kiện
									</Button>
								</Form.Item>
							</>
						)}
					</Form.List>
				</Form>
			</Modal>

			{/* Modal Chi tiết đề thi ĐÃ ĐƯỢC BỔ SUNG RUỘT */}
			<Modal
				title={
					<Title level={4} style={{ margin: 0 }}>
						{deThiDangXem?.tenDe}
					</Title>
				}
				visible={modalChiTiet}
				onCancel={() => setModalChiTiet(false)}
				footer={[
					<Button key='dong' onClick={() => setModalChiTiet(false)}>
						Đóng
					</Button>,
				]}
				width={900}
				bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
			>
				<div style={{ marginBottom: 20 }}>
					<Text strong>Môn học: </Text> <Text>{dsMon.find((m) => m.maMon === deThiDangXem?.maMon)?.tenMon}</Text>
					<br />
					<Text strong>Ngày tạo: </Text> <Text>{deThiDangXem?.ngayTao}</Text>
				</div>

				{deThiDangXem?.danhSachCauHoi.map((cauHoi, index) => (
					<div
						key={cauHoi.id}
						style={{
							marginBottom: 24,
							padding: 16,
							border: '1px solid #f0f0f0',
							borderRadius: 8,
							background: '#fafafa',
						}}
					>
						<div style={{ marginBottom: 12 }}>
							<Text strong style={{ fontSize: 16 }}>
								Câu {index + 1}:{' '}
							</Text>
							<Text style={{ fontSize: 16 }}>{cauHoi.noiDung}</Text>
							<div style={{ marginTop: 8 }}>
								<Tag color='blue'>{cauHoi.mucDo}</Tag>
								<Tag color={cauHoi.loaiCauHoi === 'Trắc nghiệm' ? 'cyan' : 'purple'}>{cauHoi.loaiCauHoi}</Tag>
							</div>
						</div>

						{cauHoi.loaiCauHoi === 'Trắc nghiệm' ? (
							<div style={{ paddingLeft: 20 }}>
								<Row gutter={[16, 8]}>
									<Col span={12}>
										<Text
											strong={cauHoi.dapAnDung === 'A'}
											style={{ color: cauHoi.dapAnDung === 'A' ? '#52c41a' : 'inherit' }}
										>
											A. {cauHoi.dapAnA} {cauHoi.dapAnDung === 'A' && '(Đáp án đúng)'}
										</Text>
									</Col>
									<Col span={12}>
										<Text
											strong={cauHoi.dapAnDung === 'B'}
											style={{ color: cauHoi.dapAnDung === 'B' ? '#52c41a' : 'inherit' }}
										>
											B. {cauHoi.dapAnB} {cauHoi.dapAnDung === 'B' && '(Đáp án đúng)'}
										</Text>
									</Col>
									<Col span={12}>
										<Text
											strong={cauHoi.dapAnDung === 'C'}
											style={{ color: cauHoi.dapAnDung === 'C' ? '#52c41a' : 'inherit' }}
										>
											C. {cauHoi.dapAnC} {cauHoi.dapAnDung === 'C' && '(Đáp án đúng)'}
										</Text>
									</Col>
									<Col span={12}>
										<Text
											strong={cauHoi.dapAnDung === 'D'}
											style={{ color: cauHoi.dapAnDung === 'D' ? '#52c41a' : 'inherit' }}
										>
											D. {cauHoi.dapAnD} {cauHoi.dapAnDung === 'D' && '(Đáp án đúng)'}
										</Text>
									</Col>
								</Row>
							</div>
						) : (
							<div style={{ paddingLeft: 20, paddingTop: 10, borderTop: '1px dashed #d9d9d9' }}>
								<Text strong style={{ color: '#1890ff' }}>
									Đáp án gợi ý / Thang điểm:
								</Text>
								<div style={{ whiteSpace: 'pre-wrap', marginTop: 8 }}>{cauHoi.dapAnTuLuan}</div>
							</div>
						)}
					</div>
				))}
			</Modal>
		</Row>
	);
};
