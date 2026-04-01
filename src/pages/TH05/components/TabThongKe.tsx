import React, { useMemo } from 'react';
import { Card, Row, Col, Statistic, Space, Select, Button, message } from 'antd';
import { TeamOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined, DownloadOutlined } from '@ant-design/icons';
import { CauLacBo, DonDangKy, TrangThaiDon } from '../types';
import { countDonByStatus, exportToXLSX, getCLBName } from '../utils/helpers';
import ColumnChart from '@/components/Chart/ColumnChart';
import { useState } from 'react';

interface Props {
	dsCauLacBo: CauLacBo[];
	dsDonDangKy: DonDangKy[];
}

export const TabThongKe: React.FC<Props> = ({ dsCauLacBo, dsDonDangKy }) => {
	const [xuatCLBId, setXuatCLBId] = useState<string | undefined>(undefined);

	// Thống kê tổng quan
	const tongCLB = dsCauLacBo.length;
	const tongPending = dsDonDangKy.filter((d) => d.trangThai === TrangThaiDon.PENDING).length;
	const tongApproved = dsDonDangKy.filter((d) => d.trangThai === TrangThaiDon.APPROVED).length;
	const tongRejected = dsDonDangKy.filter((d) => d.trangThai === TrangThaiDon.REJECTED).length;

	// Dữ liệu cho ColumnChart
	const chartData = useMemo(() => {
		const xAxis = dsCauLacBo.map((c) => c.tenCLB);
		const arrPending = dsCauLacBo.map((c) => countDonByStatus(c.id, TrangThaiDon.PENDING, dsDonDangKy));
		const arrApproved = dsCauLacBo.map((c) => countDonByStatus(c.id, TrangThaiDon.APPROVED, dsDonDangKy));
		const arrRejected = dsCauLacBo.map((c) => countDonByStatus(c.id, TrangThaiDon.REJECTED, dsDonDangKy));
		return { xAxis, yAxis: [arrPending, arrApproved, arrRejected] };
	}, [dsCauLacBo, dsDonDangKy]);

	/** Xuất danh sách thành viên Approved ra XLSX */
	const handleExportXLSX = () => {
		let dsXuat: DonDangKy[];
		let fileName: string;

		if (xuatCLBId) {
			dsXuat = dsDonDangKy.filter((d) => d.cauLacBoId === xuatCLBId && d.trangThai === TrangThaiDon.APPROVED);
			const clbName = getCLBName(xuatCLBId, dsCauLacBo);
			fileName = `ThanhVien_${clbName}`;
		} else {
			dsXuat = dsDonDangKy.filter((d) => d.trangThai === TrangThaiDon.APPROVED);
			fileName = 'ThanhVien_TatCaCLB';
		}

		if (dsXuat.length === 0) {
			message.warning('Không có thành viên nào để xuất!');
			return;
		}

		const data = dsXuat.map((d, idx) => ({
			'STT': idx + 1,
			'Họ tên': d.hoTen,
			'Email': d.email,
			'SĐT': d.sdt,
			'Giới tính': d.gioiTinh,
			'Địa chỉ': d.diaChi,
			'Sở trường': d.soTruong,
			'CLB': getCLBName(d.cauLacBoId, dsCauLacBo),
			'Ngày đăng ký': new Date(d.ngayDangKy).toLocaleDateString('vi-VN'),
		}));

		exportToXLSX(data, fileName);
		message.success(`Đã xuất ${dsXuat.length} thành viên ra file ${fileName}.xlsx!`);
	};

	return (
		<Space direction='vertical' style={{ width: '100%' }} size={16}>
			{/* Thống kê tổng quan */}
			<Row gutter={16}>
				<Col span={6}>
					<Card>
						<Statistic title='Tổng số CLB' value={tongCLB} prefix={<TeamOutlined />} valueStyle={{ color: '#1890ff' }} />
					</Card>
				</Col>
				<Col span={6}>
					<Card>
						<Statistic title='Đơn chờ duyệt' value={tongPending} prefix={<ClockCircleOutlined />} valueStyle={{ color: '#fa8c16' }} />
					</Card>
				</Col>
				<Col span={6}>
					<Card>
						<Statistic title='Đơn đã duyệt' value={tongApproved} prefix={<CheckCircleOutlined />} valueStyle={{ color: '#52c41a' }} />
					</Card>
				</Col>
				<Col span={6}>
					<Card>
						<Statistic title='Đơn từ chối' value={tongRejected} prefix={<CloseCircleOutlined />} valueStyle={{ color: '#f5222d' }} />
					</Card>
				</Col>
			</Row>

			{/* Biểu đồ */}
			<Card title='Biểu Đồ Số Đơn Đăng Ký Theo Từng CLB'>
				{dsCauLacBo.length === 0 ? (
					<div style={{ textAlign: 'center', padding: 40, color: '#999' }}>Chưa có dữ liệu CLB để hiển thị biểu đồ.</div>
				) : (
					<ColumnChart
						xAxis={chartData.xAxis}
						yAxis={chartData.yAxis}
						yLabel={['Chờ duyệt (Pending)', 'Đã duyệt (Approved)', 'Từ chối (Rejected)']}
						height={350}
						colors={['#fa8c16', '#52c41a', '#f5222d']}
						formatY={(v: number) => v.toString()}
					/>
				)}
			</Card>

			{/* Xuất XLSX */}
			<Card title='Xuất Danh Sách Thành Viên Ra File Excel'>
				<Space>
					<span>Chọn CLB:</span>
					<Select
						style={{ width: 300 }}
						placeholder='Tất cả CLB'
						allowClear
						value={xuatCLBId}
						onChange={setXuatCLBId}
					>
						{dsCauLacBo.map((c) => (
							<Select.Option key={c.id} value={c.id}>
								{c.tenCLB} ({dsDonDangKy.filter((d) => d.cauLacBoId === c.id && d.trangThai === TrangThaiDon.APPROVED).length} thành viên)
							</Select.Option>
						))}
					</Select>
					<Button type='primary' icon={<DownloadOutlined />} onClick={handleExportXLSX}>
						Xuất file XLSX
					</Button>
				</Space>
			</Card>
		</Space>
	);
};
