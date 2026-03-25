import React from 'react';
import { Card, Table, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { QuyetDinhTotNghiep } from '../types';
import moment from 'moment';

interface Props {
	dsQuyetDinh: QuyetDinhTotNghiep[];
}

export const TabThongKe: React.FC<Props> = ({ dsQuyetDinh }) => {
	const tongLuot = dsQuyetDinh.reduce((acc, q) => acc + q.luotTraCuu, 0);

	const columns = [
		{
			title: 'STT',
			width: 60,
			align: 'center' as const,
			render: (_: any, __: any, i: number) => i + 1,
		},
		{ title: 'Số Quyết Định', dataIndex: 'soQD', render: (v: string) => <strong>{v}</strong> },
		{
			title: 'Ngày Ban Hành',
			dataIndex: 'ngayBanHanh',
			render: (v: string) => (v ? moment(v).format('DD/MM/YYYY') : '-'),
		},
		{ title: 'Trích Yếu', dataIndex: 'trichYeu', ellipsis: true },
		{
			title: 'Lượt Tra Cứu',
			dataIndex: 'luotTraCuu',
			align: 'center' as const,
			sorter: (a: QuyetDinhTotNghiep, b: QuyetDinhTotNghiep) => a.luotTraCuu - b.luotTraCuu,
			render: (v: number) => (
				<Tag color={v > 0 ? 'green' : 'default'} icon={<SearchOutlined />}>
					{v} lượt
				</Tag>
			),
		},
	];

	return (
		<Card
			title='Thống Kê Lượt Tra Cứu Theo Quyết Định Tốt Nghiệp'
			extra={<Tag color='blue'>Tổng: {tongLuot} lượt</Tag>}
		>
			<Table
				dataSource={[...dsQuyetDinh].sort((a, b) => b.luotTraCuu - a.luotTraCuu)}
				columns={columns}
				rowKey='id'
				pagination={{ pageSize: 10, showSizeChanger: true }}
				size='small'
				locale={{ emptyText: 'Chưa có quyết định tốt nghiệp nào.' }}
			/>
		</Card>
	);
};
