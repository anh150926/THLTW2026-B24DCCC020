import React, { useState } from 'react';
import { Card, Table, Button, Tag, Space, message, Popconfirm, Modal, Form, Input } from 'antd';
import {
	PlusOutlined,
	EditOutlined,
	DeleteOutlined,
	ExclamationCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { IBaiViet, IThe } from '../../types';
import { MAU_THE } from '../../constants';
import { demBaiVietTheoThe, kiemTraTrungLapThe, taoId } from '../../utils/helpers';

interface IQuanLyTheProps {
	dsThe: IThe[];
	setDsThe: React.Dispatch<React.SetStateAction<IThe[]>>;
	dsBaiViet: IBaiViet[];
}

const QuanLyThe: React.FC<IQuanLyTheProps> = ({ dsThe, setDsThe, dsBaiViet }) => {
	const [form] = Form.useForm();
	const [modalMo, setModalMo] = useState(false);
	const [theDangSua, setTheDangSua] = useState<IThe | null>(null);

	const moThemMoi = () => {
		setTheDangSua(null);
		form.resetFields();
		setModalMo(true);
	};

	const moChinhSua = (record: IThe) => {
		setTheDangSua(record);
		form.setFieldsValue({ tenThe: record.tenThe });
		setModalMo(true);
	};

	const xuLyXoa = (record: IThe) => {
		const count = demBaiVietTheoThe(record.id, dsBaiViet);
		if (count > 0) {
			message.error(`Không thể xóa thẻ "${record.tenThe}" vì đang được sử dụng bởi ${count} bài viết.`);
			return;
		}
		setDsThe((prev) => prev.filter((item) => item.id !== record.id));
		message.success(`Đã xóa thẻ "${record.tenThe}".`);
	};

	const xuLyLuu = () => {
		form.validateFields().then((values) => {
			const tenThe = values.tenThe.trim();
			if (kiemTraTrungLapThe(tenThe, dsThe, theDangSua?.id)) {
				message.error('Tên thẻ đã tồn tại!');
				return;
			}
			if (theDangSua) {
				setDsThe((prev) => prev.map((item) => (item.id === theDangSua.id ? { id: theDangSua.id, tenThe } : item)));
				message.success('Cập nhật thẻ thành công!');
			} else {
				setDsThe((prev) => [...prev, { id: taoId('the'), tenThe }]);
				message.success('Thêm thẻ mới thành công!');
			}
			setModalMo(false);
			form.resetFields();
		});
	};

	const columns: ColumnsType<IThe> = [
		{
			title: 'STT',
			width: 60,
			align: 'center',
			render: (_t, _r, idx) => idx + 1,
		},
		{
			title: 'Tên thẻ',
			dataIndex: 'tenThe',
			sorter: (a, b) => a.tenThe.localeCompare(b.tenThe),
			render: (val: string, _r, idx) => (
				<Tag color={MAU_THE[idx % MAU_THE.length]} style={{ fontSize: 14 }}>{val}</Tag>
			),
		},
		{
			title: 'Số bài viết sử dụng',
			width: 180,
			align: 'center',
			render: (_t, record) => {
				const count = demBaiVietTheoThe(record.id, dsBaiViet);
				return <Tag color={count > 0 ? 'blue' : 'default'}>{count} bài viết</Tag>;
			},
		},
		{
			title: 'Thao tác',
			width: 120,
			align: 'center',
			render: (_t, record) => {
				const count = demBaiVietTheoThe(record.id, dsBaiViet);
				return (
					<Space>
						<Button type='text' style={{ color: '#1890ff' }} icon={<EditOutlined />} onClick={() => moChinhSua(record)} />
						{count === 0 ? (
							<Popconfirm
								title={`Xác nhận xóa thẻ "${record.tenThe}"?`}
								onConfirm={() => xuLyXoa(record)}
								okText='Đồng ý xóa'
								cancelText='Hủy bỏ'
								okButtonProps={{ danger: true }}
								icon={<ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />}
							>
								<Button danger type='text' icon={<DeleteOutlined />} />
							</Popconfirm>
						) : (
							<Button danger type='text' icon={<DeleteOutlined />} disabled />
						)}
					</Space>
				);
			},
		},
	];

	return (
		<>
			<Card
				title='Quản Lý Thẻ (Tags)'
				extra={<Button type='primary' icon={<PlusOutlined />} onClick={moThemMoi}>Thêm Thẻ</Button>}
			>
				<Table<IThe>
					dataSource={dsThe}
					columns={columns}
					rowKey='id'
					bordered
					size='middle'
					pagination={{ pageSize: 10, showTotal: (t) => `Tổng cộng: ${t} thẻ` }}
				/>
			</Card>

			<Modal
				title={theDangSua ? '✏️ Chỉnh Sửa Thẻ' : '➕ Thêm Thẻ Mới'}
				visible={modalMo}
				onCancel={() => { form.resetFields(); setModalMo(false); }}
				onOk={xuLyLuu}
				okText={theDangSua ? 'Cập nhật' : 'Thêm mới'}
				cancelText='Đóng'
				width={400}
				destroyOnClose
			>
				<Form form={form} layout='vertical'>
					<Form.Item
						label='Tên thẻ'
						name='tenThe'
						rules={[{ required: true, message: 'Bắt buộc nhập tên thẻ' }, { max: 50, message: 'Tối đa 50 ký tự' }]}
					>
						<Input placeholder='Ví dụ: React, TypeScript...' maxLength={50} />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default QuanLyThe;
