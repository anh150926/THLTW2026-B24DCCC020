import React, { useState } from 'react';
import { Modal, Input, Form, Alert } from 'antd';
import { TrangThaiDon } from '../../types';

interface Props {
	visible: boolean;
	onCancel: () => void;
	onConfirm: (lyDo: string) => void;
	hanhDong: TrangThaiDon.APPROVED | TrangThaiDon.REJECTED;
	soLuong: number;
}

export const ModalDuyetDon: React.FC<Props> = ({ visible, onCancel, onConfirm, hanhDong, soLuong }) => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const isReject = hanhDong === TrangThaiDon.REJECTED;

	const handleOk = async () => {
		if (isReject) {
			const values = await form.validateFields();
			setLoading(true);
			await new Promise((resolve) => setTimeout(resolve, 300));
			onConfirm(values.lyDo);
			setLoading(false);
			form.resetFields();
		} else {
			setLoading(true);
			await new Promise((resolve) => setTimeout(resolve, 300));
			onConfirm('');
			setLoading(false);
		}
	};

	return (
		<Modal
			title={isReject ? 'Xác nhận từ chối đơn' : 'Xác nhận duyệt đơn'}
			visible={visible}
			onCancel={() => { onCancel(); form.resetFields(); }}
			onOk={handleOk}
			okText={isReject ? 'Từ chối' : 'Duyệt'}
			okButtonProps={{ danger: isReject }}
			cancelText='Hủy'
			confirmLoading={loading}
			destroyOnClose
		>
			<Alert
				type={isReject ? 'warning' : 'info'}
				message={
					isReject
						? `Bạn đang từ chối ${soLuong} đơn đăng ký. Hành động này sẽ được ghi lại trong lịch sử.`
						: `Bạn đang duyệt ${soLuong} đơn đăng ký. Các ứng viên sẽ trở thành thành viên CLB.`
				}
				showIcon
				style={{ marginBottom: 16 }}
			/>

			{isReject && (
				<Form form={form} layout='vertical'>
					<Form.Item
						name='lyDo'
						label='Lý do từ chối'
						rules={[{ required: true, message: 'Bắt buộc nhập lý do từ chối!' }]}
					>
						<Input.TextArea rows={3} placeholder='Nhập lý do từ chối đơn đăng ký...' />
					</Form.Item>
				</Form>
			)}
		</Modal>
	);
};
