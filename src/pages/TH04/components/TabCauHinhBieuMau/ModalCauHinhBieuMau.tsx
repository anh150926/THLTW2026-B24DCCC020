import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select, Spin } from 'antd';
import { TruongThongTin } from '../../types';
import { KIEU_DU_LIEU_OPTIONS } from '../../constants';

interface Props {
	visible: boolean;
	onCancel: () => void;
	onSave: (val: any) => Promise<void>;
	editingItem: TruongThongTin | null;
}

export const ModalCauHinhBieuMau: React.FC<Props> = ({ visible, onCancel, onSave, editingItem }) => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (visible) {
			if (editingItem) form.setFieldsValue(editingItem);
			else form.resetFields();
		}
	}, [visible, editingItem, form]);

	const handleSubmit = async (values: any) => {
		setLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 300));
		await onSave(values);
		setLoading(false);
	};

	return (
		<Modal
			title={editingItem ? 'Sửa Trường Thông Tin' : 'Thêm Trường Thông Tin'}
			visible={visible}
			onCancel={onCancel}
			onOk={form.submit}
			okText='Lưu Dữ Liệu'
			cancelText='Hủy'
			confirmLoading={loading}
		>
			<Spin spinning={loading} tip='Đang xử lý...'>
				<Form form={form} layout='vertical' onFinish={handleSubmit}>
					<Form.Item name='tenTruong' label='Tên trường' rules={[{ required: true, whitespace: true, message: 'Vui lòng nhập tên trường hợp lệ!' }]}>
						<Input placeholder='VD: Dân tộc, Điểm trung bình, Ngày nhập học...' />
					</Form.Item>
					<Form.Item name='kieuDuLieu' label='Kiểu dữ liệu' rules={[{ required: true, message: 'Chọn kiểu dữ liệu!' }]}>
						<Select placeholder='Chọn kiểu dữ liệu' options={KIEU_DU_LIEU_OPTIONS} />
					</Form.Item>
				</Form>
			</Spin>
		</Modal>
	);
};
