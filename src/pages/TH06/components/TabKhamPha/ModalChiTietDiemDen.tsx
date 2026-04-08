import React from 'react';
import { Modal, Descriptions, Rate, Tag, Row, Col, Statistic } from 'antd';
import {
	EnvironmentOutlined,
	ClockCircleOutlined,
	DollarOutlined,
} from '@ant-design/icons';
import { DiemDen } from '../../types';
import { LOAI_DIEM_DEN_COLOR } from '../../constants';
import { formatTienVND, tongChiPhiDiemDen } from '../../utils/helpers';

interface Props {
	visible: boolean;
	diemDen: DiemDen | null;
	onClose: () => void;
}

export const ModalChiTietDiemDen: React.FC<Props> = ({ visible, diemDen, onClose }) => {
	if (!diemDen) return null;

	const tongChi = tongChiPhiDiemDen(diemDen);

	return (
		<Modal
			title={<span style={{ fontSize: 18, fontWeight: 600 }}>{diemDen.tenDiemDen}</span>}
			visible={visible}
			onCancel={onClose}
			footer={null}
			width={700}
			bodyStyle={{ padding: 0 }}
		>
			<img
				src={diemDen.hinhAnh}
				alt={diemDen.tenDiemDen}
				style={{ width: '100%', height: 350, objectFit: 'cover', display: 'block' }}
				onError={(e: any) => { e.target.src = 'https://placehold.co/700x350?text=No+Image'; }}
			/>

			<div style={{ padding: '24px' }}>
				<Descriptions column={{ xs: 1, sm: 2 }} bordered size='small'>
					<Descriptions.Item label={<><EnvironmentOutlined /> Địa chỉ</>}>
						{diemDen.diaChi}
					</Descriptions.Item>
					<Descriptions.Item label='Loại hình'>
						<Tag color={LOAI_DIEM_DEN_COLOR[diemDen.loaiHinh]}>{diemDen.loaiHinh}</Tag>
					</Descriptions.Item>
					<Descriptions.Item label='Đánh giá'>
						<Rate disabled allowHalf value={diemDen.rating} style={{ fontSize: 14 }} />
						<span style={{ marginLeft: 8 }}>{diemDen.rating} / 5</span>
					</Descriptions.Item>
					<Descriptions.Item label={<><ClockCircleOutlined /> Thời gian</>}>
						{diemDen.thoiGianThamQuan} giờ
					</Descriptions.Item>
					<Descriptions.Item label='Mô tả' span={2}>
						{diemDen.moTa}
					</Descriptions.Item>
				</Descriptions>

				<div style={{ marginTop: 24 }}>
					<h4 style={{ marginBottom: 12 }}><DollarOutlined /> Chi phí ước tính (VNĐ/người)</h4>
					<Row gutter={[12, 12]}>
						<Col xs={12} sm={6}>
							<Statistic title='Ăn uống' value={diemDen.chiPhiAnUong} formatter={(v) => formatTienVND(Number(v))} valueStyle={{ fontSize: 14, color: '#ff6b6b' }} />
						</Col>
						<Col xs={12} sm={6}>
							<Statistic title='Lưu trú' value={diemDen.chiPhiLuuTru} formatter={(v) => formatTienVND(Number(v))} valueStyle={{ fontSize: 14, color: '#45b7d1' }} />
						</Col>
						<Col xs={12} sm={6}>
							<Statistic title='Di chuyển' value={diemDen.chiPhiDiChuyen} formatter={(v) => formatTienVND(Number(v))} valueStyle={{ fontSize: 14, color: '#4ecdc4' }} />
						</Col>
						<Col xs={12} sm={6}>
							<Statistic title='Tham quan' value={diemDen.chiPhiThamQuan} formatter={(v) => formatTienVND(Number(v))} valueStyle={{ fontSize: 14, color: '#f9ca24' }} />
						</Col>
					</Row>
					<div style={{ marginTop: 16, padding: '12px 16px', background: '#f6ffed', borderRadius: 8, fontWeight: 600, fontSize: 16, border: '1px solid #b7eb8f' }}>
						Tổng chi phí ước tính: <span style={{ color: '#52c41a' }}>{formatTienVND(tongChi)}</span>
					</div>
				</div>
			</div>
		</Modal>
	);
};
