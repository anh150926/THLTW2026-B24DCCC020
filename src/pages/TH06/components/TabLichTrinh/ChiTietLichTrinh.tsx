import React from 'react';
import { Card, Row, Col, Statistic, Collapse, Space, Button, Tooltip, Popconfirm, Empty, Modal, Input, InputNumber } from 'antd';
import {
	CalendarOutlined,
	PlusOutlined,
	PlusCircleOutlined,
	DeleteOutlined,
	EditOutlined,
	ClockCircleOutlined,
	DollarOutlined,
	WarningOutlined,
	CheckCircleOutlined,
} from '@ant-design/icons';
import { DiemDen, LichTrinh } from '../../types';
import { formatTienVND, tinhTongChiPhi, tinhChiPhiNgay, tinhThoiGianNgay, getDiemDenById } from '../../utils/helpers';
import { BudgetAlert, BudgetProgress, VNDInput } from '../shared';
import { DiemDenItem } from './DiemDenItem';

const { Panel } = Collapse;

interface Props {
	selectedLT: LichTrinh;
	dsDiemDen: DiemDen[];
	onClose: () => void;
	onUpdate: (lt: LichTrinh) => void;
	onOpenChonDD: (ngayIdx: number) => void;
}

export const ChiTietLichTrinh: React.FC<Props> = ({ selectedLT, dsDiemDen, onClose, onUpdate, onOpenChonDD }) => {
	const [modalSuaLT, setModalSuaLT] = React.useState(false);
	const [editTen, setEditTen] = React.useState('');
	const [editNganSach, setEditNganSach] = React.useState(0);

	const tongChiPhi = tinhTongChiPhi(selectedLT, dsDiemDen);
	const nganSach = selectedLT.nganSachTongThe;
	const phanTram = nganSach > 0 ? Math.round((tongChiPhi / nganSach) * 100) : 0;
	const conLai = nganSach - tongChiPhi;

	const handleOpenSua = () => {
		setEditTen(selectedLT.tenLichTrinh);
		setEditNganSach(selectedLT.nganSachTongThe);
		setModalSuaLT(true);
	};

	const handleSuaLT = () => {
		if (!editTen.trim()) return;
		onUpdate({ ...selectedLT, tenLichTrinh: editTen, nganSachTongThe: editNganSach });
		setModalSuaLT(false);
	};

	const handleThemNgay = () => {
		const newNgay = { ngay: selectedLT.dsNgay.length + 1, diemDenIds: [] as string[] };
		onUpdate({ ...selectedLT, dsNgay: [...selectedLT.dsNgay, newNgay] });
	};

	const handleXoaNgay = (idx: number) => {
		const dsNgay = selectedLT.dsNgay.filter((_, i) => i !== idx).map((n, i) => ({ ...n, ngay: i + 1 }));
		onUpdate({ ...selectedLT, dsNgay });
	};

	const handleXoaDiemDen = (ngayIdx: number, ddIdx: number) => {
		const dsNgay = [...selectedLT.dsNgay];
		const newIds = [...dsNgay[ngayIdx].diemDenIds];
		newIds.splice(ddIdx, 1);
		dsNgay[ngayIdx] = { ...dsNgay[ngayIdx], diemDenIds: newIds };
		onUpdate({ ...selectedLT, dsNgay });
	};

	const handleMoveDD = (ngayIdx: number, ddIdx: number, direction: 'up' | 'down') => {
		const dsNgay = [...selectedLT.dsNgay];
		const ids = [...dsNgay[ngayIdx].diemDenIds];
		const targetIdx = direction === 'up' ? ddIdx - 1 : ddIdx + 1;
		if (targetIdx < 0 || targetIdx >= ids.length) return;
		[ids[ddIdx], ids[targetIdx]] = [ids[targetIdx], ids[ddIdx]];
		dsNgay[ngayIdx] = { ...dsNgay[ngayIdx], diemDenIds: ids };
		onUpdate({ ...selectedLT, dsNgay });
	};

	return (
		<>
			<Card
				title={<span><CalendarOutlined style={{ marginRight: 8 }} />Chi tiết: {selectedLT.tenLichTrinh}</span>}
				extra={
					<Space>
						<Tooltip title='Sửa tên & ngân sách'>
							<Button icon={<EditOutlined />} onClick={handleOpenSua}>Sửa</Button>
						</Tooltip>
						<Button icon={<PlusOutlined />} onClick={handleThemNgay}>Thêm ngày</Button>
						<Button onClick={onClose}>Đóng</Button>
					</Space>
				}
			>
				<BudgetAlert phanTram={phanTram} conLai={conLai} vuotNganSach={tongChiPhi - nganSach} />

				<Row gutter={[16, 12]} style={{ marginBottom: 16 }}>
					<Col xs={12} sm={6}>
						<Statistic title='Ngân sách' value={nganSach} formatter={(v) => formatTienVND(Number(v))} valueStyle={{ fontSize: 16, color: '#1890ff' }} />
					</Col>
					<Col xs={12} sm={6}>
						<Statistic title='Chi phí ước tính' value={tongChiPhi} formatter={(v) => formatTienVND(Number(v))} valueStyle={{ fontSize: 16, color: phanTram > 100 ? '#f5222d' : '#52c41a' }} />
					</Col>
					<Col xs={12} sm={6}>
						<Statistic
							title='Còn lại'
							value={conLai}
							formatter={(v) => formatTienVND(Number(v))}
							valueStyle={{ fontSize: 16, color: conLai < 0 ? '#f5222d' : '#52c41a' }}
							prefix={conLai < 0 ? <WarningOutlined /> : <CheckCircleOutlined />}
						/>
					</Col>
					<Col xs={12} sm={6}>
						<BudgetProgress phanTram={phanTram} />
					</Col>
				</Row>

				<Row gutter={[16, 12]} style={{ marginBottom: 16 }}>
					<Col xs={12} sm={8}>
						<Statistic title='Số ngày' value={selectedLT.dsNgay.length} suffix='ngày' valueStyle={{ fontSize: 16 }} />
					</Col>
					<Col xs={12} sm={8}>
						<Statistic title='Tổng điểm đến' value={selectedLT.dsNgay.reduce((s, n) => s + n.diemDenIds.length, 0)} suffix='điểm' valueStyle={{ fontSize: 16 }} />
					</Col>
					<Col xs={24} sm={8}>
						<Statistic title='Tổng thời gian ước tính' value={selectedLT.dsNgay.reduce((s, n) => s + tinhThoiGianNgay(n.diemDenIds, dsDiemDen), 0)} suffix='giờ' valueStyle={{ fontSize: 16 }} prefix={<ClockCircleOutlined />} />
					</Col>
				</Row>

				<Collapse defaultActiveKey={['0']} accordion={false}>
					{selectedLT.dsNgay.map((ngay, ngayIdx) => {
						const chiPhi = tinhChiPhiNgay(ngay.diemDenIds, dsDiemDen);
						const thoiGian = tinhThoiGianNgay(ngay.diemDenIds, dsDiemDen);
						return (
							<Panel
								key={ngayIdx.toString()}
								header={
									<Row justify='space-between' align='middle' style={{ width: '100%' }}>
										<span style={{ fontWeight: 600 }}>Ngày {ngay.ngay} — {ngay.diemDenIds.length} điểm đến</span>
										<Space size={16}>
											<span style={{ fontSize: 12 }}><ClockCircleOutlined /> {thoiGian}h</span>
											<span style={{ fontSize: 12, color: '#52c41a' }}><DollarOutlined /> {formatTienVND(chiPhi)}</span>
										</Space>
									</Row>
								}
								extra={
									<Space onClick={(e) => e.stopPropagation()}>
										<Tooltip title='Thêm điểm đến'>
											<Button size='small' type='primary' icon={<PlusCircleOutlined />} onClick={(e) => { e.stopPropagation(); onOpenChonDD(ngayIdx); }} />
										</Tooltip>
										{selectedLT.dsNgay.length > 1 && (
											<Popconfirm title='Xóa ngày này?' onConfirm={(e: any) => { e?.stopPropagation(); handleXoaNgay(ngayIdx); }} onCancel={(e: any) => e?.stopPropagation()} okText='Xóa' cancelText='Hủy'>
												<Button size='small' danger icon={<DeleteOutlined />} onClick={(e) => e.stopPropagation()} />
											</Popconfirm>
										)}
									</Space>
								}
							>
								{ngay.diemDenIds.length === 0 ? (
									<Empty description='Chưa có điểm đến' image={Empty.PRESENTED_IMAGE_SIMPLE}>
										<Button type='dashed' icon={<PlusCircleOutlined />} onClick={() => onOpenChonDD(ngayIdx)}>Thêm điểm đến</Button>
									</Empty>
								) : (
									<div>
										{ngay.diemDenIds.map((ddId, ddIdx) => {
											const dd = getDiemDenById(ddId, dsDiemDen);
											if (!dd) return null;
											return <DiemDenItem key={`${ddIdx}-${ddId}`} dd={dd} ddIdx={ddIdx} totalCount={ngay.diemDenIds.length} ngayIdx={ngayIdx} onMove={handleMoveDD} onRemove={handleXoaDiemDen} />;
										})}
									</div>
								)}
							</Panel>
						);
					})}
				</Collapse>
			</Card>

			<Modal title='Sửa Lịch Trình' visible={modalSuaLT} onOk={handleSuaLT} onCancel={() => setModalSuaLT(false)} okText='Lưu' cancelText='Hủy'>
				<div style={{ marginBottom: 16 }}>
					<div style={{ marginBottom: 6, fontWeight: 500 }}>Tên lịch trình</div>
					<Input value={editTen} onChange={(e) => setEditTen(e.target.value)} placeholder='Nhập tên lịch trình' />
				</div>
				<div>
					<div style={{ marginBottom: 6, fontWeight: 500 }}>Ngân sách tổng thể (VNĐ)</div>
					<VNDInput value={editNganSach} onChange={(v) => setEditNganSach(v || 0)} step={500000} />
				</div>
			</Modal>
		</>
	);
};
