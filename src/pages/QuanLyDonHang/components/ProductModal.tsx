import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select } from 'antd';

interface ProductModalProps {
	visible: boolean;
	onCancel: () => void;
	onSubmit: (values: any) => void;
	duLieuSua?: any;
}

const ProductModal: React.FC<ProductModalProps> = ({ visible, onCancel, onSubmit, duLieuSua }) => {
	const [form] = Form.useForm();

	useEffect(() => {
		if (visible) {
			form.resetFields();
			if (duLieuSua) form.setFieldsValue(duLieuSua);
		}
	}, [visible, duLieuSua, form]);

	return (
		<Modal
			title={duLieuSua ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}
			visible={visible}
			onCancel={onCancel}
			onOk={() => form.submit()}
			okText='Lưu'
			cancelText='Hủy'
		>
			<Form form={form} layout='vertical' onFinish={onSubmit}>
				<Form.Item name='tenSanPham' label='Tên sản phẩm' rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
					<Input />
				</Form.Item>
				<Form.Item name='danhMuc' label='Danh mục' rules={[{ required: true, message: 'Chọn danh mục' }]}>
					<Select>
						{['Laptop', 'Điện thoại', 'Máy tính bảng', 'Phụ kiện'].map((c) => (
							<Select.Option key={c} value={c}>
								{c}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item
					name='gia'
					label='Giá bán (VNĐ)'
					rules={[{ required: true, type: 'number', min: 0, message: 'Giá phải lớn hơn 0' }]}
				>
					<InputNumber style={{ width: '100%' }} formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
				</Form.Item>
				<Form.Item
					name='soLuong'
					label='Số lượng tồn kho'
					rules={[{ required: true, type: 'number', min: 0, message: 'Số lượng >= 0' }]}
				>
					<InputNumber style={{ width: '100%' }} />
				</Form.Item>
			</Form>
		</Modal>
	);
};
export default ProductModal;
