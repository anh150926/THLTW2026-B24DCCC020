import React, { useMemo } from 'react';
import { Card, Row, Col, Statistic, Divider, Button } from 'antd';
import {
	ScheduleOutlined,
	EyeOutlined,
	EnvironmentOutlined,
	DollarOutlined,
	DownloadOutlined,
	RiseOutlined,
	FallOutlined,
} from '@ant-design/icons';
import { DiemDen, LichTrinh } from '../../types';
import { HANG_MUC_LABELS, HANG_MUC_COLORS } from '../../constants';
import { formatTienVND, tinhTongChiPhi, getThangNam, exportToXLSX } from '../../utils/helpers';
import ColumnChart from '@/components/Chart/ColumnChart';
import DonutChart from '@/components/Chart/DonutChart';
import LineChart from '@/components/Chart/LineChart';
import { message } from 'antd';

interface Props {
	dsDiemDen: DiemDen[];
	dsLichTrinh: LichTrinh[];
}

/** Tổng hợp dữ liệu thống kê cho Admin dashboard */
const useThongKeData = (dsDiemDen: DiemDen[], dsLichTrinh: LichTrinh[]) => {
	const tongDoanhThu = useMemo(() => dsLichTrinh.reduce((s, lt) => s + tinhTongChiPhi(lt, dsDiemDen), 0), [dsLichTrinh, dsDiemDen]);
	const tongLuotChon = useMemo(() => dsDiemDen.reduce((s, dd) => s + dd.luotChon, 0), [dsDiemDen]);

	const doanhThuThayDoi = useMemo(() => {
		const now = new Date();
		const thangNay = `T${now.getMonth() + 1}/${now.getFullYear()}`;
		const thangTruoc = now.getMonth() === 0 ? `T12/${now.getFullYear() - 1}` : `T${now.getMonth()}/${now.getFullYear()}`;
		let dtThangNay = 0, dtThangTruoc = 0;
		dsLichTrinh.forEach((lt) => {
			const key = getThangNam(lt.ngayTao);
			const chi = tinhTongChiPhi(lt, dsDiemDen);
			if (key === thangNay) dtThangNay += chi;
			if (key === thangTruoc) dtThangTruoc += chi;
		});
		const phanTram = dtThangTruoc > 0 ? Math.round(((dtThangNay - dtThangTruoc) / dtThangTruoc) * 100) : 0;
		return { dtThangNay, dtThangTruoc, phanTram, tang: phanTram >= 0 };
	}, [dsLichTrinh, dsDiemDen]);

	const buildMonthlyMap = (valueFn: (lt: LichTrinh) => number) => {
		const map: Record<string, number> = {};
		dsLichTrinh.forEach((lt) => { const key = getThangNam(lt.ngayTao); map[key] = (map[key] || 0) + valueFn(lt); });
		const sorted = Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]));
		return { xAxis: sorted.map(([k]) => k), yAxis: [sorted.map(([, v]) => v)] };
	};

	const chartTheoThang = useMemo(() => ({ ...buildMonthlyMap(() => 1), yLabel: ['Số lịch trình'] }), [dsLichTrinh]);
	const doanhThuTheoThang = useMemo(() => ({ ...buildMonthlyMap((lt) => tinhTongChiPhi(lt, dsDiemDen)), yLabel: ['Doanh thu'] }), [dsLichTrinh, dsDiemDen]);

	const chartTopDD = useMemo(() => {
		const top = [...dsDiemDen].filter((d) => d.luotChon > 0).sort((a, b) => a.luotChon - b.luotChon).slice(-8);
		return { xAxis: top.map((d) => d.tenDiemDen), yAxis: [top.map((d) => d.luotChon)], yLabel: ['Lượt chọn'] };
	}, [dsDiemDen]);

	const chartDoanhThuHM = useMemo(() => {
		const totals = [0, 0, 0, 0];
		dsLichTrinh.forEach((lt) => lt.dsNgay.forEach((ngay) => ngay.diemDenIds.forEach((id) => {
			const dd = dsDiemDen.find((d) => d.id === id);
			if (dd) { totals[0] += dd.chiPhiAnUong; totals[1] += dd.chiPhiDiChuyen; totals[2] += dd.chiPhiLuuTru; totals[3] += dd.chiPhiThamQuan; }
		})));
		return { xAxis: HANG_MUC_LABELS.slice(0, 4), yAxis: [totals], yLabel: HANG_MUC_LABELS.slice(0, 4) };
	}, [dsLichTrinh, dsDiemDen]);

	return { tongDoanhThu, tongLuotChon, doanhThuThayDoi, chartTheoThang, doanhThuTheoThang, chartTopDD, chartDoanhThuHM };
};

export const ThongKeDashboard: React.FC<Props> = ({ dsDiemDen, dsLichTrinh }) => {
	const { tongDoanhThu, tongLuotChon, doanhThuThayDoi, chartTheoThang, doanhThuTheoThang, chartTopDD, chartDoanhThuHM } = useThongKeData(dsDiemDen, dsLichTrinh);

	const handleExportLT = () => {
		if (dsLichTrinh.length === 0) { message.warning('Không có lịch trình để xuất!'); return; }
		const data = dsLichTrinh.map((lt, idx) => ({
			'STT': idx + 1, 'Tên lịch trình': lt.tenLichTrinh,
			'Ngày tạo': new Date(lt.ngayTao).toLocaleDateString('vi-VN'),
			'Số ngày': lt.dsNgay.length, 'Ngân sách': lt.nganSachTongThe,
			'Chi phí ước tính': tinhTongChiPhi(lt, dsDiemDen),
			'Tổng điểm đến': lt.dsNgay.reduce((s, n) => s + n.diemDenIds.length, 0),
		}));
		exportToXLSX(data, 'DanhSachLichTrinh');
		message.success('Đã xuất file Excel!');
	};

	const EmptyMsg = ({ text }: { text: string }) => <div style={{ textAlign: 'center', padding: 40, color: '#999' }}>{text}</div>;

	return (
		<>
			<Divider />
			<h3 style={{ marginBottom: 0 }}>📊 Thống Kê Tổng Quan</h3>
			<Row gutter={[16, 16]}>
				<Col xs={24} sm={12} md={6}>
					<Card bodyStyle={{ padding: '16px 20px' }}>
						<Statistic title='Tổng doanh thu' value={tongDoanhThu} formatter={(v) => formatTienVND(Number(v))} prefix={<DollarOutlined />} valueStyle={{ color: '#52c41a', fontSize: 18, fontWeight: 700 }} />
						{doanhThuThayDoi.dtThangTruoc > 0 && (
							<div style={{ marginTop: 4, fontSize: 12, color: doanhThuThayDoi.tang ? '#52c41a' : '#f5222d' }}>
								{doanhThuThayDoi.tang ? <RiseOutlined /> : <FallOutlined />}{' '}{doanhThuThayDoi.tang ? '+' : ''}{doanhThuThayDoi.phanTram}% so với tháng trước
							</div>
						)}
						{doanhThuTheoThang.xAxis.length > 1 && (
							<div style={{ marginTop: 8, marginLeft: -12, marginRight: -12, marginBottom: -8 }}>
								<LineChart xAxis={doanhThuTheoThang.xAxis} yAxis={doanhThuTheoThang.yAxis} yLabel={['Doanh thu']} height={60} colors={['#52c41a']} formatY={() => ''}
									otherOptions={{ chart: { sparkline: { enabled: true } }, stroke: { width: 2, curve: 'smooth' }, fill: { opacity: 0.2 }, tooltip: { y: { formatter: (v: number) => formatTienVND(v) } } }}
								/>
							</div>
						)}
					</Card>
				</Col>
				{[
					{ title: 'Tổng lịch trình', value: dsLichTrinh.length, icon: <ScheduleOutlined />, color: '#722ed1', desc: 'Trong hệ thống hiện tại' },
					{ title: 'Tổng lượt chọn', value: tongLuotChon, icon: <EyeOutlined />, color: '#fa8c16', desc: 'Tổng cộng tất cả điểm đến' },
					{ title: 'Tổng điểm đến', value: dsDiemDen.length, icon: <EnvironmentOutlined />, color: '#1890ff', desc: 'Đang hoạt động' },
				].map((item) => (
					<Col xs={12} sm={12} md={6} key={item.title}>
						<Card bodyStyle={{ padding: '16px 20px' }}>
							<Statistic title={item.title} value={item.value} prefix={item.icon} valueStyle={{ color: item.color, fontSize: 22, fontWeight: 700 }} />
							<div style={{ marginTop: 4, fontSize: 12, color: '#999' }}>{item.desc}</div>
						</Card>
					</Col>
				))}
			</Row>

			<Row gutter={[16, 16]}>
				<Col xs={24} md={14}>
					<Card title='📈 Số Lịch Trình Tạo Theo Tháng' extra={<Button size='small' icon={<DownloadOutlined />} onClick={handleExportLT}>Xuất LT</Button>}>
						{dsLichTrinh.length === 0 ? <EmptyMsg text='Chưa có dữ liệu lịch trình' /> : (
							<ColumnChart xAxis={chartTheoThang.xAxis} yAxis={chartTheoThang.yAxis} yLabel={chartTheoThang.yLabel} height={300} type='area' colors={['#722ed1']} formatY={(v: number) => `${v} LT`}
								otherOptions={{
									stroke: { width: 3, curve: 'smooth' },
									fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.45, opacityTo: 0.05, stops: [0, 100] } },
									markers: { size: 5, colors: ['#722ed1'], strokeColors: '#fff', strokeWidth: 2, hover: { size: 7 } },
									dataLabels: { enabled: true, formatter: (val: number) => `${val}`, style: { fontSize: '12px', fontWeight: 600, colors: ['#722ed1'] }, offsetY: -10 },
									yaxis: { min: 0, forceNiceScale: true, labels: { formatter: (val: number) => `${Math.round(val)}` } },
								}}
							/>
						)}
					</Card>
				</Col>
				<Col xs={24} md={10}>
					<Card title='🍩 Chi Tiêu Theo Hạng Mục'>
						{tongDoanhThu === 0 ? <EmptyMsg text='Chưa có dữ liệu' /> : (
							<DonutChart xAxis={chartDoanhThuHM.xAxis} yAxis={chartDoanhThuHM.yAxis} yLabel={chartDoanhThuHM.yLabel} height={300} colors={HANG_MUC_COLORS.slice(0, 4)} formatY={(v: number) => formatTienVND(v)} showTotal />
						)}
					</Card>
				</Col>
			</Row>

			<Row gutter={[16, 16]}>
				<Col xs={24}>
					<Card title='🏆 Top Điểm Đến Phổ Biến Nhất'>
						{tongLuotChon === 0 ? <EmptyMsg text='Chưa có dữ liệu lượt chọn. Hãy thêm điểm đến vào lịch trình!' /> : (
							<ColumnChart xAxis={chartTopDD.xAxis} yAxis={chartTopDD.yAxis} yLabel={chartTopDD.yLabel} height={Math.max(250, chartTopDD.xAxis.length * 40)} colors={['#1890ff']} formatY={(v: number) => `${v} lượt`}
								otherOptions={{
									plotOptions: { bar: { horizontal: true, barHeight: '60%', borderRadius: 4 } },
									xaxis: { categories: chartTopDD.xAxis, labels: { formatter: (val: string) => `${val}` } },
									dataLabels: { enabled: true, formatter: (val: number) => `${val} lượt`, style: { fontSize: '12px', fontWeight: 600 } },
								}}
							/>
						)}
					</Card>
				</Col>
			</Row>
		</>
	);
};
