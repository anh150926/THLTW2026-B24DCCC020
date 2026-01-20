import React from 'react';
import { Table, Button, Popconfirm, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

export interface ProductDataType {
	id: number;
	name: string;
	price: number;
	quantity: number;
}

interface ProductTableProps {
	dataSource: ProductDataType[];
	onDelete: (id: number) => void;
	loading?: boolean;
}

const ProductTable: React.FC<ProductTableProps> = ({ dataSource, onDelete, loading }) => {
	const columns: ColumnsType<ProductDataType> = [
		{
			title: 'STT',
			key: 'index',
			width: 60,
			align: 'center',
			render: (_, __, index) => index + 1,
		},
		{
			title: 'Tên sản phẩm',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Giá',
			dataIndex: 'price',
			key: 'price',
			align: 'right',
			render: (val) => (
				<Typography.Text type='danger' strong>
					{val.toLocaleString('vi-VN')} đ
				</Typography.Text>
			),
		},
		{
			title: 'Số lượng',
			dataIndex: 'quantity',
			key: 'quantity',
			align: 'center',
		},
		{
			title: 'Thao tác',
			key: 'action',
			align: 'center',
			width: 100,
			render: (_, record) => (
				<Popconfirm
					title='Xác nhận xóa?'
					description={`Bạn có chắc muốn xóa "${record.name}"?`}
					onConfirm={() => onDelete(record.id)}
					okText='Xóa'
					cancelText='Hủy'
					okButtonProps={{ danger: true }}
				>
					<Button type='primary' danger icon={<DeleteOutlined />} size='small'>
						Xóa
					</Button>
				</Popconfirm>
			),
		},
	];

	return (
		<Table
			columns={columns}
			dataSource={dataSource}
			rowKey='id'
			bordered
			loading={loading}
			pagination={{ pageSize: 5 }}
		/>
	);
};

export default ProductTable;
