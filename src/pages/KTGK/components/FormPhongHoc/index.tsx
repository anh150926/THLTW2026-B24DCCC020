import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select } from 'antd';
import { ELoaiPhong, IPhongHoc } from '../../types';
import { DS_LOAI_PHONG, DS_PHU_TRACH } from '../../constants';

interface IFormPhongHocProps {
	hienThi: boolean;
	phongDangSua: IPhongHoc | null;
	dongModal: () => void;
	luuPhong: (values: Omit<IPhongHoc, 'id'>) => void;
}

const FormPhongHoc: React.FC<IFormPhongHocProps> = ({
	hienThi,
	phongDangSua,
	dongModal,
	luuPhong,
}) => {
	const [form] = Form.useForm();

	useEffect(() => {
		if (!hienThi) return;

		if (phongDangSua) {
			form.setFieldsValue({
				maPhong: phongDangSua.maPhong,
				tenPhong: phongDangSua.tenPhong,
				soChoNgoi: phongDangSua.soChoNgoi,
				loaiPhong: phongDangSua.loaiPhong,
				nguoiPhuTrach: phongDangSua.nguoiPhuTrach,
			});
		} else {
			form.resetFields();
		}
	}, [hienThi, phongDangSua]);

	const xuLySubmit = () => {
		form.validateFields().then((values) => {
			luuPhong(values);
			form.resetFields();
		});
	};

	return (
		<Modal
			title={phongDangSua ? '✏️ Chỉnh Sửa Phòng Học' : '➕ Thêm Phòng Học Mới'}
			visible={hienThi}
			onCancel={() => {
				form.resetFields();
				dongModal();
			}}
			onOk={xuLySubmit}
			okText={phongDangSua ? 'Cập nhật' : 'Thêm mới'}
			cancelText='Đóng'
			width={560}
			destroyOnClose
		>
			<Form
				form={form}
				layout='vertical'
				initialValues={{
					soChoNgoi: 30,
					loaiPhong: ELoaiPhong.LyThuyet,
				}}
			>
				<Form.Item
					label='Mã phòng'
					name='maPhong'
					rules={[
						{ required: true, message: 'Bắt buộc nhập mã phòng' },
						{ max: 10, message: 'Mã phòng không quá 10 ký tự' },
					]}
				>
					<Input placeholder='Ví dụ: A101' maxLength={10} />
				</Form.Item>

				<Form.Item
					label='Tên phòng'
					name='tenPhong'
					rules={[
						{ required: true, message: 'Bắt buộc nhập tên phòng' },
						{ max: 50, message: 'Tên phòng không quá 50 ký tự' },
					]}
				>
					<Input placeholder='Ví dụ: Phòng Lý thuyết 1' maxLength={50} />
				</Form.Item>

				<Form.Item
					label='Số chỗ ngồi'
					name='soChoNgoi'
					rules={[
						{ required: true, message: 'Bắt buộc nhập số chỗ ngồi' },
						{ type: 'number', min: 10, max: 200, message: 'Phải từ 10 đến 200 chỗ' },
					]}
				>
					<InputNumber min={10} max={200} style={{ width: '100%' }} placeholder='10 - 200' />
				</Form.Item>

				<Form.Item
					label='Loại phòng'
					name='loaiPhong'
					rules={[{ required: true, message: 'Bắt buộc chọn loại phòng' }]}
				>
					<Select placeholder='-- Chọn loại phòng --' options={DS_LOAI_PHONG} />
				</Form.Item>

				<Form.Item
					label='Người phụ trách'
					name='nguoiPhuTrach'
					rules={[{ required: true, message: 'Bắt buộc chọn người phụ trách' }]}
				>
					<Select placeholder='-- Chọn người phụ trách --'>
						{DS_PHU_TRACH.map((ten) => (
							<Select.Option key={ten} value={ten}>
								{ten}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default FormPhongHoc;
