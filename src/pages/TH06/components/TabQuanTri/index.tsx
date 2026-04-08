import React, { useState } from 'react';
import { Card, Table, Button, Space, Popconfirm, message, Tag, Rate } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, EnvironmentOutlined, DownloadOutlined } from '@ant-design/icons';
import { DiemDen, LichTrinh } from '../../types';
import { LOAI_DIEM_DEN_COLOR } from '../../constants';
import { formatTienVND, tongChiPhiDiemDen, exportToXLSX } from '../../utils/helpers';
import { ModalDiemDen } from './ModalDiemDen';
import { ThongKeDashboard } from './ThongKeDashboard';

interface Props {
	dsDiemDen: DiemDen[];
	setDsDiemDen: (v: DiemDen[]) => void;
	dsLichTrinh: LichTrinh[];
}

export const TabQuanTri: React.FC<Props> = ({ dsDiemDen, setDsDiemDen, dsLichTrinh }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [editingDD, setEditingDD] = useState<DiemDen | null>(null);

	const handleThem = (values: any) => {
		setDsDiemDen([...dsDiemDen, { ...values, id: `dd-${Date.now()}`, luotChon: 0 }]);
		message.success('Thêm điểm đến thành công!');
	};

	const handleSua = (values: any) => {
		if (!editingDD) return;
		setDsDiemDen(dsDiemDen.map((dd) => (dd.id === editingDD.id ? { ...editingDD, ...values } : dd)));
		setEditingDD(null);
		message.success('Cập nhật thành công!');
	};

	const handleXoa = (id: string) => {
		setDsDiemDen(dsDiemDen.filter((dd) => dd.id !== id));
		message.success('Đã xóa điểm đến!');
	};

	const handleExportDD = () => {
		if (dsDiemDen.length === 0) { message.warning('Không có điểm đến để xuất!'); return; }
		exportToXLSX(dsDiemDen.map((dd, idx) => ({
			'STT': idx + 1, 'Tên': dd.tenDiemDen, 'Địa chỉ': dd.diaChi, 'Loại hình': dd.loaiHinh,
			'Rating': dd.rating, 'Thời gian (h)': dd.thoiGianThamQuan,
			'Ăn uống': dd.chiPhiAnUong, 'Lưu trú': dd.chiPhiLuuTru,
			'Di chuyển': dd.chiPhiDiChuyen, 'Tham quan': dd.chiPhiThamQuan,
			'Tổng chi phí': tongChiPhiDiemDen(dd), 'Lượt chọn': dd.luotChon,
		})), 'DanhSachDiemDen');
		message.success('Đã xuất file Excel!');
	};

	const columns = [
		{ title: 'STT', width: 50, render: (_: any, __: any, idx: number) => idx + 1 },
		{
			title: 'Ảnh', dataIndex: 'hinhAnh', width: 70,
			render: (v: string, r: DiemDen) => (
				<img src={v} alt={r.tenDiemDen} style={{ width: 50, height: 36, objectFit: 'cover', borderRadius: 4 }}
					onError={(e: any) => { e.target.src = 'https://placehold.co/50x36?text=No'; }} />
			),
		},
		{ title: 'Tên điểm đến', dataIndex: 'tenDiemDen', key: 'tenDiemDen', ellipsis: true },
		{ title: 'Địa chỉ', dataIndex: 'diaChi', key: 'diaChi', width: 120, responsive: ['md'] as any },
		{ title: 'Loại hình', dataIndex: 'loaiHinh', key: 'loaiHinh', width: 100, render: (v: string) => <Tag color={LOAI_DIEM_DEN_COLOR[v as keyof typeof LOAI_DIEM_DEN_COLOR]}>{v}</Tag>, responsive: ['sm'] as any },
		{ title: 'Rating', dataIndex: 'rating', key: 'rating', width: 130, render: (v: number) => <Rate disabled allowHalf value={v} style={{ fontSize: 12 }} />, responsive: ['md'] as any },
		{ title: 'Tổng chi phí', width: 130, render: (_: any, r: DiemDen) => <span style={{ fontWeight: 600, color: '#52c41a' }}>{formatTienVND(tongChiPhiDiemDen(r))}</span>, responsive: ['sm'] as any },
		{ title: 'Lượt chọn', dataIndex: 'luotChon', key: 'luotChon', width: 80, sorter: (a: DiemDen, b: DiemDen) => a.luotChon - b.luotChon, responsive: ['lg'] as any },
		{
			title: 'Thao tác', width: 100,
			render: (_: any, r: DiemDen) => (
				<Space>
					<Button size='small' icon={<EditOutlined />} onClick={() => { setEditingDD(r); setModalVisible(true); }} />
					<Popconfirm title='Xóa điểm đến này?' onConfirm={() => handleXoa(r.id)} okText='Xóa' cancelText='Hủy'>
						<Button size='small' danger icon={<DeleteOutlined />} />
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<Space direction='vertical' style={{ width: '100%' }} size={16}>
			<Card
				title={<><EnvironmentOutlined /> Quản Lý Điểm Đến</>}
				extra={
					<Space>
						<Button icon={<DownloadOutlined />} onClick={handleExportDD}>Xuất Excel</Button>
						<Button type='primary' icon={<PlusOutlined />} onClick={() => { setEditingDD(null); setModalVisible(true); }}>Thêm điểm đến</Button>
					</Space>
				}
			>
				<Table dataSource={dsDiemDen} columns={columns} rowKey='id' pagination={{ pageSize: 8, showSizeChanger: false }} scroll={{ x: 600 }} size='small' />
			</Card>

			<ThongKeDashboard dsDiemDen={dsDiemDen} dsLichTrinh={dsLichTrinh} />

			<ModalDiemDen
				visible={modalVisible}
				diemDen={editingDD}
				onClose={() => { setModalVisible(false); setEditingDD(null); }}
				onSubmit={editingDD ? handleSua : handleThem}
			/>
		</Space>
	);
};
