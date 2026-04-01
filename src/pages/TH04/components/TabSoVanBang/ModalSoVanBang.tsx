import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Modal, Spin } from 'antd';
import { SoVanBang } from '../../types';

interface Props {
	visible: boolean;
	onCancel: () => void;
	onSave: (val: any) => Promise<void>;
	editingItem: SoVanBang | null;
}

export const ModalSoVanBang: React.FC<Props> = ({ visible, onCancel, onSave, editingItem }) => {
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
			title={editingItem ? 'Sửa Sổ Văn Bằng' : 'Thêm Sổ Văn Bằng Mới'}
			visible={visible}
			onCancel={onCancel}
			onOk={form.submit}
			okText='Lưu Dữ Liệu'
			cancelText='Hủy'
			confirmLoading={loading}
		>
			<Spin spinning={loading} tip='Đang xử lý...'>
				<Form form={form} layout='vertical' onFinish={handleSubmit}>
					<Form.Item name='nam' label='Năm' rules={[{ required: true, message: 'Vui lòng nhập năm!' }]}>
						<InputNumber style={{ width: '100%' }} min={2000} max={2100} placeholder='VD: 2024' />
					</Form.Item>
					<Form.Item name='moTa' label='Mô tả' rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}>
						<Input.TextArea rows={3} placeholder='VD: Sổ văn bằng năm học 2023-2024' />
					</Form.Item>
				</Form>
			</Spin>
		</Modal>
	);
};
