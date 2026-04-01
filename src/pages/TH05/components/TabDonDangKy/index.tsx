import React, { useState, useCallback } from 'react';
import { Card, Table, Button, Popconfirm, Space, message, Tag, Input } from 'antd';
import {
	PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined,
	CheckCircleOutlined, CloseCircleOutlined, HistoryOutlined, SearchOutlined,
} from '@ant-design/icons';
import { CauLacBo, DonDangKy, LichSuThaoTac, TrangThaiDon, GioiTinh } from '../../types';
import { TRANG_THAI_COLOR, TRANG_THAI_TEXT, TRANG_THAI_OPTIONS } from '../../constants';
import { getCLBName } from '../../utils/helpers';
import { ModalDonDangKy } from './ModalDonDangKy';
import { ModalDuyetDon } from './ModalDuyetDon';
import { ModalLichSu } from './ModalLichSu';

interface Props {
	dsDonDangKy: DonDangKy[];
	setDsDonDangKy: (val: DonDangKy[]) => void;
	dsCauLacBo: CauLacBo[];
	dsLichSu: LichSuThaoTac[];
	setDsLichSu: (val: LichSuThaoTac[]) => void;
}

export const TabDonDangKy: React.FC<Props> = ({ dsDonDangKy, setDsDonDangKy, dsCauLacBo, dsLichSu, setDsLichSu }) => {
	const [visibleForm, setVisibleForm] = useState(false);
	const [editing, setEditing] = useState<DonDangKy | null>(null);
	const [viewOnly, setViewOnly] = useState(false);
	const [visibleDuyet, setVisibleDuyet] = useState(false);
	const [hanhDongDuyet, setHanhDongDuyet] = useState<TrangThaiDon.APPROVED | TrangThaiDon.REJECTED>(TrangThaiDon.APPROVED);
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [visibleLichSu, setVisibleLichSu] = useState(false);
	const [lichSuDonId, setLichSuDonId] = useState<string | undefined>(undefined);

	const openForm = useCallback((r: DonDangKy | null = null, isView = false) => {
		setEditing(r);
		setViewOnly(isView);
		setVisibleForm(true);
	}, []);

	const handleSave = async (values: any) => {
		const item: DonDangKy = {
			id: editing?.id ?? Date.now().toString(),
			...values,
			trangThai: editing?.trangThai ?? TrangThaiDon.PENDING,
			ghiChu: editing?.ghiChu ?? '',
			ngayDangKy: editing?.ngayDangKy ?? new Date().toISOString(),
		};
		if (editing) {
			setDsDonDangKy(dsDonDangKy.map((d) => (d.id === item.id ? item : d)));
		} else {
			setDsDonDangKy([...dsDonDangKy, item]);
		}
		setVisibleForm(false);
		message.success(editing ? 'Cập nhật đơn thành công!' : 'Thêm đơn đăng ký thành công!');
	};

	const handleDelete = (id: string) => {
		setDsDonDangKy(dsDonDangKy.filter((d) => d.id !== id));
		setDsLichSu(dsLichSu.filter((l) => l.donDangKyId !== id));
		message.success('Đã xóa đơn đăng ký.');
	};

	/** Mở modal duyệt cho 1 đơn */
	const openDuyetDon = (hanhDong: TrangThaiDon.APPROVED | TrangThaiDon.REJECTED, donId?: string) => {
		if (donId) setSelectedRowKeys([donId]);
		setHanhDongDuyet(hanhDong);
		setVisibleDuyet(true);
	};

	/** Xử lý duyệt/từ chối (đơn lẻ hoặc bulk) */
	const handleDuyet = (lyDo: string) => {
		const now = new Date().toISOString();
		const newLichSu: LichSuThaoTac[] = selectedRowKeys.map((key) => ({
			id: Date.now().toString() + '_' + key,
			donDangKyId: key as string,
			hanhDong: hanhDongDuyet,
			thoiGian: now,
			lyDo: lyDo,
			nguoiThucHien: 'Admin',
		}));

		const updatedDons = dsDonDangKy.map((d) => {
			if (selectedRowKeys.includes(d.id)) {
				return { ...d, trangThai: hanhDongDuyet, ghiChu: hanhDongDuyet === TrangThaiDon.REJECTED ? lyDo : d.ghiChu };
			}
			return d;
		});

		setDsDonDangKy(updatedDons);
		setDsLichSu([...dsLichSu, ...newLichSu]);
		setVisibleDuyet(false);
		setSelectedRowKeys([]);
		message.success(`Đã ${hanhDongDuyet === TrangThaiDon.APPROVED ? 'duyệt' : 'từ chối'} ${selectedRowKeys.length} đơn!`);
	};

	/** Mở lịch sử thao tác */
	const openLichSu = (donId?: string) => {
		setLichSuDonId(donId);
		setVisibleLichSu(true);
	};

	const getColumnSearchProps = (dataIndex: string) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
			<div style={{ padding: 8 }}>
				<Input
					placeholder='Tìm kiếm...'
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
			title: 'Họ tên',
			dataIndex: 'hoTen',
			sorter: (a: DonDangKy, b: DonDangKy) => a.hoTen.localeCompare(b.hoTen),
			...getColumnSearchProps('hoTen'),
		},
		{ title: 'Email', dataIndex: 'email', ...getColumnSearchProps('email') },
		{ title: 'SĐT', dataIndex: 'sdt', width: 120 },
		{
			title: 'Giới tính', dataIndex: 'gioiTinh', width: 100,
			filters: [{ text: 'Nam', value: GioiTinh.NAM }, { text: 'Nữ', value: GioiTinh.NU }, { text: 'Khác', value: GioiTinh.KHAC }],
			onFilter: (value: any, record: DonDangKy) => record.gioiTinh === value,
		},
		{
			title: 'CLB',
			dataIndex: 'cauLacBoId',
			render: (v: string) => <Tag color='blue'>{getCLBName(v, dsCauLacBo)}</Tag>,
			filters: dsCauLacBo.map((c) => ({ text: c.tenCLB, value: c.id })),
			onFilter: (value: any, record: DonDangKy) => record.cauLacBoId === value,
		},
		{
			title: 'Trạng thái',
			dataIndex: 'trangThai',
			width: 120,
			filters: TRANG_THAI_OPTIONS.map((o) => ({ text: o.label, value: o.value })),
			onFilter: (value: any, record: DonDangKy) => record.trangThai === value,
			render: (v: TrangThaiDon) => <Tag color={TRANG_THAI_COLOR[v]}>{TRANG_THAI_TEXT[v]}</Tag>,
		},
		{
			title: 'Thao tác',
			width: 240,
			align: 'right' as const,
			render: (_: any, r: DonDangKy) => (
				<Space size={4}>
					<Button type='text' icon={<EyeOutlined />} onClick={() => openForm(r, true)} title='Xem chi tiết' />
					<Button type='text' style={{ color: '#1890ff' }} icon={<EditOutlined />} onClick={() => openForm(r)} title='Sửa' />
					{r.trangThai === TrangThaiDon.PENDING && (
						<>
							<Button type='text' style={{ color: '#52c41a' }} icon={<CheckCircleOutlined />} onClick={() => openDuyetDon(TrangThaiDon.APPROVED, r.id)} title='Duyệt' />
							<Button type='text' danger icon={<CloseCircleOutlined />} onClick={() => openDuyetDon(TrangThaiDon.REJECTED, r.id)} title='Từ chối' />
						</>
					)}
					<Button type='text' icon={<HistoryOutlined />} onClick={() => openLichSu(r.id)} title='Lịch sử' />
					<Popconfirm title='Xóa đơn này?' onConfirm={() => handleDelete(r.id)}>
						<Button danger type='text' icon={<DeleteOutlined />} title='Xóa' />
					</Popconfirm>
				</Space>
			),
		},
	];

	const rowSelection = {
		selectedRowKeys,
		onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
		getCheckboxProps: (record: DonDangKy) => ({
			disabled: record.trangThai !== TrangThaiDon.PENDING,
		}),
	};

	const selectedCount = selectedRowKeys.length;

	return (
		<>
			<Card
				title='Quản Lý Đơn Đăng Ký Thành Viên'
				extra={
					<Space>
						<Button icon={<HistoryOutlined />} onClick={() => openLichSu()}>Lịch sử thao tác</Button>
						<Button type='primary' icon={<PlusOutlined />} onClick={() => openForm()}>Thêm đơn</Button>
					</Space>
				}
			>
				{selectedCount > 0 && (
					<div style={{ marginBottom: 16 }}>
						<Space>
							<span>Đã chọn <strong>{selectedCount}</strong> đơn:</span>
							<Button type='primary' icon={<CheckCircleOutlined />} onClick={() => { setHanhDongDuyet(TrangThaiDon.APPROVED); setVisibleDuyet(true); }}>
								Duyệt {selectedCount} đơn đã chọn
							</Button>
							<Button danger icon={<CloseCircleOutlined />} onClick={() => { setHanhDongDuyet(TrangThaiDon.REJECTED); setVisibleDuyet(true); }}>
								Không duyệt {selectedCount} đơn đã chọn
							</Button>
							<Button onClick={() => setSelectedRowKeys([])}>Bỏ chọn</Button>
						</Space>
					</div>
				)}
				<Table
					dataSource={dsDonDangKy}
					columns={columns}
					rowKey='id'
					pagination={{ pageSize: 10 }}
					rowSelection={rowSelection}
				/>
			</Card>

			<ModalDonDangKy
				visible={visibleForm}
				onCancel={() => setVisibleForm(false)}
				onSave={handleSave}
				editingItem={editing}
				dsCauLacBo={dsCauLacBo}
				viewOnly={viewOnly}
			/>
			<ModalDuyetDon
				visible={visibleDuyet}
				onCancel={() => setVisibleDuyet(false)}
				onConfirm={handleDuyet}
				hanhDong={hanhDongDuyet}
				soLuong={selectedCount}
			/>
			<ModalLichSu
				visible={visibleLichSu}
				onCancel={() => setVisibleLichSu(false)}
				dsLichSu={dsLichSu}
				donId={lichSuDonId}
			/>
		</>
	);
};
