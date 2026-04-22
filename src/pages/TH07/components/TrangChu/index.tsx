import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Card, Row, Col, Pagination, Input, Tag, Typography, Empty, Avatar } from 'antd';
import {
	SearchOutlined,
	CalendarOutlined,
	EyeOutlined,
	UserOutlined,
	TagOutlined,
} from '@ant-design/icons';
import { IBaiViet, IThe, ETrangThai } from '../../types';
import { MAU_THE, SO_BAI_MOI_TRANG } from '../../constants';
import { layTenThe } from '../../utils/helpers';
import ChiTietBaiViet from './ChiTietBaiViet';

const { Meta } = Card;
const { Paragraph, Text } = Typography;

interface ITrangChuProps {
	dsBaiViet: IBaiViet[];
	setDsBaiViet: React.Dispatch<React.SetStateAction<IBaiViet[]>>;
	dsThe: IThe[];
}

const TrangChu: React.FC<ITrangChuProps> = ({ dsBaiViet, setDsBaiViet, dsThe }) => {
	const [tuKhoa, setTuKhoa] = useState('');
	const [tuKhoaDebounced, setTuKhoaDebounced] = useState('');
	const [theLocId, setTheLocId] = useState<string | null>(null);
	const [trangHienTai, setTrangHienTai] = useState(1);
	const [baiVietChiTietId, setBaiVietChiTietId] = useState<string | null>(null);

	useEffect(() => {
		const timer = setTimeout(() => setTuKhoaDebounced(tuKhoa), 300);
		return () => clearTimeout(timer);
	}, [tuKhoa]);

	useEffect(() => {
		setTrangHienTai(1);
	}, [tuKhoaDebounced, theLocId]);

	const dsBaiVietDaDang = useMemo(
		() => dsBaiViet.filter((bv) => bv.trangThai === ETrangThai.DaDang),
		[dsBaiViet],
	);

	const dsBaiVietLoc = useMemo(() => {
		let ketQua = dsBaiVietDaDang;
		if (theLocId) {
			ketQua = ketQua.filter((bv) => bv.dsTheId.includes(theLocId));
		}
		if (tuKhoaDebounced.trim()) {
			const kw = tuKhoaDebounced.trim().toLowerCase();
			ketQua = ketQua.filter(
				(bv) => bv.tieuDe.toLowerCase().includes(kw) || bv.tomTat.toLowerCase().includes(kw),
			);
		}
		return ketQua;
	}, [dsBaiVietDaDang, theLocId, tuKhoaDebounced]);

	const dsBaiVietTrang = useMemo(() => {
		const start = (trangHienTai - 1) * SO_BAI_MOI_TRANG;
		return dsBaiVietLoc.slice(start, start + SO_BAI_MOI_TRANG);
	}, [dsBaiVietLoc, trangHienTai]);

	const moChiTiet = useCallback(
		(id: string) => {
			setDsBaiViet((prev) =>
				prev.map((item) => (item.id === id ? { ...item, luotXem: item.luotXem + 1 } : item)),
			);
			setBaiVietChiTietId(id);
		},
		[setDsBaiViet],
	);

	if (baiVietChiTietId) {
		return (
			<ChiTietBaiViet
				baiVietId={baiVietChiTietId}
				dsBaiViet={dsBaiViet}
				dsThe={dsThe}
				quayLai={() => setBaiVietChiTietId(null)}
				moChiTiet={moChiTiet}
			/>
		);
	}

	return (
		<div>
			<Card style={{ marginBottom: 16 }}>
				<Row gutter={[16, 16]} align='middle'>
					<Col xs={24} md={12}>
						<Input
							placeholder='Tìm kiếm bài viết theo từ khóa...'
							prefix={<SearchOutlined />}
							size='large'
							value={tuKhoa}
							onChange={(e) => setTuKhoa(e.target.value)}
							allowClear
						/>
					</Col>
					<Col xs={24} md={12}>
						<div>
							<TagOutlined style={{ marginRight: 8 }} />
							<Text strong>Lọc theo thẻ: </Text>
							<Tag
								color={!theLocId ? '#1890ff' : undefined}
								style={{ cursor: 'pointer', marginTop: 4 }}
								onClick={() => setTheLocId(null)}
							>
								Tất cả
							</Tag>
							{dsThe.map((the, idx) => (
								<Tag
									key={the.id}
									color={theLocId === the.id ? MAU_THE[idx % MAU_THE.length] : undefined}
									style={{ cursor: 'pointer', marginTop: 4 }}
									onClick={() => setTheLocId(theLocId === the.id ? null : the.id)}
								>
									{the.tenThe}
								</Tag>
							))}
						</div>
					</Col>
				</Row>
			</Card>

			{dsBaiVietTrang.length === 0 ? (
				<Empty description='Không tìm thấy bài viết nào' style={{ marginTop: 40 }} />
			) : (
				<>
					<Row gutter={[16, 16]}>
						{dsBaiVietTrang.map((bv) => (
							<Col xs={24} sm={12} lg={8} key={bv.id}>
								<Card
									hoverable
									cover={
										<img
											alt={bv.tieuDe}
											src={bv.anhDaiDien}
											style={{ height: 200, objectFit: 'cover' }}
										/>
									}
									onClick={() => moChiTiet(bv.id)}
									actions={[
										<span key='date'><CalendarOutlined /> {bv.ngayDang}</span>,
										<span key='views'><EyeOutlined /> {bv.luotXem}</span>,
									]}
								>
									<Meta
										avatar={<Avatar icon={<UserOutlined />} size='small' />}
										title={bv.tieuDe}
										description={
											<div>
												<Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 8, color: '#666' }}>
													{bv.tomTat}
												</Paragraph>
												<div>
													{bv.dsTheId.map((theId, idx) => (
														<Tag key={theId} color={MAU_THE[idx % MAU_THE.length]} style={{ marginBottom: 4 }}>
															{layTenThe(theId, dsThe)}
														</Tag>
													))}
												</div>
												<Text type='secondary' style={{ fontSize: 12 }}>
													<UserOutlined /> {bv.tacGia}
												</Text>
											</div>
										}
									/>
								</Card>
							</Col>
						))}
					</Row>
					<div style={{ textAlign: 'center', marginTop: 24 }}>
						<Pagination
							current={trangHienTai}
							total={dsBaiVietLoc.length}
							pageSize={SO_BAI_MOI_TRANG}
							onChange={(page) => setTrangHienTai(page)}
							showTotal={(total) => `Tổng cộng: ${total} bài viết`}
							showSizeChanger={false}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default TrangChu;
