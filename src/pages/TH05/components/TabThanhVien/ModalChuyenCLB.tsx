import React, { useState } from 'react';
import { Modal, Select, Alert, Form } from 'antd';
import { CauLacBo } from '../../types';

interface Props {
	visible: boolean;
	onCancel: () => void;
	onConfirm: (clbMoiId: string) => void;
	dsCauLacBo: CauLacBo[];
	soLuong: number;
	currentCLBId?: string;
}

export const ModalChuyenCLB: React.FC<Props> = ({ visible, onCancel, onConfirm, dsCauLacBo, soLuong, currentCLBId }) => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const handleOk = async () => {
		const values = await form.validateFields();
		setLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 300));
		onConfirm(values.clbMoiId);
		setLoading(false);
		form.resetFields();
	};

	const dsCLBLoc = dsCauLacBo.filter((c) => c.hoatDong && c.id !== currentCLBId);

	return (
		<Modal
			title='Chuyển Câu Lạc Bộ'
			visible={visible}
			onCancel={() => { onCancel(); form.resetFields(); }}
			onOk={handleOk}
			okText='Xác nhận chuyển'
			cancelText='Hủy'
			confirmLoading={loading}
			destroyOnClose
		>
			<Alert
				type='info'
				message={`Bạn đang chuyển CLB cho ${soLuong} thành viên`}
				description='Chọn CLB mới để chuyển các thành viên đã chọn sang.'
				showIcon
				style={{ marginBottom: 16 }}
			/>

			<Form form={form} layout='vertical'>
				<Form.Item
					name='clbMoiId'
					label='CLB muốn chuyển đến'
					rules={[{ required: true, message: 'Vui lòng chọn CLB đích!' }]}
				>
					<Select placeholder='Chọn CLB mới' size='large'>
						{dsCLBLoc.map((c) => (
							<Select.Option key={c.id} value={c.id}>{c.tenCLB}</Select.Option>
						))}
					</Select>
				</Form.Item>
			</Form>
		</Modal>
	);
};
