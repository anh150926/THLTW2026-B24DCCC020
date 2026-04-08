import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Space, Divider } from 'antd';
import { CalendarOutlined, DollarOutlined, FileTextOutlined } from '@ant-design/icons';
import { VNDInput } from '../shared';

const { TextArea } = Input;

interface Props {
	visible: boolean;
	onClose: () => void;
	onSubmit: (values: { tenLichTrinh: string; nganSachTongThe: number; soNgay: number; ghiChu?: string }) => void;
}

const NGAN_SACH_NHANH = [
	{ label: '5 triệu', value: 5000000 },
	{ label: '10 triệu', value: 10000000 },
	{ label: '15 triệu', value: 15000000 },
	{ label: '20 triệu', value: 20000000 },
	{ label: '30 triệu', value: 30000000 },
];

export const ModalThemLichTrinh: React.FC<Props> = ({ visible, onClose, onSubmit }) => {
	const [form] = Form.useForm();
	const [nganSachType, setNganSachType] = useState<'quick' | 'custom'>('quick');
	const [selectedQuick, setSelectedQuick] = useState<number | null>(null);

	const resetState = () => { form.resetFields(); setSelectedQuick(null); setNganSachType('quick'); };

	const handleOk = () => {
		form.validateFields().then((values) => {
			const nganSach = nganSachType === 'quick' && selectedQuick ? selectedQuick : values.nganSachTongThe;
			onSubmit({ tenLichTrinh: values.tenLichTrinh, nganSachTongThe: nganSach, soNgay: values.soNgay || 1, ghiChu: values.ghiChu });
			resetState();
			onClose();
		});
	};

	const handleQuickSelect = (value: number) => {
		setSelectedQuick(value);
		setNganSachType('quick');
		form.setFieldsValue({ nganSachTongThe: value });
	};

	return (
		<Modal
			title={<span style={{ fontSize: 16, fontWeight: 600 }}><CalendarOutlined style={{ marginRight: 8, color: '#1890ff' }} />Tạo Lịch Trình Mới</span>}
			visible={visible}
			onOk={handleOk}
			onCancel={() => { resetState(); onClose(); }}
			okText='🚀 Tạo lịch trình'
			cancelText='Hủy'
			width={560}
		>
			<Form form={form} layout='vertical' initialValues={{ soNgay: 3 }}>
				<Form.Item name='tenLichTrinh' label={<span><FileTextOutlined style={{ marginRight: 4 }} /> Tên lịch trình</span>} rules={[{ required: true, message: 'Vui lòng nhập tên lịch trình!' }]}>
					<Input placeholder='VD: Du lịch Đà Nẵng - Hội An 3 ngày' size='large' />
				</Form.Item>
				<Form.Item name='soNgay' label={<span><CalendarOutlined style={{ marginRight: 4 }} /> Số ngày dự kiến</span>} rules={[{ required: true, message: 'Vui lòng nhập số ngày!' }]}>
					<InputNumber min={1} max={30} style={{ width: '100%' }} size='large' placeholder='VD: 3' addonAfter='ngày' />
				</Form.Item>

				<Divider style={{ margin: '16px 0 12px' }} />
				<div style={{ marginBottom: 8 }}><span style={{ fontWeight: 500 }}><DollarOutlined style={{ marginRight: 4 }} /> Ngân sách tổng thể</span></div>

				<div style={{ marginBottom: 12 }}>
					<div style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>Chọn nhanh:</div>
					<Space wrap>
						{NGAN_SACH_NHANH.map((item) => (
							<div
								key={item.value}
								onClick={() => handleQuickSelect(item.value)}
								style={{
									padding: '6px 16px', borderRadius: 20, cursor: 'pointer', fontSize: 13, transition: 'all 0.2s',
									border: `2px solid ${selectedQuick === item.value ? '#1890ff' : '#d9d9d9'}`,
									background: selectedQuick === item.value ? '#e6f7ff' : '#fff',
									color: selectedQuick === item.value ? '#1890ff' : '#333',
									fontWeight: selectedQuick === item.value ? 600 : 400,
								}}
							>
								{item.label}
							</div>
						))}
					</Space>
				</div>

				<div style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>Hoặc nhập tùy chỉnh:</div>
				<Form.Item
					name='nganSachTongThe'
					rules={[{
						validator: (_, value) => {
							if (nganSachType === 'quick' && selectedQuick) return Promise.resolve();
							if (!value || value <= 0) return Promise.reject('Vui lòng nhập ngân sách!');
							return Promise.resolve();
						},
					}]}
				>
					<VNDInput
						size='large'
						step={500000}
						placeholder='Nhập số tiền...'
						addonAfter='VNĐ'
						onChange={(val) => { if (val) { setNganSachType('custom'); setSelectedQuick(null); } }}
					/>
				</Form.Item>

				<Divider style={{ margin: '12px 0' }} />
				<Form.Item name='ghiChu' label='Ghi chú (không bắt buộc)'>
					<TextArea rows={2} placeholder='VD: Chuyến đi kỷ niệm sinh nhật, mang theo 2 trẻ nhỏ...' style={{ resize: 'none' }} />
				</Form.Item>
			</Form>
		</Modal>
	);
};
