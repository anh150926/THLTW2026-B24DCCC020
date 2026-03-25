import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select, Row, Col, Spin } from 'antd';
import moment from 'moment';
import { QuyetDinhTotNghiep, SoVanBang } from '../../types';
import MyDatePicker from '@/components/MyDatePicker';

interface Props {
	visible: boolean;
	onCancel: () => void;
	onSave: (val: any) => Promise<void>;
	editingItem: QuyetDinhTotNghiep | null;
	dsSoVanBang: SoVanBang[];
}

export const ModalQuyetDinh: React.FC<Props> = ({ visible, onCancel, onSave, editingItem, dsSoVanBang }) => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (visible) {
			if (editingItem) {
				form.setFieldsValue({
					...editingItem,
					ngayBanHanh: editingItem.ngayBanHanh ? moment(editingItem.ngayBanHanh) : undefined,
				});
			} else {
				form.resetFields();
			}
		}
	}, [visible, editingItem, form]);

	const handleSubmit = async (values: any) => {
		setLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 300));

		const payload = {
			...values,
			ngayBanHanh: values.ngayBanHanh ? moment(values.ngayBanHanh).format('YYYY-MM-DD') : '',
		};
		await onSave(payload);
		setLoading(false);
	};

	return (
		<Modal
			title={editingItem ? 'Sửa Quyết Định Tốt Nghiệp' : 'Thêm Quyết Định Tốt Nghiệp'}
			visible={visible}
			onCancel={onCancel}
			onOk={form.submit}
			okText='Lưu Dữ Liệu'
			cancelText='Hủy'
			confirmLoading={loading}
			width={650}
		>
			<Spin spinning={loading} tip='Đang xử lý...'>
				<Form form={form} layout='vertical' onFinish={handleSubmit}>
					<Row gutter={16}>
						<Col xs={24} sm={12}>
							<Form.Item name='soQD' label='Số quyết định' rules={[{ required: true, message: 'Nhập số QĐ!' }]}>
								<Input placeholder='VD: 12/QĐ-ĐHSP' />
							</Form.Item>
						</Col>
						<Col xs={24} sm={12}>
							<Form.Item name='ngayBanHanh' label='Ngày ban hành' rules={[{ required: true, message: 'Chọn ngày!' }]}>
								<MyDatePicker style={{ width: '100%' }} format='DD/MM/YYYY' />
							</Form.Item>
						</Col>
					</Row>

					<Form.Item name='soVanBangId' label='Chọn Sổ Văn Bằng' rules={[{ required: true, message: 'Vui lòng chọn sổ!' }]}>
						<Select placeholder='Chọn sổ văn bằng lưu trữ' showSearch optionFilterProp='children'>
							{dsSoVanBang.map((s) => (
								<Select.Option key={s.id} value={s.id}>
									Năm {s.nam} – {s.moTa}
								</Select.Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item name='trichYeu' label='Trích yếu' rules={[{ required: true, message: 'Nhập trích yếu!' }]}>
						<Input.TextArea rows={3} placeholder='VD: V/v công nhận tốt nghiệp đợt 1/2024 (150 sinh viên)' />
					</Form.Item>
				</Form>
			</Spin>
		</Modal>
	);
};
