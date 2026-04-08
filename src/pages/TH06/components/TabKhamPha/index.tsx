import React, { useState, useMemo } from 'react';
import { Card, Row, Col, Input, Select, Rate, Tag, Space, Empty } from 'antd';
import { EnvironmentOutlined, ClockCircleOutlined, SearchOutlined, DollarOutlined } from '@ant-design/icons';
import { DiemDen, LoaiDiemDen } from '../../types';
import { LOAI_DIEM_DEN_OPTIONS, LOAI_DIEM_DEN_COLOR } from '../../constants';
import { formatTienVND, tongChiPhiDiemDen } from '../../utils/helpers';
import { ModalChiTietDiemDen } from './ModalChiTietDiemDen';

interface Props {
	dsDiemDen: DiemDen[];
}

export const TabKhamPha: React.FC<Props> = ({ dsDiemDen }) => {
	const [search, setSearch] = useState('');
	const [filterLoai, setFilterLoai] = useState<LoaiDiemDen[]>([]);
	const [filterRating, setFilterRating] = useState<number>(0);
	const [filterGia, setFilterGia] = useState<string>('all');
	const [sortBy, setSortBy] = useState<string>('rating-desc');
	const [selectedDiemDen, setSelectedDiemDen] = useState<DiemDen | null>(null);
	const [modalVisible, setModalVisible] = useState(false);

	const filtered = useMemo(() => {
		let ds = [...dsDiemDen];

		if (search.trim()) {
			const s = search.toLowerCase();
			ds = ds.filter(
				(d) =>
					d.tenDiemDen.toLowerCase().includes(s) ||
					d.diaChi.toLowerCase().includes(s),
			);
		}

		if (filterLoai.length > 0) {
			ds = ds.filter((d) => filterLoai.includes(d.loaiHinh));
		}

		if (filterRating > 0) {
			ds = ds.filter((d) => d.rating >= filterRating);
		}

		if (filterGia !== 'all') {
			const [min, max] = filterGia.split('-').map(Number);
			ds = ds.filter((d) => {
				const t = tongChiPhiDiemDen(d);
				return t >= min && t <= max;
			});
		}

		switch (sortBy) {
			case 'rating-desc':
				ds.sort((a, b) => b.rating - a.rating);
				break;
			case 'rating-asc':
				ds.sort((a, b) => a.rating - b.rating);
				break;
			case 'price-asc':
				ds.sort((a, b) => tongChiPhiDiemDen(a) - tongChiPhiDiemDen(b));
				break;
			case 'price-desc':
				ds.sort((a, b) => tongChiPhiDiemDen(b) - tongChiPhiDiemDen(a));
				break;
			case 'name-asc':
				ds.sort((a, b) => a.tenDiemDen.localeCompare(b.tenDiemDen));
				break;
			default:
				break;
		}

		return ds;
	}, [dsDiemDen, search, filterLoai, filterRating, filterGia, sortBy]);

	const handleClickCard = (dd: DiemDen) => {
		setSelectedDiemDen(dd);
		setModalVisible(true);
	};

	return (
		<Space direction='vertical' style={{ width: '100%' }} size={16}>
			<Card size='small' bodyStyle={{ padding: '12px 16px' }}>
				<Row gutter={[12, 12]} align='middle'>
					<Col xs={24} sm={12} md={5}>
						<Input
							placeholder='Tìm kiếm điểm đến...'
							prefix={<SearchOutlined />}
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							allowClear
						/>
					</Col>
					<Col xs={24} sm={12} md={4}>
						<Select
							mode='multiple'
							placeholder='Loại hình'
							value={filterLoai}
							onChange={setFilterLoai}
							options={LOAI_DIEM_DEN_OPTIONS}
							style={{ width: '100%' }}
							allowClear
							maxTagCount={1}
						/>
					</Col>
					<Col xs={24} sm={12} md={5}>
						<div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingTop: 4 }}>
							<span style={{ whiteSpace: 'nowrap', fontSize: 13, marginBottom: 2 }}>Rating ≥</span>
							<Rate allowHalf value={filterRating} onChange={(v) => setFilterRating(v || 0)} style={{ fontSize: 15, lineHeight: 1 }} />
						</div>
					</Col>
					<Col xs={24} sm={12} md={4}>
						<Select
							value={sortBy}
							onChange={setSortBy}
							style={{ width: '100%' }}
							options={[
								{ label: 'Rating ↓', value: 'rating-desc' },
								{ label: 'Rating ↑', value: 'rating-asc' },
								{ label: 'Giá ↑', value: 'price-asc' },
								{ label: 'Giá ↓', value: 'price-desc' },
								{ label: 'Tên A-Z', value: 'name-asc' },
							]}
						/>
					</Col>
					<Col xs={24} sm={12} md={6}>
						<Select
							value={filterGia}
							onChange={setFilterGia}
							style={{ width: '100%' }}
							options={[
								{ label: '💰 Tất cả mức giá', value: 'all' },
								{ label: 'Dưới 1 triệu', value: '0-1000000' },
								{ label: '1 - 2 triệu', value: '1000000-2000000' },
								{ label: '2 - 3 triệu', value: '2000000-3000000' },
								{ label: '3 - 4 triệu', value: '3000000-4000000' },
								{ label: 'Trên 4 triệu', value: '4000000-99999999' },
							]}
						/>
					</Col>
				</Row>
			</Card>

			{filtered.length === 0 ? (
				<Empty description='Không tìm thấy điểm đến phù hợp' />
			) : (
				<Row gutter={[16, 16]}>
					{filtered.map((dd) => (
						<Col key={dd.id} xs={24} sm={12} md={8} lg={6}>
							<Card
								hoverable
								onClick={() => handleClickCard(dd)}
								cover={
									<img
										alt={dd.tenDiemDen}
										src={dd.hinhAnh}
										style={{ height: 180, objectFit: 'cover' }}
										onError={(e: any) => {
											e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
										}}
									/>
								}
								bodyStyle={{ padding: '12px 16px' }}
								style={{ borderRadius: 8, overflow: 'hidden' }}
							>
								<div style={{ marginBottom: 6 }}>
									<Tag color={LOAI_DIEM_DEN_COLOR[dd.loaiHinh]} style={{ marginRight: 4 }}>
										{dd.loaiHinh}
									</Tag>
								</div>
								<h3 style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 600 }}>{dd.tenDiemDen}</h3>
								<div style={{ color: '#666', fontSize: 13, marginBottom: 4 }}>
									<EnvironmentOutlined style={{ marginRight: 4 }} />
									{dd.diaChi}
								</div>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
									<Rate disabled allowHalf value={dd.rating} style={{ fontSize: 13 }} />
									<span style={{ fontWeight: 600, color: '#1890ff', fontSize: 13 }}>{dd.rating}</span>
								</div>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
									<span><ClockCircleOutlined /> {dd.thoiGianThamQuan}h</span>
									<span style={{ fontWeight: 600, color: '#52c41a' }}>
										<DollarOutlined /> {formatTienVND(tongChiPhiDiemDen(dd))}
									</span>
								</div>
							</Card>
						</Col>
					))}
				</Row>
			)}

			<ModalChiTietDiemDen
				visible={modalVisible}
				diemDen={selectedDiemDen}
				onClose={() => setModalVisible(false)}
			/>
		</Space>
	);
};
