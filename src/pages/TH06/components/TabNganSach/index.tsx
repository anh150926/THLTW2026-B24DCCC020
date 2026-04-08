import React, { useState, useMemo } from 'react';
import { Card, Row, Col, Select, Statistic, Table, Empty, Space } from 'antd';
import { WalletOutlined, DollarOutlined } from '@ant-design/icons';
import { DiemDen, LichTrinh, HangMucChiPhi } from '../../types';
import { HANG_MUC_LABELS, HANG_MUC_COLORS } from '../../constants';
import { formatTienVND, tinhTongChiPhi, tinhChiPhiTheoHangMuc, tinhChiPhiNgay } from '../../utils/helpers';
import { BudgetAlert, BudgetProgress } from '../shared';
import DonutChart from '@/components/Chart/DonutChart';
import ColumnChart from '@/components/Chart/ColumnChart';

interface Props {
	dsDiemDen: DiemDen[];
	dsLichTrinh: LichTrinh[];
}

export const TabNganSach: React.FC<Props> = ({ dsDiemDen, dsLichTrinh }) => {
	const [selectedLTId, setSelectedLTId] = useState<string | undefined>(undefined);
	const selectedLT = dsLichTrinh.find((lt) => lt.id === selectedLTId) || null;

	const tongChiPhi = selectedLT ? tinhTongChiPhi(selectedLT, dsDiemDen) : 0;
	const nganSach = selectedLT ? selectedLT.nganSachTongThe : 0;
	const conLai = nganSach - tongChiPhi;
	const phanTram = nganSach > 0 ? Math.round((tongChiPhi / nganSach) * 100) : 0;

	const chiPhiHangMuc = useMemo(() => selectedLT ? tinhChiPhiTheoHangMuc(selectedLT, dsDiemDen) : null, [selectedLT, dsDiemDen]);

	const donutData = useMemo(() => {
		if (!chiPhiHangMuc) return { xAxis: [], yAxis: [[]] };
		return { xAxis: Object.keys(chiPhiHangMuc), yAxis: [Object.values(chiPhiHangMuc)] };
	}, [chiPhiHangMuc]);

	const columnData = useMemo(() => {
		if (!selectedLT) return { xAxis: [], yAxis: [[]], yLabel: [] };
		return {
			xAxis: selectedLT.dsNgay.map((n) => `Ngày ${n.ngay}`),
			yAxis: [selectedLT.dsNgay.map((n) => tinhChiPhiNgay(n.diemDenIds, dsDiemDen))],
			yLabel: ['Chi phí (VNĐ)'],
		};
	}, [selectedLT, dsDiemDen]);

	const tableData = useMemo(() => {
		if (!chiPhiHangMuc) return [];
		return Object.entries(chiPhiHangMuc).map(([key, value], idx) => ({
			key: idx, hangMuc: key, chiPhi: value,
			phanTram: tongChiPhi > 0 ? ((value / tongChiPhi) * 100).toFixed(1) : '0',
		}));
	}, [chiPhiHangMuc, tongChiPhi]);

	const tableColumns = [
		{
			title: 'Hạng mục', dataIndex: 'hangMuc', key: 'hangMuc',
			render: (v: string, _: any, idx: number) => (
				<span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
					<span style={{ width: 12, height: 12, borderRadius: '50%', background: HANG_MUC_COLORS[idx], display: 'inline-block' }} />{v}
				</span>
			),
		},
		{ title: 'Chi phí', dataIndex: 'chiPhi', key: 'chiPhi', render: (v: number) => <span style={{ fontWeight: 600 }}>{formatTienVND(v)}</span>, align: 'right' as any },
		{ title: 'Tỷ lệ', dataIndex: 'phanTram', key: 'phanTram', render: (v: string) => `${v}%`, align: 'right' as any },
	];

	return (
		<Space direction='vertical' style={{ width: '100%' }} size={16}>
			<Card size='small'>
				<Row align='middle' gutter={12}>
					<Col><WalletOutlined style={{ fontSize: 18, color: '#1890ff' }} /></Col>
					<Col flex='auto'>
						<Select placeholder='Chọn lịch trình để xem ngân sách' value={selectedLTId} onChange={setSelectedLTId} style={{ width: '100%' }} allowClear>
							{dsLichTrinh.map((lt) => <Select.Option key={lt.id} value={lt.id}>{lt.tenLichTrinh} — Ngân sách: {formatTienVND(lt.nganSachTongThe)}</Select.Option>)}
						</Select>
					</Col>
				</Row>
			</Card>

			{!selectedLT ? (
				<Empty description='Vui lòng chọn một lịch trình để xem ngân sách' />
			) : (
				<>
					<BudgetAlert phanTram={phanTram} conLai={conLai} vuotNganSach={tongChiPhi - nganSach} />

					<Row gutter={[16, 16]}>
						<Col xs={12} sm={6}>
							<Card><Statistic title='Tổng ngân sách' value={nganSach} formatter={(v) => formatTienVND(Number(v))} prefix={<WalletOutlined />} valueStyle={{ fontSize: 16, color: '#1890ff' }} /></Card>
						</Col>
						<Col xs={12} sm={6}>
							<Card><Statistic title='Đã chi (ước tính)' value={tongChiPhi} formatter={(v) => formatTienVND(Number(v))} prefix={<DollarOutlined />} valueStyle={{ fontSize: 16, color: phanTram > 100 ? '#f5222d' : '#fa8c16' }} /></Card>
						</Col>
						<Col xs={12} sm={6}>
							<Card><Statistic title='Còn lại' value={conLai} formatter={(v) => formatTienVND(Number(v))} valueStyle={{ fontSize: 16, color: conLai < 0 ? '#f5222d' : '#52c41a' }} /></Card>
						</Col>
						<Col xs={12} sm={6}>
							<Card><BudgetProgress phanTram={phanTram} /></Card>
						</Col>
					</Row>

					<Row gutter={[16, 16]}>
						<Col xs={24} md={12}>
							<Card title='Phân Bổ Ngân Sách Theo Hạng Mục'>
								{tongChiPhi === 0 ? <Empty description='Chưa có dữ liệu chi phí' image={Empty.PRESENTED_IMAGE_SIMPLE} /> : (
									<DonutChart xAxis={donutData.xAxis} yAxis={donutData.yAxis} yLabel={HANG_MUC_LABELS} colors={HANG_MUC_COLORS} height={300} showTotal formatY={(v: number) => formatTienVND(v)} />
								)}
							</Card>
						</Col>
						<Col xs={24} md={12}>
							<Card title='Chi Phí Theo Từng Ngày'>
								{selectedLT.dsNgay.length === 0 ? <Empty description='Chưa có dữ liệu' image={Empty.PRESENTED_IMAGE_SIMPLE} /> : (
									<ColumnChart xAxis={columnData.xAxis} yAxis={columnData.yAxis} yLabel={columnData.yLabel} height={300} colors={['#1890ff']} formatY={(v: number) => formatTienVND(v)} />
								)}
							</Card>
						</Col>
					</Row>

					<Card title='Chi Tiết Chi Phí Theo Hạng Mục'>
						<Table
							dataSource={tableData} columns={tableColumns} pagination={false} size='small'
							summary={() => (
								<Table.Summary fixed>
									<Table.Summary.Row>
										<Table.Summary.Cell index={0}><strong>Tổng cộng</strong></Table.Summary.Cell>
										<Table.Summary.Cell index={1} align='right'><strong style={{ color: '#1890ff' }}>{formatTienVND(tongChiPhi)}</strong></Table.Summary.Cell>
										<Table.Summary.Cell index={2} align='right'><strong>100%</strong></Table.Summary.Cell>
									</Table.Summary.Row>
								</Table.Summary>
							)}
						/>
					</Card>
				</>
			)}
		</Space>
	);
};
