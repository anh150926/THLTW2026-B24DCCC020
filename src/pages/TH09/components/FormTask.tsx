import React, { useEffect } from 'react';
import { Modal, Form, Input, DatePicker, Select } from 'antd';
import moment from 'moment';
import type { ITask } from '../types';
import { ETrangThaiTask } from '../types';
import { DS_MUC_DO_UU_TIEN, DS_TRANG_THAI, DS_TAG } from '../constants';
import { taoId } from '../utils';

interface Props {
	visible: boolean;
	onCancel: () => void;
	onSubmit: (task: ITask) => void;
	taskSua?: ITask | null;
	trangThaiMacDinh?: ETrangThaiTask;
}

const FormTask: React.FC<Props> = ({ visible, onCancel, onSubmit, taskSua, trangThaiMacDinh }) => {
	const [form] = Form.useForm();

	useEffect(() => {
		if (visible) {
			if (taskSua) {
				form.setFieldsValue({
					...taskSua,
					deadline: moment(taskSua.deadline),
				});
			} else {
				form.resetFields();
				if (trangThaiMacDinh) {
					form.setFieldsValue({ trangThai: trangThaiMacDinh });
				}
			}
		}
	}, [visible, taskSua, trangThaiMacDinh, form]);

	const handleOk = () => {
		form.validateFields().then((values) => {
			const task: ITask = {
				id: taskSua?.id || taoId(),
				tenTask: values.tenTask,
				moTa: values.moTa || '',
				deadline: values.deadline.format('YYYY-MM-DD'),
				mucDoUuTien: values.mucDoUuTien,
				tag: values.tag,
				trangThai: values.trangThai || ETrangThaiTask.CanLam,
				ngayTao: taskSua?.ngayTao || moment().format('YYYY-MM-DD'),
			};
			onSubmit(task);
			form.resetFields();
		});
	};

	return (
		<Modal
			title={taskSua ? 'Chỉnh sửa Task' : 'Thêm Task Mới'}
			visible={visible}
			onOk={handleOk}
			onCancel={() => { form.resetFields(); onCancel(); }}
			okText={taskSua ? 'Cập nhật' : 'Thêm'}
			cancelText='Hủy'
			destroyOnClose
			width={600}
		>
			<Form form={form} layout='vertical' initialValues={{ trangThai: trangThaiMacDinh || ETrangThaiTask.CanLam, mucDoUuTien: 'Trung bình' }}>
				<Form.Item name='tenTask' label='Tên Task' rules={[{ required: true, message: 'Vui lòng nhập tên task!' }]}>
					<Input placeholder='Nhập tên task...' maxLength={200} />
				</Form.Item>

				<Form.Item name='moTa' label='Mô tả'>
					<Input.TextArea placeholder='Mô tả chi tiết...' rows={3} maxLength={500} showCount />
				</Form.Item>

				<Form.Item name='deadline' label='Deadline' rules={[{ required: true, message: 'Vui lòng chọn deadline!' }]}>
					<DatePicker style={{ width: '100%' }} format='DD/MM/YYYY' placeholder='Chọn ngày deadline' />
				</Form.Item>

				<Form.Item name='mucDoUuTien' label='Mức độ ưu tiên' rules={[{ required: true, message: 'Vui lòng chọn mức độ!' }]}>
					<Select placeholder='Chọn mức độ ưu tiên' options={DS_MUC_DO_UU_TIEN} />
				</Form.Item>

				<Form.Item name='tag' label='Tag' rules={[{ required: true, message: 'Vui lòng chọn tag!' }]}>
					<Select placeholder='Chọn tag' options={DS_TAG.map((t) => ({ label: t, value: t }))} />
				</Form.Item>

				<Form.Item name='trangThai' label='Trạng thái' rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}>
					<Select placeholder='Chọn trạng thái' options={DS_TRANG_THAI} />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default FormTask;
