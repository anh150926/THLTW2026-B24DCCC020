import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, Row, Col } from 'antd';
import moment from 'moment';
import { MonHoc, TienDo } from '../type';

interface Props {
	hienThi: boolean;
	duLieuSua: TienDo | null;
	danhSachMon: MonHoc[];
	dongModal: () => void;
	luuTienDo: (values: any) => void;
}

export const ModalTienDo: React.FC<Props> = ({ hienThi, duLieuSua, danhSachMon, dongModal, luuTienDo }) => {
	const [form] = Form.useForm();
	const { Option } = Select;
	const { TextArea } = Input;

	useEffect(() => {
		if (hienThi) {
			if (duLieuSua) {
				form.setFieldsValue({
					...duLieuSua,
					thoiGian: moment(duLieuSua.thoiGian),
				});
			} else {
				form.resetFields();
			}
		}
	}, [hienThi, duLieuSua, form]);

	const xuLyOk = () => {
		form.validateFields().then((values) => {
			luuTienDo(values);
			form.resetFields();
		});
	};

	return (
		<Modal
			title={duLieuSua ? 'Sửa Nhật Ký Học' : 'Ghi Nhật Ký Mới'}
			visible={hienThi}
			onCancel={dongModal}
			onOk={xuLyOk}
			width={700}
		>
			<Form form={form} layout='vertical'>
				<Form.Item name='monHocId' label='Môn Học' rules={[{ required: true, message: 'Vui lòng chọn môn học!' }]}>
					<Select placeholder='Chọn môn...' size='large'>
						{danhSachMon.map((m) => (
							<Option key={m.id} value={m.id}>
								{m.tenMon}
							</Option>
						))}
					</Select>
				</Form.Item>

				<Row gutter={16}>
					<Col span={12}>
						<Form.Item name='thoiGian' label='Ngày giờ' rules={[{ required: true, message: 'Chọn ngày giờ!' }]}>
							<DatePicker showTime style={{ width: '100%' }} format='YYYY-MM-DD HH:mm' size='large' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							name='thoiLuong'
							label='Thời lượng (phút)'
							rules={[{ required: true, message: 'Nhập thời lượng!' }]}
						>
							<Input type='number' min={1} size='large' />
						</Form.Item>
					</Col>
				</Row>

				<Form.Item
					name='noiDung'
					label='Nội dung đã học'
					rules={[{ required: true, message: 'Nhập nội dung bài học!' }]}
				>
					<TextArea rows={5} placeholder='Ví dụ: Học chương 1 về React Hooks...' showCount maxLength={500} />
				</Form.Item>

				<Form.Item name='ghiChu' label='Ghi chú thêm'>
					<TextArea rows={3} placeholder='Ví dụ: Cần xem lại phần useEffect...' />
				</Form.Item>
			</Form>
		</Modal>
	);
};
