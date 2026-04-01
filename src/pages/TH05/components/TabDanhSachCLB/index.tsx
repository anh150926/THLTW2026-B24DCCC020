import React, { useState, useCallback } from 'react';
import { Card, Table, Button, Popconfirm, Space, message, Tag, Input, Image, Empty } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, TeamOutlined, SearchOutlined } from '@ant-design/icons';
import { CauLacBo, DonDangKy, TrangThaiDon } from '../../types';
import { ModalCauLacBo } from './ModalCauLacBo';
import { ModalThanhVienCLB } from './ModalThanhVienCLB';
import moment from 'moment';

interface Props {
	dsCauLacBo: CauLacBo[];
	setDsCauLacBo: (val: CauLacBo[]) => void;
	dsDonDangKy: DonDangKy[];
}

export const TabDanhSachCLB: React.FC<Props> = ({ dsCauLacBo, setDsCauLacBo, dsDonDangKy }) => {
	const [visibleForm, setVisibleForm] = useState(false);
	const [editing, setEditing] = useState<CauLacBo | null>(null);
	const [visibleTV, setVisibleTV] = useState(false);
	const [selectedCLB, setSelectedCLB] = useState<CauLacBo | null>(null);

	const open = useCallback((r: CauLacBo | null = null) => {
		setEditing(r);
		setVisibleForm(true);
	}, []);

	const openThanhVien = useCallback((r: CauLacBo) => {
		setSelectedCLB(r);
		setVisibleTV(true);
	}, []);

	const handleSave = async (values: any) => {
		if (dsCauLacBo.find((c) => c.tenCLB.toLowerCase() === values.tenCLB.toLowerCase() && (!editing || c.id !== editing.id))) {
			message.error('Tên CLB đã tồn tại!');
			return;
		}
		const item: CauLacBo = { id: editing?.id ?? Date.now().toString(), ...values };
		if (editing) {
			setDsCauLacBo(dsCauLacBo.map((c) => (c.id === item.id ? item : c)));
		} else {
			setDsCauLacBo([...dsCauLacBo, item]);
		}
		setVisibleForm(false);
		message.success(editing ? 'Cập nhật CLB thành công!' : 'Thêm CLB thành công!');
	};

	const handleDelete = (id: string) => {
		if (dsDonDangKy.some((d) => d.cauLacBoId === id)) {
			message.error('Không thể xóa! CLB này đang có đơn đăng ký.');
			return;
		}
		setDsCauLacBo(dsCauLacBo.filter((c) => c.id !== id));
		message.success('Đã xóa CLB.');
	};

	/** Helper: render ảnh đại diện từ UploadFile value */
	const renderAvatar = (val: any) => {
		let src = '';
		if (typeof val === 'string') src = val;
		else if (val?.fileList?.[0]?.thumbUrl) src = val.fileList[0].thumbUrl;
		else if (val?.fileList?.[0]?.url) src = val.fileList[0].url;
		else if (val?.fileList?.[0]?.originFileObj) {
			try { src = URL.createObjectURL(val.fileList[0].originFileObj); } catch { }
		}
		return src ? <Image src={src} width={48} height={48} style={{ borderRadius: 8, objectFit: 'cover' }} preview={false} /> : <div style={{ width: 48, height: 48, background: '#f0f0f0', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb', fontSize: 12 }}>N/A</div>;
	};

	const getColumnSearchProps = (dataIndex: string) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
			<div style={{ padding: 8 }}>
				<Input
					placeholder={`Tìm kiếm...`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => confirm()}
					style={{ marginBottom: 8, display: 'block' }}
				/>
				<Space>
					<Button type='primary' onClick={() => confirm()} icon={<SearchOutlined />} size='small'>Tìm</Button>
					<Button onClick={() => { clearFilters && clearFilters(); confirm(); }} size='small'>Xóa</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
		onFilter: (value: any, record: any) => record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
	});

	const columns: any[] = [
		{
			title: 'Ảnh',
			dataIndex: 'anhDaiDien',
			width: 70,
			align: 'center' as const,
			render: (val: any) => renderAvatar(val),
		},
		{
			title: 'Tên CLB',
			dataIndex: 'tenCLB',
			sorter: (a: CauLacBo, b: CauLacBo) => a.tenCLB.localeCompare(b.tenCLB),
			...getColumnSearchProps('tenCLB'),
		},
		{
			title: 'Ngày thành lập',
			dataIndex: 'ngayThanhLap',
			width: 140,
			sorter: (a: CauLacBo, b: CauLacBo) => (a.ngayThanhLap || '').localeCompare(b.ngayThanhLap || ''),
			render: (v: string) => (v ? moment(v, 'YYYY-MM-DD').format('DD/MM/YYYY') : '—'),
		},
		{
			title: 'Mô tả',
			dataIndex: 'moTa',
			width: 200,
			ellipsis: true,
			render: (v: string) => v ? <div dangerouslySetInnerHTML={{ __html: v }} style={{ maxHeight: 60, overflow: 'hidden' }} /> : '—',
		},
		{
			title: 'Chủ nhiệm',
			dataIndex: 'chuNhiem',
			...getColumnSearchProps('chuNhiem'),
		},
		{
			title: 'Hoạt động',
			dataIndex: 'hoatDong',
			width: 110,
			align: 'center' as const,
			filters: [
				{ text: 'Có', value: true },
				{ text: 'Không', value: false },
			],
			onFilter: (value: any, record: CauLacBo) => record.hoatDong === value,
			render: (v: boolean) => <Tag color={v ? 'green' : 'red'}>{v ? 'Có' : 'Không'}</Tag>,
		},
		{
			title: 'Thành viên',
			width: 90,
			align: 'center' as const,
			render: (_: any, r: CauLacBo) => {
				const count = dsDonDangKy.filter((d) => d.cauLacBoId === r.id && d.trangThai === TrangThaiDon.APPROVED).length;
				return <Tag color={count > 0 ? 'blue' : 'default'}>{count}</Tag>;
			},
		},
		{
			title: 'Thao tác',
			width: 160,
			align: 'right' as const,
			render: (_: any, r: CauLacBo) => (
				<Space>
					<Button type='text' style={{ color: '#1890ff' }} icon={<TeamOutlined />} onClick={() => openThanhVien(r)} title='Xem thành viên' />
					<Button type='text' style={{ color: '#1890ff' }} icon={<EditOutlined />} onClick={() => open(r)} title='Chỉnh sửa' />
					<Popconfirm title='Xóa CLB này?' onConfirm={() => handleDelete(r.id)}>
						<Button danger type='text' icon={<DeleteOutlined />} title='Xóa' />
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<>
			<Card
				title='Danh Sách Câu Lạc Bộ'
				extra={
					<Button type='primary' icon={<PlusOutlined />} onClick={() => open()}>
						Thêm CLB
					</Button>
				}
			>
				{dsCauLacBo.length === 0 ? (
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Chưa có câu lạc bộ nào.'>
						<Button type='primary' onClick={() => open()}>Tạo CLB đầu tiên</Button>
					</Empty>
				) : (
					<Table dataSource={dsCauLacBo} columns={columns} rowKey='id' pagination={{ pageSize: 10 }} />
				)}
			</Card>
			<ModalCauLacBo visible={visibleForm} onCancel={() => setVisibleForm(false)} onSave={handleSave} editingItem={editing} />
			<ModalThanhVienCLB visible={visibleTV} onCancel={() => setVisibleTV(false)} cauLacBo={selectedCLB} dsDonDangKy={dsDonDangKy} />
		</>
	);
};
