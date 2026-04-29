import React from 'react';
import { Card, Col, Row, Statistic, Timeline, Tag, Empty } from 'antd';
import {
	FireOutlined,
	CalendarOutlined,
	ThunderboltOutlined,
	TrophyOutlined,
	ClockCircleOutlined,
} from '@ant-design/icons';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';
import type { IBuoiTap, IChiSoSucKhoe, IMucTieu } from '../types';
import { ETrangThaiMucTieu } from '../types';
import { MAU_LOAI_BAI_TAP } from '../constants';
import {
	tinhTongBuoiTapThang,
	tinhTongCaloThang,
	tinhStreak,
	tinhBuoiTapTheoTuan,
} from '../utils';

interface Props {
	dsBuoiTap: IBuoiTap[];
	dsChiSo: IChiSoSucKhoe[];
	dsMucTieu: IMucTieu[];
}

const TabDashboard: React.FC<Props> = ({ dsBuoiTap, dsChiSo, dsMucTieu }) => {
	const tongBuoiTap = tinhTongBuoiTapThang(dsBuoiTap);
	const tongCalo = tinhTongCaloThang(dsBuoiTap);
	const streak = tinhStreak(dsBuoiTap);
	const tongMucTieu = dsMucTieu.length;
	const mucTieuDat = dsMucTieu.filter((mt) => mt.trangThai === ETrangThaiMucTieu.DaDat).length;
	const phanTramMT = tongMucTieu > 0 ? Math.round((mucTieuDat / tongMucTieu) * 100) : 0;

	const buoiTapTheoTuan = tinhBuoiTapTheoTuan(dsBuoiTap);

	const buoiTapGanNhat = [...dsBuoiTap]
		.sort((a, b) => b.ngay.localeCompare(a.ngay))
		.slice(0, 5);

	const dsChiSoSorted = [...dsChiSo].sort((a, b) => a.ngay.localeCompare(b.ngay));

	const chartBuoiTapOptions: any = {
		chart: { type: 'bar', toolbar: { show: false } },
		plotOptions: { bar: { borderRadius: 4, columnWidth: '50%' } },
		xaxis: { categories: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'] },
		yaxis: { title: { text: 'Số buổi tập' }, min: 0, forceNiceScale: true },
		colors: ['#1890ff'],
		dataLabels: { enabled: true },
	};

	const chartCanNangOptions: any = {
		chart: { type: 'line', toolbar: { show: false }, zoom: { enabled: false } },
		stroke: { curve: 'smooth', width: 3 },
		xaxis: {
			categories: dsChiSoSorted.map((cs) => moment(cs.ngay).format('DD/MM')),
		},
		yaxis: { title: { text: 'Cân nặng (kg)' } },
		colors: ['#52c41a'],
		markers: { size: 5 },
		dataLabels: { enabled: false },
	};

	return (
		<div>
			<Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
				<Col xs={12} sm={6}>
					<Card>
						<Statistic
							title='Buổi tập trong tháng'
							value={tongBuoiTap}
							prefix={<CalendarOutlined style={{ color: '#1890ff' }} />}
							suffix='buổi'
						/>
					</Card>
				</Col>
				<Col xs={12} sm={6}>
					<Card>
						<Statistic
							title='Tổng calo đã đốt'
							value={tongCalo}
							prefix={<FireOutlined style={{ color: '#fa541c' }} />}
							suffix='kcal'
						/>
					</Card>
				</Col>
				<Col xs={12} sm={6}>
					<Card>
						<Statistic
							title='Chuỗi ngày tập'
							value={streak}
							prefix={<ThunderboltOutlined style={{ color: '#faad14' }} />}
							suffix='ngày'
						/>
					</Card>
				</Col>
				<Col xs={12} sm={6}>
					<Card>
						<Statistic
							title='Mục tiêu hoàn thành'
							value={phanTramMT}
							prefix={<TrophyOutlined style={{ color: '#52c41a' }} />}
							suffix='%'
						/>
					</Card>
				</Col>
			</Row>

			<Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
				<Col xs={24} md={12}>
					<Card title='Buổi tập theo tuần (tháng này)'>
						<ReactApexChart
							options={chartBuoiTapOptions}
							series={[{ name: 'Buổi tập', data: buoiTapTheoTuan }]}
							type='bar'
							height={280}
						/>
					</Card>
				</Col>
				<Col xs={24} md={12}>
					<Card title='Thay đổi cân nặng'>
						{dsChiSoSorted.length > 0 ? (
							<ReactApexChart
								options={chartCanNangOptions}
								series={[{ name: 'Cân nặng', data: dsChiSoSorted.map((cs) => cs.canNang) }]}
								type='line'
								height={280}
							/>
						) : (
							<Empty description='Chưa có dữ liệu chỉ số' />
						)}
					</Card>
				</Col>
			</Row>

			<Card title='5 Buổi Tập Gần Nhất'>
				{buoiTapGanNhat.length > 0 ? (
					<Timeline mode='left'>
						{buoiTapGanNhat.map((bt) => (
							<Timeline.Item
								key={bt.id}
								color={bt.trangThai === 'Hoàn thành' ? 'green' : 'red'}
								label={moment(bt.ngay).format('DD/MM/YYYY')}
							>
								<Tag color={MAU_LOAI_BAI_TAP[bt.loaiBaiTap]}>{bt.loaiBaiTap}</Tag>
								<strong>{bt.thoiLuong} phút</strong> — {bt.caloDot} kcal
								{bt.ghiChu && <span style={{ color: '#999', marginLeft: 8 }}>({bt.ghiChu})</span>}
							</Timeline.Item>
						))}
					</Timeline>
				) : (
					<Empty description='Chưa có buổi tập nào' />
				)}
			</Card>
		</div>
	);
};

export default TabDashboard;
