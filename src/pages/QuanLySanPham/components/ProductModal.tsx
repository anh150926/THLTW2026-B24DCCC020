import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';

export interface ProductFormValues {
	name: string;
	price: number;
	quantity: number;
}

interface ProductModalProps {
	open: boolean;
	onCancel: () => void;
	onSubmit: (values: ProductFormValues) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ open, onCancel, onSubmit }) => {
	const [form] = Form.useForm();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	useEffect(() => {
		if (open) {
			form.resetFields();
			setIsSubmitting(false);
		}
	}, [open, form]);

	const handleOk = async () => {
		try {
			const values = await form.validateFields();
			setIsSubmitting(true);

			setTimeout(() => {
				onSubmit(values);
				setIsSubmitting(false);
			}, 500);
		} catch (error) {
			console.log('Validate Failed:', error);
		}
	};

	return (
		<Modal
			title='Thêm sản phẩm mới'
			open={open}
			visible={open}
			onOk={handleOk}
			onCancel={onCancel}
			confirmLoading={isSubmitting}
			destroyOnClose
			okText='Lưu'
			cancelText='Hủy'
		>
			<Form form={form} layout='vertical' initialValues={{ quantity: 1 }}>
				<Form.Item
					name='name'
					label='Tên sản phẩm'
					rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
				>
					<Input placeholder='Nhập tên sản phẩm...' />
				</Form.Item>

				<Form.Item
					name='price'
					label='Giá (VNĐ)'
					rules={[
						{ required: true, message: 'Vui lòng nhập giá!' },
						{ type: 'number', min: 1, message: 'Giá phải là số dương!' },
					]}
				>
					<InputNumber
						style={{ width: '100%' }}
						formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
					/>
				</Form.Item>

				<Form.Item
					name='quantity'
					label='Số lượng'
					rules={[
						{ required: true, message: 'Vui lòng nhập số lượng!' },
						{ type: 'integer', min: 1, message: 'Số lượng phải là số nguyên!' },
					]}
				>
					<InputNumber style={{ width: '100%' }} />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default ProductModal;
