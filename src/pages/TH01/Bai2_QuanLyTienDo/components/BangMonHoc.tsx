import React from 'react';
import { Table, Button, Popconfirm, Space, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { MonHoc } from '../type';

interface Props {
	duLieu: MonHoc[];
	suaMon: (mon: MonHoc) => void;
	xoaMon: (id: string) => void;
}

export const BangMonHoc: React.FC<Props> = ({ duLieu, suaMon, xoaMon }) => {
	const cot = [
		{ title: 'Tên Môn Học', dataIndex: 'tenMon', key: 'tenMon', render: (t: string) => <b>{t}</b> },
		{
			title: 'Hành động',
			key: 'action',
			align: 'right' as const,
			render: (_: any, record: MonHoc) => (
				<Space>
					<Tooltip title='Sửa'>
						<Button icon={<EditOutlined />} size='small' onClick={() => suaMon(record)} />
					</Tooltip>
					<Popconfirm title='Bạn chắc chắn muốn xóa?' onConfirm={() => xoaMon(record.id)}>
						<Button danger icon={<DeleteOutlined />} size='small' />
					</Popconfirm>
				</Space>
			),
		},
	];
	return <Table rowKey='id' dataSource={duLieu} columns={cot} pagination={false} />;
};
