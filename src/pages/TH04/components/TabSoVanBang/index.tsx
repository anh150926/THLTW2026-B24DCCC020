import React, { useState } from 'react';
import { Card, Table, Button, Popconfirm, Space, message, Tag, Empty } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { SoVanBang, QuyetDinhTotNghiep, ThongTinVanBang } from '../../types';
import { countVanBangTrongSo } from '../../utils/helpers';
import { ModalSoVanBang } from './ModalSoVanBang';

interface Props {
	dsSoVanBang: SoVanBang[];
	setDsSoVanBang: (s: SoVanBang[]) => void;
	dsQuyetDinh: QuyetDinhTotNghiep[];
	dsVanBang: ThongTinVanBang[];
}

export const TabSoVanBang: React.FC<Props> = ({ dsSoVanBang, setDsSoVanBang, dsQuyetDinh, dsVanBang }) => {
	const [visible, setVisible] = useState(false);
	const [editing, setEditing] = useState<SoVanBang | null>(null);
	const open = (r: SoVanBang | null = null) => { setEditing(r); setVisible(true); };

	const handleSave = async (values: any) => {
		if (dsSoVanBang.find((s) => s.nam === values.nam && (!editing || s.id !== editing.id))) {
			message.error(`Đã có sổ năm ${values.nam}!`); return;
		}
		const item = { id: editing?.id ?? Date.now().toString(), ...values };
		editing ? setDsSoVanBang(dsSoVanBang.map((s) => (s.id === item.id ? item : s))) : setDsSoVanBang([...dsSoVanBang, item]);
		setVisible(false);
		message.success('Lưu sổ văn bằng thành công!');
	};

	const handleDelete = (id: string) => {
		if (dsQuyetDinh.some((q) => q.soVanBangId === id)) { message.error('Có QĐ đang dùng sổ này!'); return; }
		setDsSoVanBang(dsSoVanBang.filter((s) => s.id !== id));
		message.success('Đã xóa.');
	};

	const columns = [
		{ title: 'Năm', dataIndex: 'nam', sorter: (a: SoVanBang, b: SoVanBang) => a.nam - b.nam, defaultSortOrder: 'descend' as const, render: (v: number) => <strong>{v}</strong> },
		{ title: 'Mô tả', dataIndex: 'moTa' },
		{ title: 'Số QĐ', align: 'center' as const, render: (_: any, r: SoVanBang) => { const c = dsQuyetDinh.filter((q) => q.soVanBangId === r.id).length; return <Tag color={c > 0 ? 'blue' : 'default'}>{c} QĐ</Tag>; } },
		{ title: 'Số VB', align: 'center' as const, render: (_: any, r: SoVanBang) => { const c = countVanBangTrongSo(r.id, dsQuyetDinh, dsVanBang); return <Tag color={c > 0 ? 'green' : 'default'}>{c} VB</Tag>; } },
		{
			title: 'Thao tác', align: 'right' as const,
			render: (_: any, r: SoVanBang) => (
				<Space>
					<Button type='text' style={{ color: '#1890ff' }} icon={<EditOutlined />} onClick={() => open(r)} />
					<Popconfirm title='Xóa sổ này?' onConfirm={() => handleDelete(r.id)}>
						<Button danger type='text' icon={<DeleteOutlined />} />
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<>
			<Card title='Danh Sách Sổ Văn Bằng' extra={<Button type='primary' icon={<PlusOutlined />} onClick={() => open()}>Thêm Sổ Mới</Button>}>
				{dsSoVanBang.length === 0
					? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Chưa có sổ văn bằng.'><Button type='primary' onClick={() => open()}>Tạo sổ đầu tiên</Button></Empty>
					: <Table dataSource={dsSoVanBang} columns={columns} rowKey='id' pagination={{ pageSize: 10 }} />
				}
			</Card>
			<ModalSoVanBang visible={visible} onCancel={() => setVisible(false)} onSave={handleSave} editingItem={editing} />
		</>
	);
};
