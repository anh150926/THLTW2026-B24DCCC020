import React, { useState } from 'react';
import { Card, Table, Button, Popconfirm, Space, message, Tag, Alert, Empty } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { TruongThongTin, ThongTinVanBang } from '../../types';
import { KIEU_COLOR, TRUONG_MAC_DINH } from '../../constants';
import { ModalCauHinhBieuMau } from './ModalCauHinhBieuMau';

interface Props {
	dsTruongThongTin: TruongThongTin[];
	setDsTruongThongTin: (t: TruongThongTin[]) => void;
	dsVanBang: ThongTinVanBang[];
}

export const TabCauHinhBieuMau: React.FC<Props> = ({ dsTruongThongTin, setDsTruongThongTin, dsVanBang }) => {
	const [visible, setVisible] = useState(false);
	const [editing, setEditing] = useState<TruongThongTin | null>(null);

	const isDangDung = (id: string) => dsVanBang.some((v) => v.truongDongMap && id in v.truongDongMap);

	const handleSave = async (values: any) => {
		const tenTruongTrimmed = values.tenTruong.trim();

		const isDefaultField = TRUONG_MAC_DINH.some(
			(t) => t.toLowerCase() === tenTruongTrimmed.toLowerCase()
		);
		if (isDefaultField) {
			message.error('Trường này đã có sẵn trong danh sách mặc định!');
			return;
		}

		const exists = dsTruongThongTin.find(
			(t) => t.tenTruong.trim().toLowerCase() === tenTruongTrimmed.toLowerCase() && (!editing || t.id !== editing.id),
		);
		if (exists) {
			message.error('Tên trường thông tin đã tồn tại!');
			return;
		}

		const item: TruongThongTin = {
			id: editing ? editing.id : Date.now().toString(),
			...values,
			tenTruong: tenTruongTrimmed,
		};
		if (editing) setDsTruongThongTin(dsTruongThongTin.map((t) => (t.id === item.id ? item : t)));
		else setDsTruongThongTin([...dsTruongThongTin, item]);
		setVisible(false);
		message.success('Lưu trường thông tin thành công!');
	};

	const handleDelete = (id: string) => {
		if (isDangDung(id)) {
			message.error('Không thể xóa! Trường này đang được dùng trong văn bằng.');
			return;
		}
		setDsTruongThongTin(dsTruongThongTin.filter((t) => t.id !== id));
		message.success('Đã xóa trường thông tin.');
	};

	const columns = [
		{ title: 'Tên trường', dataIndex: 'tenTruong', render: (v: string) => <strong>{v}</strong> },
		{
			title: 'Kiểu dữ liệu',
			dataIndex: 'kieuDuLieu',
			align: 'center' as const,
			render: (v: string) => (
				<Tag color={KIEU_COLOR[v as keyof typeof KIEU_COLOR]}>{v}</Tag>
			),
		},
		{
			title: 'Control nhập liệu',
			dataIndex: 'kieuDuLieu',
			align: 'center' as const,
			render: (v: string) => {
				if (v === 'String') return <Tag>Text Input</Tag>;
				if (v === 'Number') return <Tag>Number Input</Tag>;
				return <Tag>Date Picker</Tag>;
			},
		},
		{
			title: 'Tình trạng',
			align: 'center' as const,
			render: (_: any, r: TruongThongTin) =>
				isDangDung(r.id) ? <Tag color='orange'>Đang sử dụng</Tag> : <Tag color='default'>Chưa dùng</Tag>,
		},
		{
			title: 'Thao tác',
			align: 'right' as const,
			render: (_: any, r: TruongThongTin) => (
				<Space>
					<Button
						type='text'
						style={{ color: '#1890ff' }}
						icon={<EditOutlined />}
						onClick={() => {
							setEditing(r);
							setVisible(true);
						}}
					/>
					<Popconfirm
						title='Xóa trường thông tin này?'
						onConfirm={() => handleDelete(r.id)}
						disabled={isDangDung(r.id)}
					>
						<Button danger type='text' icon={<DeleteOutlined />} disabled={isDangDung(r.id)} />
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<Card
			title={
				<Space>
					<SettingOutlined /> Cấu Hình Biểu Mẫu Phụ Lục Văn Bằng
				</Space>
			}
			extra={
				<Button
					type='primary'
					icon={<PlusOutlined />}
					onClick={() => {
						setEditing(null);
						setVisible(true);
					}}
				>
					Thêm Trường Bổ Sung
				</Button>
			}
		>
			<Alert
				type='info'
				showIcon
				message='Các trường mặc định (Số vào sổ, Số hiệu văn bằng, Mã sinh viên... ) được cấu hình ở bên trong hệ thống, bạn không cần phải thêm tại đây.'
				style={{ marginBottom: 16 }}
			/>

			{dsTruongThongTin.length === 0 ? (
				<Empty
					description='Chưa có trường thông tin bổ sung nào.'
					image={Empty.PRESENTED_IMAGE_SIMPLE}
				>
					<Button type='dashed' icon={<PlusOutlined />} onClick={() => { setEditing(null); setVisible(true); }}>
						Thêm trường thông tin mới
					</Button>
				</Empty>
			) : (
				<Table
					dataSource={dsTruongThongTin}
					columns={columns}
					rowKey='id'
					pagination={{ pageSize: 10, showSizeChanger: true }}
				/>
			)}

			<ModalCauHinhBieuMau
				visible={visible}
				onCancel={() => setVisible(false)}
				onSave={handleSave}
				editingItem={editing}
			/>
		</Card>
	);
};
