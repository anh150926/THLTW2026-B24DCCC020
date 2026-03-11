import React from 'react';
import { Table, Tag } from 'antd';

interface Props {
	duLieu: any[];
}

export const LichSuOanTuTi: React.FC<Props> = ({ duLieu }) => {
	const columns = [
		{ title: 'Lượt', dataIndex: 'luot', key: 'luot' },
		{ title: 'Bạn chọn', dataIndex: 'nguoi', key: 'nguoi', render: (t: string) => <b>{t}</b> },
		{ title: 'Máy chọn', dataIndex: 'may', key: 'may' },
		{
			title: 'Kết quả',
			dataIndex: 'ketQua',
			key: 'ketQua',
			render: (kq: string) => <Tag color={kq === 'Thắng' ? 'green' : kq === 'Thua' ? 'red' : 'default'}>{kq}</Tag>,
		},
	];
	return <Table rowKey='id' dataSource={duLieu} columns={columns} pagination={{ pageSize: 5 }} size='small' />;
};
