import React from 'react';
import { Modal, Table, Tag, Empty } from 'antd';
import { LichSuThaoTac, TrangThaiDon } from '../../types';
import { TRANG_THAI_COLOR, TRANG_THAI_TEXT } from '../../constants';
import { formatDateTime } from '../../utils/helpers';

interface Props {
	visible: boolean;
	onCancel: () => void;
	dsLichSu: LichSuThaoTac[];
	/** Nếu truyền donId thì chỉ hiện lịch sử của đơn đó */
	donId?: string;
}

export const ModalLichSu: React.FC<Props> = ({ visible, onCancel, dsLichSu, donId }) => {
	const data = donId ? dsLichSu.filter((l) => l.donDangKyId === donId) : dsLichSu;
	const sorted = [...data].sort((a, b) => new Date(b.thoiGian).getTime() - new Date(a.thoiGian).getTime());

	const columns = [
		{
			title: 'Thời gian',
			dataIndex: 'thoiGian',
			width: 180,
			render: (v: string) => formatDateTime(v),
		},
		{
			title: 'Hành động',
			dataIndex: 'hanhDong',
			width: 120,
			render: (v: TrangThaiDon) => <Tag color={TRANG_THAI_COLOR[v]}>{TRANG_THAI_TEXT[v]}</Tag>,
		},
		{
			title: 'Người thực hiện',
			dataIndex: 'nguoiThucHien',
			width: 140,
		},
		{
			title: 'Lý do',
			dataIndex: 'lyDo',
			render: (v: string) => v || '—',
		},
		{
			title: 'Mã đơn',
			dataIndex: 'donDangKyId',
			width: 140,
			ellipsis: true,
		},
	];

	return (
		<Modal
			title='Lịch Sử Thao Tác Duyệt / Từ Chối'
			visible={visible}
			onCancel={onCancel}
			footer={null}
			width={900}
		>
			{sorted.length === 0 ? (
				<Empty description='Chưa có lịch sử thao tác nào.' />
			) : (
				<Table
					dataSource={sorted}
					columns={columns}
					rowKey='id'
					pagination={{ pageSize: 10 }}
					size='small'
				/>
			)}
		</Modal>
	);
};
