import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select, Spin, Descriptions, Tag } from 'antd';
import { CauLacBo, DonDangKy, GioiTinh, TrangThaiDon } from '../../types';
import { GIOI_TINH_OPTIONS, TRANG_THAI_COLOR, TRANG_THAI_TEXT } from '../../constants';

interface Props {
	visible: boolean;
	onCancel: () => void;
	onSave: (val: any) => Promise<void>;
	editingItem: DonDangKy | null;
	dsCauLacBo: CauLacBo[];
	/** Chế độ chỉ xem chi tiết */
	viewOnly?: boolean;
}

export const ModalDonDangKy: React.FC<Props> = ({ visible, onCancel, onSave, editingItem, dsCauLacBo, viewOnly }) => {
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

	// Chế độ xem chi tiết
	if (viewOnly && editingItem) {
		const clb = dsCauLacBo.find((c) => c.id === editingItem.cauLacBoId);
		return (
			<Modal title='Chi Tiết Đơn Đăng Ký' visible={visible} onCancel={onCancel} footer={null} width={640}>
				<Descriptions column={2} bordered size='small'>
					<Descriptions.Item label='Họ tên' span={2}><strong>{editingItem.hoTen}</strong></Descriptions.Item>
					<Descriptions.Item label='Email'>{editingItem.email}</Descriptions.Item>
					<Descriptions.Item label='SĐT'>{editingItem.sdt}</Descriptions.Item>
					<Descriptions.Item label='Giới tính'>{editingItem.gioiTinh}</Descriptions.Item>
					<Descriptions.Item label='Địa chỉ'>{editingItem.diaChi || '—'}</Descriptions.Item>
					<Descriptions.Item label='Sở trường' span={2}>{editingItem.soTruong || '—'}</Descriptions.Item>
					<Descriptions.Item label='CLB đăng ký' span={2}><Tag color='blue'>{clb?.tenCLB || '—'}</Tag></Descriptions.Item>
					<Descriptions.Item label='Lý do đăng ký' span={2}>{editingItem.lyDoDangKy || '—'}</Descriptions.Item>
					<Descriptions.Item label='Trạng thái'>
						<Tag color={TRANG_THAI_COLOR[editingItem.trangThai]}>{TRANG_THAI_TEXT[editingItem.trangThai]}</Tag>
					</Descriptions.Item>
					<Descriptions.Item label='Ngày đăng ký'>{new Date(editingItem.ngayDangKy).toLocaleString('vi-VN')}</Descriptions.Item>
					{editingItem.ghiChu && <Descriptions.Item label='Ghi chú (lý do từ chối)' span={2}><span style={{ color: 'red' }}>{editingItem.ghiChu}</span></Descriptions.Item>}
				</Descriptions>
			</Modal>
		);
	}

	return (
		<Modal
			title={editingItem ? 'Chỉnh Sửa Đơn Đăng Ký' : 'Thêm Đơn Đăng Ký Mới'}
			visible={visible}
			onCancel={onCancel}
			onOk={form.submit}
			okText='Lưu'
			cancelText='Hủy'
			confirmLoading={loading}
			width={640}
			destroyOnClose
		>
			<Spin spinning={loading} tip='Đang xử lý...'>
				<Form form={form} layout='vertical' onFinish={handleSubmit} initialValues={{ gioiTinh: GioiTinh.NAM, trangThai: TrangThaiDon.PENDING }}>
					<Form.Item name='hoTen' label='Họ tên' rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}>
						<Input placeholder='Nguyễn Văn A' />
					</Form.Item>

					<Form.Item name='email' label='Email' rules={[{ required: true, message: 'Vui lòng nhập email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}>
						<Input placeholder='example@email.com' />
					</Form.Item>

					<Form.Item name='sdt' label='Số điện thoại' rules={[{ required: true, message: 'Vui lòng nhập SĐT!' }, { pattern: /^[0-9]{9,11}$/, message: 'SĐT phải từ 9-11 số!' }]}>
						<Input placeholder='0901234567' />
					</Form.Item>

					<Form.Item name='gioiTinh' label='Giới tính' rules={[{ required: true }]}>
						<Select options={GIOI_TINH_OPTIONS} />
					</Form.Item>

					<Form.Item name='diaChi' label='Địa chỉ'>
						<Input placeholder='Địa chỉ hiện tại' />
					</Form.Item>

					<Form.Item name='soTruong' label='Sở trường'>
						<Input placeholder='VD: Lập trình, Thiết kế, Âm nhạc...' />
					</Form.Item>

					<Form.Item name='cauLacBoId' label='Câu lạc bộ đăng ký' rules={[{ required: true, message: 'Vui lòng chọn CLB!' }]}>
						<Select placeholder='Chọn CLB'>
							{dsCauLacBo.filter((c) => c.hoatDong).map((c) => (
								<Select.Option key={c.id} value={c.id}>{c.tenCLB}</Select.Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item name='lyDoDangKy' label='Lý do đăng ký'>
						<Input.TextArea rows={3} placeholder='Lý do bạn muốn tham gia CLB...' />
					</Form.Item>
				</Form>
			</Spin>
		</Modal>
	);
};
