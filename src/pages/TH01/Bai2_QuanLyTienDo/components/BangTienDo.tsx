import React from 'react';
import { Table, Button, Popconfirm, Tag, Space, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { TienDo, MonHoc } from '../type';

interface Props {
	duLieu: TienDo[];
	danhSachMon: MonHoc[];
	suaTienDo: (item: TienDo) => void;
	xoaTienDo: (id: string) => void;
}

export const BangTienDo: React.FC<Props> = ({ duLieu, danhSachMon, suaTienDo, xoaTienDo }) => {
	const layTenMon = (id: string) => {
		const mon = danhSachMon.find((m) => m.id === id);
		return mon ? <Tag color='blue'>{mon.tenMon}</Tag> : <Tag color='red'>Đã xóa</Tag>;
	};

	const cot = [
		{ title: 'Môn Học', dataIndex: 'monHocId', key: 'monHocId', render: (id: string) => layTenMon(id) },
		{ title: 'Thời Gian', dataIndex: 'thoiGian', key: 'thoiGian', width: 160 },
		{ title: 'Thời Lượng', dataIndex: 'thoiLuong', key: 'thoiLuong', render: (phut: number) => <b>{phut} phút</b> },
		{ title: 'Nội Dung', dataIndex: 'noiDung', key: 'noiDung' },
		{ title: 'Ghi Chú', dataIndex: 'ghiChu', key: 'ghiChu', ellipsis: true },
		{
			title: 'Thao tác',
			key: 'action',
			align: 'right' as const,
			render: (_: any, record: TienDo) => (
				<Space>
					<Tooltip title='Sửa chi tiết'>
						<Button icon={<EditOutlined />} size='small' onClick={() => suaTienDo(record)} />
					</Tooltip>
					<Popconfirm title='Xóa dòng này?' onConfirm={() => xoaTienDo(record.id)}>
						<Button type='text' danger icon={<DeleteOutlined />} />
					</Popconfirm>
				</Space>
			),
		},
	];

	return <Table rowKey='id' dataSource={duLieu} columns={cot} />;
};
