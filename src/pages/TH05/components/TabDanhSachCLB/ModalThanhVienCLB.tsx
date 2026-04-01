import React from 'react';
import { Modal, Table, Tag, Empty } from 'antd';
import { DonDangKy, CauLacBo, GioiTinh } from '../../types';
import { getApprovedMembers } from '../../utils/helpers';

interface Props {
	visible: boolean;
	onCancel: () => void;
	cauLacBo: CauLacBo | null;
	dsDonDangKy: DonDangKy[];
}

export const ModalThanhVienCLB: React.FC<Props> = ({ visible, onCancel, cauLacBo, dsDonDangKy }) => {
	const dsThanhVien = cauLacBo ? getApprovedMembers(cauLacBo.id, dsDonDangKy) : [];

	const columns = [
		{
			title: 'STT',
			width: 60,
			align: 'center' as const,
			render: (_: any, __: any, idx: number) => idx + 1,
		},
		{
			title: 'Họ tên',
			dataIndex: 'hoTen',
			sorter: (a: DonDangKy, b: DonDangKy) => a.hoTen.localeCompare(b.hoTen),
		},
		{ title: 'Email', dataIndex: 'email' },
		{ title: 'SĐT', dataIndex: 'sdt' },
		{
			title: 'Giới tính',
			dataIndex: 'gioiTinh',
			render: (v: GioiTinh) => <Tag color={v === GioiTinh.NAM ? 'blue' : v === GioiTinh.NU ? 'magenta' : 'default'}>{v}</Tag>,
		},
		{ title: 'Sở trường', dataIndex: 'soTruong' },
	];

	return (
		<Modal
			title={`Danh sách thành viên — ${cauLacBo?.tenCLB || ''}`}
			visible={visible}
			onCancel={onCancel}
			footer={null}
			width={900}
		>
			{dsThanhVien.length === 0 ? (
				<Empty description='Chưa có thành viên nào trong CLB này.' />
			) : (
				<Table
					dataSource={dsThanhVien}
					columns={columns}
					rowKey='id'
					pagination={{ pageSize: 10 }}
					size='small'
				/>
			)}
		</Modal>
	);
};
