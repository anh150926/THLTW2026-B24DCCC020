import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Row, Col } from 'antd';
import { IBaiViet, IThe, ETrangThai } from '../../types';
import { DS_TRANG_THAI } from '../../constants';

const { TextArea } = Input;

interface IFormBaiVietProps {
	hienThi: boolean;
	baiVietDangSua: IBaiViet | null;
	dsThe: IThe[];
	dongModal: () => void;
	luuBaiViet: (values: Omit<IBaiViet, 'id' | 'luotXem'>) => void;
}

const FormBaiViet: React.FC<IFormBaiVietProps> = ({
	hienThi, baiVietDangSua, dsThe, dongModal, luuBaiViet,
}) => {
	const [form] = Form.useForm();

	useEffect(() => {
		if (!hienThi) return;
		if (baiVietDangSua) {
			form.setFieldsValue({
				tieuDe: baiVietDangSua.tieuDe,
				slug: baiVietDangSua.slug,
				tomTat: baiVietDangSua.tomTat,
				noiDung: baiVietDangSua.noiDung,
				anhDaiDien: baiVietDangSua.anhDaiDien,
				tacGia: baiVietDangSua.tacGia,
				ngayDang: baiVietDangSua.ngayDang,
				trangThai: baiVietDangSua.trangThai,
				dsTheId: baiVietDangSua.dsTheId,
			});
		} else {
			form.resetFields();
		}
	}, [hienThi, baiVietDangSua]);

	const xuLySubmit = () => {
		form.validateFields().then((values) => {
			luuBaiViet(values);
			form.resetFields();
		});
	};

	return (
		<Modal
			title={baiVietDangSua ? '✏️ Chỉnh Sửa Bài Viết' : '➕ Thêm Bài Viết Mới'}
			visible={hienThi}
			onCancel={() => { form.resetFields(); dongModal(); }}
			onOk={xuLySubmit}
			okText={baiVietDangSua ? 'Cập nhật' : 'Thêm mới'}
			cancelText='Đóng'
			width={800}
			destroyOnClose
		>
			<Form
				form={form}
				layout='vertical'
				initialValues={{
					trangThai: ETrangThai.BanNhap,
					tacGia: 'Nguyễn Lê Anh',
					ngayDang: new Date().toISOString().split('T')[0],
				}}
			>
				<Row gutter={16}>
					<Col span={16}>
						<Form.Item label='Tiêu đề' name='tieuDe' rules={[{ required: true, message: 'Bắt buộc nhập tiêu đề' }, { max: 200, message: 'Tối đa 200 ký tự' }]}>
							<Input placeholder='Nhập tiêu đề bài viết' />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item label='Slug' name='slug' rules={[{ required: true, message: 'Bắt buộc nhập slug' }]}>
							<Input placeholder='vd: bai-viet-moi' />
						</Form.Item>
					</Col>
				</Row>

				<Form.Item label='Tóm tắt' name='tomTat' rules={[{ required: true, message: 'Bắt buộc nhập tóm tắt' }, { max: 500, message: 'Tối đa 500 ký tự' }]}>
					<TextArea rows={2} placeholder='Mô tả ngắn gọn...' maxLength={500} />
				</Form.Item>

				<Form.Item label='Nội dung (Markdown)' name='noiDung' rules={[{ required: true, message: 'Bắt buộc nhập nội dung' }]}>
					<TextArea rows={10} placeholder='Viết nội dung bằng Markdown...' style={{ fontFamily: 'monospace' }} />
				</Form.Item>

				<Row gutter={16}>
					<Col span={12}>
						<Form.Item label='Ảnh đại diện (URL)' name='anhDaiDien' rules={[{ required: true, message: 'Bắt buộc nhập URL ảnh' }]}>
							<Input placeholder='https://example.com/image.jpg' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='Tác giả' name='tacGia' rules={[{ required: true, message: 'Bắt buộc nhập tác giả' }]}>
							<Input placeholder='Tên tác giả' />
						</Form.Item>
					</Col>
				</Row>

				<Row gutter={16}>
					<Col span={8}>
						<Form.Item label='Ngày đăng' name='ngayDang' rules={[{ required: true, message: 'Bắt buộc chọn ngày' }]}>
							<Input type='date' />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item label='Trạng thái' name='trangThai' rules={[{ required: true, message: 'Bắt buộc chọn trạng thái' }]}>
							<Select placeholder='-- Chọn --' options={DS_TRANG_THAI} />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item label='Thẻ' name='dsTheId' rules={[{ required: true, message: 'Chọn ít nhất 1 thẻ' }]}>
							<Select mode='multiple' placeholder='-- Chọn thẻ --' options={dsThe.map((t) => ({ label: t.tenThe, value: t.id }))} />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};

export default FormBaiViet;
