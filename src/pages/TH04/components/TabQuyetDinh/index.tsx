import React, { useState } from 'react';
import { Card, Table, Button, Popconfirm, Space, message, Tag, Badge, Empty, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, FileAddOutlined } from '@ant-design/icons';
import moment from 'moment';
import { QuyetDinhTotNghiep, SoVanBang, ThongTinVanBang } from '../../types';
import { getSoVanBangName } from '../../utils/helpers';
import { ModalQuyetDinh } from './ModalQuyetDinh';

interface Props {
	dsQuyetDinh: QuyetDinhTotNghiep[];
	setDsQuyetDinh: (q: QuyetDinhTotNghiep[]) => void;
	dsSoVanBang: SoVanBang[];
	dsVanBang: ThongTinVanBang[];
}

export const TabQuyetDinh: React.FC<Props> = ({ dsQuyetDinh, setDsQuyetDinh, dsSoVanBang, dsVanBang }) => {
	const [visible, setVisible] = useState(false);
	const [editing, setEditing] = useState<QuyetDinhTotNghiep | null>(null);
	const [search, setSearch] = useState('');
	const open = (r: QuyetDinhTotNghiep | null = null) => { setEditing(r); setVisible(true); };

	const handleSave = async (values: any) => {
		const item = { id: editing?.id ?? Date.now().toString(), ...values, luotTraCuu: editing?.luotTraCuu ?? 0 };
		editing ? setDsQuyetDinh(dsQuyetDinh.map((q) => (q.id === item.id ? item : q))) : setDsQuyetDinh([...dsQuyetDinh, item]);
		setVisible(false);
		message.success('Lưu quyết định thành công!');
	};

	const handleDelete = (id: string) => {
		if (dsVanBang.some((v) => v.quyetDinhId === id)) { message.error('QĐ đang có văn bằng!'); return; }
		setDsQuyetDinh(dsQuyetDinh.filter((q) => q.id !== id));
		message.success('Đã xóa.');
	};

	const columns = [
		{ title: 'Số QĐ', dataIndex: 'soQD', width: 140, render: (v: string) => <strong>{v}</strong> },
		{ title: 'Ngày BH', dataIndex: 'ngayBanHanh', width: 120, render: (v: string) => v ? moment(v).format('DD/MM/YYYY') : '-', sorter: (a: QuyetDinhTotNghiep, b: QuyetDinhTotNghiep) => moment(a.ngayBanHanh || 0).diff(moment(b.ngayBanHanh || 0)) },
		{ title: 'Trích yếu', dataIndex: 'trichYeu', ellipsis: true },
		{ title: 'Sổ', dataIndex: 'soVanBangId', width: 110, align: 'center' as const, render: (id: string) => <Tag color='purple'>{getSoVanBangName(id, dsSoVanBang)}</Tag> },
		{ title: 'Tra cứu', dataIndex: 'luotTraCuu', width: 90, align: 'center' as const, sorter: (a: QuyetDinhTotNghiep, b: QuyetDinhTotNghiep) => a.luotTraCuu - b.luotTraCuu, render: (v: number) => <Badge count={v} showZero style={{ backgroundColor: v > 0 ? '#52c41a' : '#d9d9d9' }} /> },
		{ title: 'Số VB', width: 85, align: 'center' as const, render: (_: any, r: QuyetDinhTotNghiep) => { const c = dsVanBang.filter((v) => v.quyetDinhId === r.id).length; return <Tag color={c ? 'cyan' : 'default'}>{c}</Tag>; } },
		{
			title: 'Thao tác', width: 90, align: 'right' as const,
			render: (_: any, r: QuyetDinhTotNghiep) => (
				<Space>
					<Button type='text' style={{ color: '#1890ff' }} icon={<EditOutlined />} onClick={() => open(r)} />
					<Popconfirm title='Xóa?' onConfirm={() => handleDelete(r.id)}>
						<Button danger type='text' icon={<DeleteOutlined />} />
					</Popconfirm>
				</Space>
			),
		},
	];

	const filtered = dsQuyetDinh.filter((q) => q.soQD.toLowerCase().includes(search.toLowerCase()));

	return (
		<Card title='Danh Sách Quyết Định Tốt Nghiệp' extra={
			<Space>
				<Input.Search placeholder='Tìm số QĐ...' allowClear onChange={(e) => setSearch(e.target.value)} style={{ width: 200 }} />
				<Button type='primary' icon={<PlusOutlined />} onClick={() => open()} disabled={dsSoVanBang.length === 0}>Thêm Mới</Button>
			</Space>
		}>
			{dsSoVanBang.length === 0 ? (
				<Empty description='Cần tạo Sổ Văn Bằng trước.' image={Empty.PRESENTED_IMAGE_SIMPLE} />
			) : dsQuyetDinh.length === 0 && !search ? (
				<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Chưa có quyết định nào.'>
					<Button type='primary' icon={<FileAddOutlined />} onClick={() => open()}>Tạo quyết định đầu tiên</Button>
				</Empty>
			) : (
				<Table dataSource={filtered} columns={columns} rowKey='id' pagination={{ pageSize: 10 }} scroll={{ x: 750 }} />
			)}
			<ModalQuyetDinh visible={visible} onCancel={() => setVisible(false)} onSave={handleSave} editingItem={editing} dsSoVanBang={dsSoVanBang} />
		</Card>
	);
};
