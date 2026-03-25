import React, { useState } from 'react';
import { Card, Table, Button, Popconfirm, Space, message, Tag, Tooltip, Empty, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, FileTextOutlined } from '@ant-design/icons';
import moment from 'moment';
import { ThongTinVanBang, QuyetDinhTotNghiep, SoVanBang, TruongThongTin } from '../../types';
import { getQuyetDinhName, getSoVanBangName, getNextSoVaoSo } from '../../utils/helpers';
import { ModalVanBang } from './ModalVanBang';
import { VanBangDetail } from './VanBangDetail';

interface Props {
	dsVanBang: ThongTinVanBang[];
	setDsVanBang: (v: ThongTinVanBang[]) => void;
	dsQuyetDinh: QuyetDinhTotNghiep[];
	dsSoVanBang: SoVanBang[];
	dsTruongThongTin: TruongThongTin[];
}

export const TabVanBang: React.FC<Props> = ({ dsVanBang, setDsVanBang, dsQuyetDinh, dsSoVanBang, dsTruongThongTin }) => {
	const [visible, setVisible] = useState(false);
	const [editing, setEditing] = useState<ThongTinVanBang | null>(null);
	const [detailItem, setDetailItem] = useState<ThongTinVanBang | null>(null);
	const [searchText, setSearchText] = useState('');
	const openEdit = (r: ThongTinVanBang | null = null) => { setEditing(r); setVisible(true); };

	const handleSave = async (values: any) => {
		const qd = dsQuyetDinh.find((q) => q.id === values.quyetDinhId);
		if (!qd) { message.error('Quyết định không hợp lệ!'); return; }

		const truongDongMap = Object.fromEntries(
			dsTruongThongTin.map((t) => {
				const v = values[`dong_${t.id}`];
				return [t.id, t.kieuDuLieu === 'Date' && v ? moment(v).format('YYYY-MM-DD') : v];
			})
		);
		const item: ThongTinVanBang = {
			id: editing ? editing.id : Date.now().toString(),
			soVaoSo: editing ? editing.soVaoSo : getNextSoVaoSo(qd.soVanBangId, dsQuyetDinh, dsVanBang),
			soHieuVanBang: values.soHieuVanBang, maSinhVien: values.maSinhVien,
			hoTen: values.hoTen, ngaySinh: values.ngaySinh ? moment(values.ngaySinh).format('YYYY-MM-DD') : '',
			quyetDinhId: values.quyetDinhId, truongDongMap,
		};
		editing ? setDsVanBang(dsVanBang.map((v) => (v.id === item.id ? item : v))) : setDsVanBang([...dsVanBang, item]);
		setVisible(false);
		message.success('Lưu văn bằng thành công!');
	};

	const columns = [
		{ title: 'Số vào sổ', dataIndex: 'soVaoSo', width: 95, sorter: (a: ThongTinVanBang, b: ThongTinVanBang) => a.soVaoSo - b.soVaoSo, defaultSortOrder: 'ascend' as const, render: (v: number) => <Tag color='blue'>#{v}</Tag> },
		{ title: 'Số hiệu VB', dataIndex: 'soHieuVanBang', width: 130 },
		{ title: 'Mã SV', dataIndex: 'maSinhVien', width: 110, render: (v: string) => <strong>{v}</strong> },
		{ title: 'Họ tên', dataIndex: 'hoTen', ellipsis: true },
		{ title: 'Ngày sinh', dataIndex: 'ngaySinh', width: 110, render: (v: string) => v ? moment(v).format('DD/MM/YYYY') : '-' },
		{ title: 'Quyết định', dataIndex: 'quyetDinhId', width: 130, align: 'center' as const, render: (id: string) => <Tag color='purple'>{getQuyetDinhName(id, dsQuyetDinh)}</Tag> },
		{ title: 'Sổ VB', width: 110, align: 'center' as const, render: (_: any, r: ThongTinVanBang) => getSoVanBangName(dsQuyetDinh.find((q) => q.id === r.quyetDinhId)?.soVanBangId || '', dsSoVanBang) },
		{
			title: 'Thao tác', width: 110, align: 'right' as const,
			render: (_: any, r: ThongTinVanBang) => (
				<Space>
					<Tooltip title='Xem chi tiết'><Button type='text' icon={<FileTextOutlined />} style={{ color: '#52c41a' }} onClick={() => setDetailItem(r)} /></Tooltip>
					<Button type='text' style={{ color: '#1890ff' }} icon={<EditOutlined />} onClick={() => openEdit(r)} />
					<Popconfirm title='Xóa văn bằng này?' onConfirm={() => { setDsVanBang(dsVanBang.filter((v) => v.id !== r.id)); message.success('Đã xóa.'); }}>
						<Button danger type='text' icon={<DeleteOutlined />} />
					</Popconfirm>
				</Space>
			),
		},
	];

	const filtered = dsVanBang.filter((v) => [v.maSinhVien, v.hoTen, v.soHieuVanBang].some((s) => s.toLowerCase().includes(searchText.toLowerCase())));

	return (
		<Card title='Danh Sách Văn Bằng Tốt Nghiệp' extra={
			<Space>
				<Input.Search placeholder='Tìm MSV, Họ tên, Số hiệu...' allowClear onChange={(e) => setSearchText(e.target.value)} style={{ width: 240 }} />
				<Button type='primary' icon={<PlusOutlined />} onClick={() => openEdit()} disabled={dsQuyetDinh.length === 0}>Thêm Văn Bằng</Button>
			</Space>
		}>
			{dsQuyetDinh.length === 0
				? <Empty description='Cần tạo Sổ Văn Bằng và Quyết Định trước.' image={Empty.PRESENTED_IMAGE_SIMPLE} />
				: dsVanBang.length === 0 && !searchText
					? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Chưa có văn bằng nào.'><Button type='primary' onClick={() => openEdit()}>Tạo đầu tiên</Button></Empty>
					: <Table dataSource={filtered} columns={columns} rowKey='id' pagination={{ pageSize: 15 }} scroll={{ x: 900 }} size='middle' />
			}
			<ModalVanBang visible={visible} onCancel={() => setVisible(false)} onSave={handleSave} editingItem={editing} dsQuyetDinh={dsQuyetDinh} dsSoVanBang={dsSoVanBang} dsTruongThongTin={dsTruongThongTin} />
			<VanBangDetail visible={!!detailItem} onClose={() => setDetailItem(null)} detailItem={detailItem} dsQuyetDinh={dsQuyetDinh} dsSoVanBang={dsSoVanBang} dsTruongThongTin={dsTruongThongTin} />
		</Card>
	);
};
