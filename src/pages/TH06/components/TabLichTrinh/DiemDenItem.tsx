import React from 'react';
import { Button, Space, Tooltip, Popconfirm } from 'antd';
import {
	CloseCircleOutlined,
	ArrowUpOutlined,
	ArrowDownOutlined,
	ClockCircleOutlined,
	DollarOutlined,
	CarOutlined,
} from '@ant-design/icons';
import { DiemDen } from '../../types';
import { formatTienVND, tongChiPhiDiemDen } from '../../utils/helpers';

interface Props {
	dd: DiemDen;
	ddIdx: number;
	totalCount: number;
	ngayIdx: number;
	onMove: (ngayIdx: number, ddIdx: number, direction: 'up' | 'down') => void;
	onRemove: (ngayIdx: number, ddIdx: number) => void;
}

/** Hiển thị thông tin 1 điểm đến trong lịch trình ngày */
export const DiemDenItem: React.FC<Props> = ({ dd, ddIdx, totalCount, ngayIdx, onMove, onRemove }) => (
	<>
		{ddIdx > 0 && (
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px 0', color: '#bbb', fontSize: 12, gap: 6 }}>
				<div style={{ flex: 1, height: 1, background: '#e8e8e8' }} />
				<CarOutlined style={{ color: '#fa8c16' }} />
				<span style={{ color: '#fa8c16', fontWeight: 500 }}>~1h di chuyển</span>
				<div style={{ flex: 1, height: 1, background: '#e8e8e8' }} />
			</div>
		)}
		<div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', marginBottom: 4, background: '#fafafa', borderRadius: 6, border: '1px solid #f0f0f0' }}>
			<div style={{ width: 24, height: 24, borderRadius: '50%', background: '#1890ff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
				{ddIdx + 1}
			</div>
			<img
				src={dd.hinhAnh}
				alt={dd.tenDiemDen}
				style={{ width: 48, height: 36, objectFit: 'cover', borderRadius: 4, flexShrink: 0 }}
				onError={(e: any) => { e.target.src = 'https://placehold.co/48x36?text=No'; }}
			/>
			<div style={{ flex: 1, minWidth: 0 }}>
				<div style={{ fontWeight: 600, fontSize: 14 }}>{dd.tenDiemDen}</div>
				<div style={{ fontSize: 12, color: '#888' }}>
					{dd.diaChi} · <ClockCircleOutlined /> {dd.thoiGianThamQuan}h · <DollarOutlined /> {formatTienVND(tongChiPhiDiemDen(dd))}
				</div>
			</div>
			<Space size={4}>
				<Tooltip title='Di chuyển lên'>
					<Button size='small' icon={<ArrowUpOutlined />} disabled={ddIdx === 0} onClick={() => onMove(ngayIdx, ddIdx, 'up')} />
				</Tooltip>
				<Tooltip title='Di chuyển xuống'>
					<Button size='small' icon={<ArrowDownOutlined />} disabled={ddIdx === totalCount - 1} onClick={() => onMove(ngayIdx, ddIdx, 'down')} />
				</Tooltip>
				<Popconfirm title='Xóa điểm đến này?' onConfirm={() => onRemove(ngayIdx, ddIdx)} okText='Xóa' cancelText='Hủy'>
					<Tooltip title='Xóa'>
						<Button size='small' danger icon={<CloseCircleOutlined />} />
					</Tooltip>
				</Popconfirm>
			</Space>
		</div>
	</>
);
