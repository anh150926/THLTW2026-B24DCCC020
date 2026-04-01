import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Spin, Switch, DatePicker } from 'antd';
import { CauLacBo } from '../../types';
import UploadFile from '@/components/Upload/UploadFile';
import TinyEditor from '@/components/TinyEditor';
import moment from 'moment';

interface Props {
	visible: boolean;
	onCancel: () => void;
	onSave: (val: any) => Promise<void>;
	editingItem: CauLacBo | null;
}

export const ModalCauLacBo: React.FC<Props> = ({ visible, onCancel, onSave, editingItem }) => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (visible) {
			if (editingItem) {
				form.setFieldsValue({
					...editingItem,
					ngayThanhLap: editingItem.ngayThanhLap ? moment(editingItem.ngayThanhLap, 'YYYY-MM-DD') : null,
				});
			} else {
				form.resetFields();
			}
		}
	}, [visible, editingItem, form]);

	const handleSubmit = async (values: any) => {
		setLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 300));
		const data = {
			...values,
			ngayThanhLap: values.ngayThanhLap ? values.ngayThanhLap.format('YYYY-MM-DD') : '',
		};
		await onSave(data);
		setLoading(false);
	};

	return (
		<Modal
			title={editingItem ? 'Chỉnh Sửa Câu Lạc Bộ' : 'Thêm Câu Lạc Bộ Mới'}
			visible={visible}
			onCancel={onCancel}
			onOk={form.submit}
			okText='Lưu'
			cancelText='Hủy'
			confirmLoading={loading}
			width={720}
			destroyOnClose
		>
			<Spin spinning={loading} tip='Đang xử lý...'>
				<Form form={form} layout='vertical' onFinish={handleSubmit} initialValues={{ hoatDong: true }}>
					<Form.Item name='anhDaiDien' label='Ảnh đại diện'>
						<UploadFile isAvatar accept='image/*' />
					</Form.Item>

					<Form.Item name='tenCLB' label='Tên câu lạc bộ' rules={[{ required: true, message: 'Vui lòng nhập tên CLB!' }]}>
						<Input placeholder='VD: CLB Lập trình' />
					</Form.Item>

					<Form.Item name='ngayThanhLap' label='Ngày thành lập' rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}>
						<DatePicker format='DD/MM/YYYY' style={{ width: '100%' }} placeholder='Chọn ngày thành lập' />
					</Form.Item>

					<Form.Item name='chuNhiem' label='Chủ nhiệm CLB' rules={[{ required: true, message: 'Vui lòng nhập chủ nhiệm!' }]}>
						<Input placeholder='VD: Nguyễn Văn A' />
					</Form.Item>

					<Form.Item name='moTa' label='Mô tả (HTML)'>
						<TinyEditor height={250} miniToolbar />
					</Form.Item>

					<Form.Item name='hoatDong' label='Trạng thái hoạt động' valuePropName='checked'>
						<Switch checkedChildren='Hoạt động' unCheckedChildren='Không' />
					</Form.Item>
				</Form>
			</Spin>
		</Modal>
	);
};
