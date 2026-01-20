import React, { useState } from 'react';
import { Button, Input, Card, message, Typography } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

import ProductTable, { ProductDataType } from './components/ProductTable';
import ProductModal, { ProductFormValues } from './components/ProductModal';

const initialData: ProductDataType[] = [
	{ id: 1, name: 'Laptop Dell XPS 13', price: 25000000, quantity: 10 },
	{ id: 2, name: 'iPhone 15 Pro Max', price: 30000000, quantity: 15 },
	{ id: 3, name: 'Samsung Galaxy S24', price: 22000000, quantity: 20 },
	{ id: 4, name: 'iPad Air M2', price: 18000000, quantity: 12 },
	{ id: 5, name: 'MacBook Air M3', price: 28000000, quantity: 8 },
];

const QuanLySanPham: React.FC = () => {
	const [products, setProducts] = useState<ProductDataType[]>(initialData);
	const [searchText, setSearchText] = useState<string>('');
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const filteredProducts = products.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));

	const handleAddProduct = (values: ProductFormValues) => {
		const newProduct: ProductDataType = {
			id: Date.now(),
			...values,
		};
		setProducts([newProduct, ...products]);
		message.success('Thêm sản phẩm thành công!');
		setIsModalOpen(false);
	};

	const handleDeleteProduct = (id: number) => {
		const newDocs = products.filter((item) => item.id !== id);
		setProducts(newDocs);
		message.success('Đã xóa sản phẩm!');
	};

	return (
		<div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
			<Typography.Title level={2} style={{ marginBottom: 24 }}>
				Quản lý sản phẩm
			</Typography.Title>

			<Card bordered={false} style={{ borderRadius: 8 }}>
				<div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between' }}>
					<Input.Search
						placeholder='Tìm tên sản phẩm...'
						allowClear
						enterButton={<SearchOutlined />}
						onChange={(e) => setSearchText(e.target.value)}
						style={{ width: 400 }}
					/>

					<Button type='primary' icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
						Thêm sản phẩm
					</Button>
				</div>

				<ProductTable dataSource={filteredProducts} onDelete={handleDeleteProduct} />

				<ProductModal open={isModalOpen} onCancel={() => setIsModalOpen(false)} onSubmit={handleAddProduct} />
			</Card>
		</div>
	);
};

export default QuanLySanPham;
