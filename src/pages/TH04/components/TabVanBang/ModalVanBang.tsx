import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Modal, Select, Spin, Row, Col, Card } from 'antd';
import moment from 'moment';
import { ThongTinVanBang, QuyetDinhTotNghiep, SoVanBang, TruongThongTin, KieuDuLieu } from '../../types';
import MyDatePicker from '@/components/MyDatePicker';

interface Props {
	visible: boolean;
	onCancel: () => void;
	onSave: (val: any) => Promise<void>;
	editingItem: ThongTinVanBang | null;
	dsQuyetDinh: QuyetDinhTotNghiep[];
	dsSoVanBang: SoVanBang[];
	dsTruongThongTin: TruongThongTin[];
}

export const ModalVanBang: React.FC<Props> = ({ visible, onCancel, onSave, editingItem, dsQuyetDinh, dsSoVanBang, dsTruongThongTin }) => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [selectedQD, setSelectedQD] = useState<string | null>(null);

	useEffect(() => {
		if (!visible) return;
		if (editingItem) {
			const dongFields = Object.fromEntries(
				dsTruongThongTin.map((t) => {
					const v = editingItem.truongDongMap[t.id];
					return [`dong_${t.id}`, t.kieuDuLieu === KieuDuLieu.DATE && v ? moment(v) : v];
				})
			);
			form.setFieldsValue({ ...editingItem, ngaySinh: editingItem.ngaySinh ? moment(editingItem.ngaySinh) : undefined, ...dongFields });
			setSelectedQD(editingItem.quyetDinhId);
		} else {
			form.resetFields();
			setSelectedQD(null);
		}
	}, [visible, editingItem]);

	const handleSubmit = async (values: any) => {
		setLoading(true);
		await new Promise((r) => setTimeout(r, 300));
		await onSave({ ...values, quyetDinhId: selectedQD });
		setLoading(false);
	};

	const renderControl = (t: TruongThongTin) => {
		if (t.kieuDuLieu === KieuDuLieu.NUMBER) return <InputNumber style={{ width: '100%' }} placeholder={`Nhập ${t.tenTruong}`} />;
		if (t.kieuDuLieu === KieuDuLieu.DATE) return <MyDatePicker style={{ width: '100%' }} format='DD/MM/YYYY' />;
		return <Input placeholder={`Nhập ${t.tenTruong}`} />;
	};

	return (
		<Modal title={editingItem ? 'Sửa Văn Bằng' : 'Thêm Văn Bằng'} visible={visible} onCancel={onCancel}
			onOk={form.submit} okText='Lưu' cancelText='Hủy' confirmLoading={loading} width={720} destroyOnClose>
			<Spin spinning={loading}>
				<Form form={form} layout='vertical' onFinish={handleSubmit}>
					<Card size='small' title='Quyết Định' style={{ marginBottom: 12 }}>
						<Row gutter={12}>
							<Col xs={24} md={editingItem ? 16 : 24}>
								<Form.Item name='quyetDinhId' label='Quyết định tốt nghiệp' rules={[{ required: true, message: 'Chọn quyết định!' }]}>
									<Select placeholder='-- Chọn --' disabled={!!editingItem} onChange={(v) => setSelectedQD(v)} showSearch optionFilterProp='children'>
										{dsQuyetDinh.map((q) => {
											const so = dsSoVanBang.find((s) => s.id === q.soVanBangId);
											return <Select.Option key={q.id} value={q.id}>{q.soQD} – {so ? `Sổ ${so.nam}` : '?'}</Select.Option>;
										})}
									</Select>
								</Form.Item>
							</Col>
							{editingItem && (
								<Col xs={24} md={8}>
									<Form.Item label='Số vào sổ'>
										<InputNumber value={editingItem.soVaoSo} disabled style={{ width: '100%', fontWeight: 'bold' }} />
									</Form.Item>
								</Col>
							)}
						</Row>
					</Card>

					<Card size='small' title='Thông Tin Cơ Bản' style={{ marginBottom: 12 }}>
						<Row gutter={12}>
							<Col xs={24} md={12}><Form.Item name='maSinhVien' label='Mã SV' rules={[{ required: true, message: 'Nhập mã SV!' }]}><Input placeholder='21IT001' /></Form.Item></Col>
							<Col xs={24} md={12}><Form.Item name='soHieuVanBang' label='Số hiệu VB' rules={[{ required: true, message: 'Nhập số hiệu!' }]}><Input placeholder='VB2024-001' /></Form.Item></Col>
							<Col xs={24} md={14}><Form.Item name='hoTen' label='Họ tên' rules={[{ required: true, message: 'Nhập họ tên!' }]}><Input placeholder='Nguyễn Văn A' /></Form.Item></Col>
							<Col xs={24} md={10}><Form.Item name='ngaySinh' label='Ngày sinh' rules={[{ required: true, message: 'Chọn ngày!' }]}>
								<MyDatePicker style={{ width: '100%' }} format='DD/MM/YYYY' disabledDate={(c: any) => c && moment(c).isAfter(moment())} />
							</Form.Item></Col>
						</Row>
					</Card>

					{dsTruongThongTin.length > 0 && (
						<Card size='small' title='Thông Tin Bổ Sung'>
							<Row gutter={12}>
								{dsTruongThongTin.map((t) => (
									<Col xs={24} md={12} key={t.id}>
										<Form.Item name={`dong_${t.id}`} label={t.tenTruong}>{renderControl(t)}</Form.Item>
									</Col>
								))}
							</Row>
						</Card>
					)}
				</Form>
			</Spin>
		</Modal>
	);
};
