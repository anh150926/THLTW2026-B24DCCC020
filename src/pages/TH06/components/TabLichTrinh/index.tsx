import React, { useState } from 'react';
import { Card, Table, Button, Space, Popconfirm, message, Empty } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { DiemDen, LichTrinh } from '../../types';
import { formatTienVND, tinhTongChiPhi, formatDateTime } from '../../utils/helpers';
import { ModalThemLichTrinh } from './ModalThemLichTrinh';
import { ModalChonDiemDen } from './ModalChonDiemDen';
import { ChiTietLichTrinh } from './ChiTietLichTrinh';

interface Props {
	dsDiemDen: DiemDen[];
	setDsDiemDen: (v: DiemDen[]) => void;
	dsLichTrinh: LichTrinh[];
	setDsLichTrinh: (v: LichTrinh[]) => void;
}

export const TabLichTrinh: React.FC<Props> = ({ dsDiemDen, setDsDiemDen, dsLichTrinh, setDsLichTrinh }) => {
	const [modalThem, setModalThem] = useState(false);
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [modalChonDD, setModalChonDD] = useState(false);
	const [activeNgay, setActiveNgay] = useState<number>(0);

	const selectedLT = dsLichTrinh.find((lt) => lt.id === selectedId) || null;

	const handleThemLT = (values: { tenLichTrinh: string; nganSachTongThe: number; soNgay?: number; ghiChu?: string }) => {
		const soNgay = values.soNgay || 1;
		const newLT: LichTrinh = {
			id: `LT-${Date.now()}`,
			tenLichTrinh: values.tenLichTrinh,
			ngayTao: new Date().toISOString(),
			nganSachTongThe: values.nganSachTongThe,
			dsNgay: Array.from({ length: soNgay }, (_, i) => ({ ngay: i + 1, diemDenIds: [] as string[] })),
		};
		setDsLichTrinh([...dsLichTrinh, newLT]);
		message.success(`Tạo lịch trình "${values.tenLichTrinh}" với ${soNgay} ngày thành công!`);
	};

	const handleXoaLT = (id: string) => {
		setDsLichTrinh(dsLichTrinh.filter((lt) => lt.id !== id));
		if (selectedId === id) setSelectedId(null);
		message.success('Đã xóa lịch trình!');
	};

	const updateLT = (updated: LichTrinh) => {
		setDsLichTrinh(dsLichTrinh.map((lt) => (lt.id === updated.id ? updated : lt)));
	};

	const handleThemDiemDen = (diemDenId: string) => {
		if (!selectedLT) return;
		const dsNgay = [...selectedLT.dsNgay];
		dsNgay[activeNgay] = { ...dsNgay[activeNgay], diemDenIds: [...dsNgay[activeNgay].diemDenIds, diemDenId] };
		updateLT({ ...selectedLT, dsNgay });
		setDsDiemDen(dsDiemDen.map((dd) => (dd.id === diemDenId ? { ...dd, luotChon: dd.luotChon + 1 } : dd)));
		setModalChonDD(false);
		message.success('Đã thêm điểm đến!');
	};

	const columns = [
		{ title: 'STT', width: 60, render: (_: any, __: any, idx: number) => idx + 1 },
		{ title: 'Tên lịch trình', dataIndex: 'tenLichTrinh', key: 'tenLichTrinh', ellipsis: true },
		{ title: 'Ngày tạo', dataIndex: 'ngayTao', key: 'ngayTao', width: 120, render: (v: string) => formatDateTime(v), responsive: ['md'] as any },
		{ title: 'Số ngày', width: 80, render: (_: any, r: LichTrinh) => `${r.dsNgay.length} ngày` },
		{ title: 'Ngân sách', dataIndex: 'nganSachTongThe', key: 'nganSachTongThe', width: 140, render: (v: number) => formatTienVND(v), responsive: ['sm'] as any },
		{
			title: 'Chi phí ước tính', width: 140, responsive: ['sm'] as any,
			render: (_: any, r: LichTrinh) => {
				const chi = tinhTongChiPhi(r, dsDiemDen);
				return <span style={{ color: chi > r.nganSachTongThe ? '#f5222d' : '#52c41a', fontWeight: 600 }}>{formatTienVND(chi)}</span>;
			},
		},
		{
			title: 'Thao tác', width: 140,
			render: (_: any, r: LichTrinh) => (
				<Space>
					<Button type='primary' size='small' onClick={() => setSelectedId(r.id)}>Chi tiết</Button>
					<Popconfirm title='Xóa lịch trình này?' onConfirm={() => handleXoaLT(r.id)} okText='Xóa' cancelText='Hủy'>
						<Button danger size='small' icon={<DeleteOutlined />} />
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<Space direction='vertical' style={{ width: '100%' }} size={16}>
			<Card
				title='Danh Sách Lịch Trình'
				extra={<Button type='primary' icon={<PlusOutlined />} onClick={() => setModalThem(true)}>Tạo lịch trình</Button>}
			>
				<Table
					dataSource={dsLichTrinh}
					columns={columns}
					rowKey='id'
					pagination={false}
					scroll={{ x: 600 }}
					size='small'
					locale={{ emptyText: <Empty description='Chưa có lịch trình nào. Hãy tạo lịch trình đầu tiên!' /> }}
					onRow={(r) => ({
						style: { cursor: 'pointer', background: selectedId === r.id ? '#e6f7ff' : undefined },
						onClick: () => setSelectedId(r.id),
					})}
				/>
			</Card>

			{selectedLT && (
				<ChiTietLichTrinh
					selectedLT={selectedLT}
					dsDiemDen={dsDiemDen}
					onClose={() => setSelectedId(null)}
					onUpdate={updateLT}
					onOpenChonDD={(ngayIdx) => { setActiveNgay(ngayIdx); setModalChonDD(true); }}
				/>
			)}

			<ModalThemLichTrinh visible={modalThem} onClose={() => setModalThem(false)} onSubmit={handleThemLT} />
			<ModalChonDiemDen visible={modalChonDD} dsDiemDen={dsDiemDen} onClose={() => setModalChonDD(false)} onSelect={handleThemDiemDen} />
		</Space>
	);
};
