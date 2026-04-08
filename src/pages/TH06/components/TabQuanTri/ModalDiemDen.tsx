import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, Rate, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { DiemDen } from '../../types';
import { LOAI_DIEM_DEN_OPTIONS } from '../../constants';
import { VNDInput } from '../shared';

const { TextArea } = Input;

interface Props {
	visible: boolean;
	diemDen: DiemDen | null;
	onClose: () => void;
	onSubmit: (values: any) => void;
}

const CHI_PHI_FIELDS = [
	{ name: 'chiPhiAnUong', label: 'Ăn uống' },
	{ name: 'chiPhiLuuTru', label: 'Lưu trú' },
	{ name: 'chiPhiDiChuyen', label: 'Di chuyển' },
	{ name: 'chiPhiThamQuan', label: 'Tham quan' },
];

export const ModalDiemDen: React.FC<Props> = ({ visible, diemDen, onClose, onSubmit }) => {
	const [form] = Form.useForm();
	const isEdit = !!diemDen;

	useEffect(() => {
		if (visible && diemDen) {
			form.setFieldsValue(diemDen);
		} else if (visible) {
			form.resetFields();
			form.setFieldsValue({ rating: 4, thoiGianThamQuan: 6, luotChon: 0 });
		}
	}, [visible, diemDen]);

	const handleOk = () => {
		form.validateFields().then((values) => {
			onSubmit(values);
			form.resetFields();
			onClose();
		});
	};

	return (
		<Modal
			title={isEdit ? 'Sửa Điểm Đến' : 'Thêm Điểm Đến Mới'}
			visible={visible}
			onOk={handleOk}
			onCancel={() => { form.resetFields(); onClose(); }}
			okText={isEdit ? 'Cập nhật' : 'Thêm'}
			cancelText='Hủy'
			width={700}
			bodyStyle={{ maxHeight: 500, overflowY: 'auto' }}
		>
			<Form form={form} layout='vertical' size='small'>
				<Form.Item name='tenDiemDen' label='Tên điểm đến' rules={[{ required: true, message: 'Nhập tên!' }]}>
					<Input placeholder='VD: Vịnh Hạ Long' />
				</Form.Item>
				<Form.Item name='diaChi' label='Địa chỉ' rules={[{ required: true, message: 'Nhập địa chỉ!' }]}>
					<Input placeholder='VD: Quảng Ninh' />
				</Form.Item>
				<Form.Item name='loaiHinh' label='Loại hình' rules={[{ required: true, message: 'Chọn loại hình!' }]}>
					<Select options={LOAI_DIEM_DEN_OPTIONS} placeholder='Chọn loại hình' />
				</Form.Item>
				<Form.Item name='moTa' label='Mô tả'>
					<TextArea rows={3} placeholder='Mô tả chi tiết về điểm đến...' />
				</Form.Item>
				<Form.Item name='hinhAnh' label='Hình ảnh (URL hoặc Upload)'>
					<Input placeholder='URL hình ảnh...' />
				</Form.Item>
				<Upload
					accept='image/*'
					showUploadList={false}
					beforeUpload={(file) => {
						const reader = new FileReader();
						reader.onload = (e) => {
							form.setFieldsValue({ hinhAnh: e.target?.result as string });
							message.success('Đã upload hình ảnh!');
						};
						reader.readAsDataURL(file);
						return false;
					}}
				>
					<a><UploadOutlined /> Hoặc upload từ máy tính</a>
				</Upload>
				<div style={{ height: 12 }} />
				<Form.Item name='thoiGianThamQuan' label='Thời gian tham quan (giờ)' rules={[{ required: true }]}>
					<InputNumber min={1} max={48} style={{ width: '100%' }} />
				</Form.Item>
				<Form.Item name='rating' label='Đánh giá'>
					<Rate allowHalf />
				</Form.Item>
				<div style={{ background: '#f9f9f9', padding: 12, borderRadius: 8, marginBottom: 12 }}>
					<h4 style={{ margin: '0 0 8px' }}>💰 Chi phí ước tính (VNĐ/người)</h4>
					{CHI_PHI_FIELDS.map((f) => (
						<Form.Item key={f.name} name={f.name} label={f.label} rules={[{ required: true }]}>
							<VNDInput />
						</Form.Item>
					))}
				</div>
			</Form>
		</Modal>
	);
};
