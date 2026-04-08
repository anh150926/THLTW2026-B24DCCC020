import React, { useState, useMemo } from 'react';
import { Modal, Input, List, Tag, Rate, Row, Col, Empty } from 'antd';
import { EnvironmentOutlined, SearchOutlined } from '@ant-design/icons';
import { DiemDen } from '../../types';
import { LOAI_DIEM_DEN_COLOR } from '../../constants';
import { formatTienVND, tongChiPhiDiemDen } from '../../utils/helpers';

interface Props {
	visible: boolean;
	dsDiemDen: DiemDen[];
	onClose: () => void;
	onSelect: (diemDenId: string) => void;
}

export const ModalChonDiemDen: React.FC<Props> = ({ visible, dsDiemDen, onClose, onSelect }) => {
	const [search, setSearch] = useState('');

	const filtered = useMemo(() => {
		if (!search.trim()) return dsDiemDen;
		const s = search.toLowerCase();
		return dsDiemDen.filter(
			(d) =>
				d.tenDiemDen.toLowerCase().includes(s) ||
				d.diaChi.toLowerCase().includes(s) ||
				d.loaiHinh.toLowerCase().includes(s),
		);
	}, [dsDiemDen, search]);

	const handleSelect = (dd: DiemDen) => {
		onSelect(dd.id);
		setSearch('');
	};

	return (
		<Modal
			title='Chọn Điểm Đến'
			visible={visible}
			onCancel={() => {
				setSearch('');
				onClose();
			}}
			footer={null}
			width={600}
			bodyStyle={{ maxHeight: 500, overflowY: 'auto', padding: '12px 24px' }}
		>
			<Input
				placeholder='Tìm kiếm điểm đến...'
				prefix={<SearchOutlined />}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				allowClear
				style={{ marginBottom: 12 }}
			/>

			{filtered.length === 0 ? (
				<Empty description='Không tìm thấy điểm đến' />
			) : (
				<List
					dataSource={filtered}
					renderItem={(dd) => (
						<List.Item
							onClick={() => handleSelect(dd)}
							style={{ cursor: 'pointer', padding: '10px 12px', borderRadius: 6, transition: 'background 0.2s' }}
							onMouseEnter={(e: any) => (e.currentTarget.style.background = '#f0f5ff')}
							onMouseLeave={(e: any) => (e.currentTarget.style.background = 'transparent')}
						>
							<Row style={{ width: '100%' }} align='middle' gutter={12}>
								<Col flex='60px'>
									<img
										src={dd.hinhAnh}
										alt={dd.tenDiemDen}
										style={{ width: 56, height: 40, objectFit: 'cover', borderRadius: 4 }}
										onError={(e: any) => {
											e.target.src = 'https://via.placeholder.com/56x40?text=No';
										}}
									/>
								</Col>
								<Col flex='auto'>
									<div style={{ fontWeight: 600 }}>{dd.tenDiemDen}</div>
									<div style={{ fontSize: 12, color: '#888' }}>
										<EnvironmentOutlined /> {dd.diaChi}
									</div>
								</Col>
								<Col>
									<Tag color={LOAI_DIEM_DEN_COLOR[dd.loaiHinh]}>{dd.loaiHinh}</Tag>
								</Col>
								<Col>
									<Rate disabled allowHalf value={dd.rating} style={{ fontSize: 12 }} />
								</Col>
								<Col>
									<span style={{ fontWeight: 600, color: '#52c41a', fontSize: 12, whiteSpace: 'nowrap' }}>
										{formatTienVND(tongChiPhiDiemDen(dd))}
									</span>
								</Col>
							</Row>
						</List.Item>
					)}
				/>
			)}
		</Modal>
	);
};
