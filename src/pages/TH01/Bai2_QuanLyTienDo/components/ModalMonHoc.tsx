import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { MonHoc } from '../type';

interface Props {
	hienThi: boolean;
	duLieuSua: MonHoc | null;
	dongModal: () => void;
	luuMon: (tenMon: string) => void;
}

export const ModalMonHoc: React.FC<Props> = ({ hienThi, duLieuSua, dongModal, luuMon }) => {
	const [form] = Form.useForm();

	useEffect(() => {
		if (hienThi) {
			if (duLieuSua) {
				form.setFieldsValue({ tenMon: duLieuSua.tenMon });
			} else {
				form.resetFields();
			}
		}
	}, [hienThi, duLieuSua, form]);

	const xuLyOk = () => {
		form.validateFields().then((values) => {
			luuMon(values.tenMon);
			form.resetFields();
		});
	};

	return (
		<Modal
			title={duLieuSua ? 'Cập Nhật Môn Học' : 'Thêm Môn Học Mới'}
			visible={hienThi}
			onCancel={dongModal}
			onOk={xuLyOk}
		>
			<Form form={form} layout='vertical'>
				<Form.Item
					name='tenMon'
					label='Tên danh mục môn học'
					rules={[{ required: true, message: 'Vui lòng nhập tên môn!' }]}
				>
					<Input placeholder='Ví dụ: Toán, Văn...' />
				</Form.Item>
			</Form>
		</Modal>
	);
};
