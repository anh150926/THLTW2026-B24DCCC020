import React, { useMemo, useState } from 'react';
import { Card, Row, Col, Statistic, Table, Space } from 'antd';
import { LichHen, DichVu, NhanVien, TrangThaiLich } from '../types';
import ColumnChart from '@/components/Chart/ColumnChart';
import MyDateRangePicker from '@/components/MyDatePicker/RangePicker';
import moment from 'moment';

interface Props {
	dsLichHen: LichHen[];
	dsDichVu: DichVu[];
	dsNhanVien?: NhanVien[];
}

export const TabThongKe: React.FC<Props> = ({ dsLichHen, dsDichVu, dsNhanVien = [] }) => {
	const [thoiGianLoc, setThoiGianLoc] = useState<[string, string] | null>(null);

	const dsLichHenLoc = useMemo(() => {
		if (!thoiGianLoc) return dsLichHen;
		return dsLichHen.filter((l) => {
			const ngay = moment(l.ngayDat, 'YYYY-MM-DD');
			return ngay.isSameOrAfter(moment(thoiGianLoc[0], 'YYYY-MM-DD')) && ngay.isSameOrBefore(moment(thoiGianLoc[1], 'YYYY-MM-DD'));
		});
	}, [dsLichHen, thoiGianLoc]);

	const lichHoanThanh = dsLichHenLoc.filter((l) => l.trangThai === TrangThaiLich.HOAN_THANH);

	const thongKeDichVu = useMemo(() =>
		dsDichVu.map((dv) => {
			const soLuot = lichHoanThanh.filter((l) => l.dichVuId === dv.id).length;
			return { id: dv.id, ten: dv.tenDichVu, soLuot, doanhThu: soLuot * dv.giaTien };
		}).sort((a, b) => b.doanhThu - a.doanhThu), [dsDichVu, lichHoanThanh]);

	const thongKeNhanVien = useMemo(() =>
		dsNhanVien.map((nv) => {
			const soLuot = lichHoanThanh.filter((l) => l.nhanVienId === nv.id).length;
			const doanhThu = lichHoanThanh.filter((l) => l.nhanVienId === nv.id)
				.reduce((sum, l) => sum + (dsDichVu.find((d) => d.id === l.dichVuId)?.giaTien || 0), 0);
			return { id: nv.id, ten: nv.tenNhanVien, soLuot, doanhThu };
		}).sort((a, b) => b.doanhThu - a.doanhThu), [dsNhanVien, dsDichVu, lichHoanThanh]);

	const tongDoanhThu = thongKeDichVu.reduce((sum, dv) => sum + dv.doanhThu, 0);

	const cotChung = [
		{ title: 'Tên', dataIndex: 'ten' },
		{ title: 'Số lượt hoàn thành', dataIndex: 'soLuot' },
		{
			title: 'Doanh Thu (VNĐ)', dataIndex: 'doanhThu',
			render: (v: number) => <b>{v.toLocaleString()} đ</b>,
		},
	];

	return (
		<Space direction='vertical' style={{ width: '100%' }}>
			<Card size='small'>
				<Space>
					<b>Lọc theo thời gian:</b>
					<MyDateRangePicker format='DD/MM/YYYY' saveFormat='YYYY-MM-DD' onChange={(val) => setThoiGianLoc(val)} allowClear />
				</Space>
			</Card>

			<Row gutter={16}>
				<Col span={8}><Card><Statistic title='Số Lượng Lịch Hẹn Đã Đặt' value={dsLichHenLoc.length} /></Card></Col>
				<Col span={8}><Card><Statistic title='Số Lịch Hoàn Thành' value={lichHoanThanh.length} valueStyle={{ color: '#52c41a' }} /></Card></Col>
				<Col span={8}><Card><Statistic title='Tổng Doanh Thu' value={tongDoanhThu} suffix='đ' valueStyle={{ color: '#cf1322' }} formatter={(v) => Number(v).toLocaleString()} /></Card></Col>
			</Row>

			<Card title='Biểu Đồ Doanh Thu Dịch Vụ'>
				<ColumnChart
					xAxis={thongKeDichVu.map((d) => d.ten)}
					yAxis={[thongKeDichVu.map((d) => d.doanhThu)]}
					yLabel={['Doanh thu (VNĐ)']}
					height={300}
					formatY={(v: number) => v.toLocaleString() + 'đ'}
				/>
			</Card>

			<Row gutter={16}>
				<Col span={12}>
					<Card title='Doanh Thu Theo Dịch Vụ' size='small'>
						<Table dataSource={thongKeDichVu} columns={cotChung} rowKey='id' pagination={false} size='small' />
					</Card>
				</Col>
				<Col span={12}>
					<Card title='Doanh Thu Theo Nhân Viên' size='small'>
						<Table dataSource={thongKeNhanVien} columns={cotChung} rowKey='id' pagination={false} size='small' />
					</Card>
				</Col>
			</Row>
		</Space>
	);
};
