import React from 'react';
import { Card, Col, Row, Statistic, Tag, Progress, Empty } from 'antd';
import {
	CheckCircleOutlined,
	ClockCircleOutlined,
	ExclamationCircleOutlined,
	ProjectOutlined,
	SyncOutlined,
	RiseOutlined,
} from '@ant-design/icons';
import ReactApexChart from 'react-apexcharts';
import type { ITask } from '../types';
import { MAU_TAG, MAU_MUC_DO } from '../constants';
import {
	demTongTask,
	demTaskHoanThanh,
	demTaskQuaHan,
	demTaskDangLam,
	demTaskCanLam,
	tinhPhanTramHoanThanh,
	demTaskTheoTag,
	demTaskTheoMucDo,
	laQuaHan,
	sapXepTheoDeadline,
} from '../utils';
import moment from 'moment';

interface Props {
	dsTask: ITask[];
}

const TabDashboard: React.FC<Props> = ({ dsTask }) => {
	const tongTask = demTongTask(dsTask);
	const taskHoanThanh = demTaskHoanThanh(dsTask);
	const taskQuaHan = demTaskQuaHan(dsTask);
	const taskDangLam = demTaskDangLam(dsTask);
	const taskCanLam = demTaskCanLam(dsTask);
	const phanTram = tinhPhanTramHoanThanh(dsTask);

	const taskTheoTag = demTaskTheoTag(dsTask);
	const tagLabels = Object.keys(taskTheoTag);
	const tagValues = Object.values(taskTheoTag);

	const taskTheoMucDo = demTaskTheoMucDo(dsTask);

	// Task sắp hết hạn (trong 3 ngày tới, chưa hoàn thành)
	const taskSapHetHan = sapXepTheoDeadline(dsTask)
		.filter(
			(t) =>
				t.trangThai !== 'Hoàn thành' &&
				moment(t.deadline).isBetween(moment(), moment().add(3, 'days'), 'day', '[]'),
		)
		.slice(0, 5);

	const chartTagOptions: any = {
		chart: { type: 'bar', toolbar: { show: false } },
		plotOptions: { bar: { borderRadius: 4, horizontal: true } },
		xaxis: { categories: tagLabels },
		colors: ['#1890ff'],
		dataLabels: { enabled: true },
	};

	const chartMucDoOptions: any = {
		chart: { type: 'donut' },
		labels: Object.keys(taskTheoMucDo),
		colors: ['#ff4d4f', '#fa8c16', '#52c41a'],
		legend: { position: 'bottom' },
		dataLabels: { enabled: true },
	};

	return (
		<div>
			{/* Thẻ thống kê */}
			<Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
				<Col xs={12} sm={8} md={4}>
					<Card>
						<Statistic
							title='Tổng số task'
							value={tongTask}
							prefix={<ProjectOutlined style={{ color: '#1890ff' }} />}
						/>
					</Card>
				</Col>
				<Col xs={12} sm={8} md={4}>
					<Card>
						<Statistic
							title='Cần làm'
							value={taskCanLam}
							prefix={<ClockCircleOutlined style={{ color: '#d9d9d9' }} />}
						/>
					</Card>
				</Col>
				<Col xs={12} sm={8} md={4}>
					<Card>
						<Statistic
							title='Đang làm'
							value={taskDangLam}
							prefix={<SyncOutlined style={{ color: '#1890ff' }} />}
						/>
					</Card>
				</Col>
				<Col xs={12} sm={8} md={4}>
					<Card>
						<Statistic
							title='Hoàn thành'
							value={taskHoanThanh}
							prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
						/>
					</Card>
				</Col>
				<Col xs={12} sm={8} md={4}>
					<Card>
						<Statistic
							title='Quá hạn'
							value={taskQuaHan}
							prefix={<ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />}
							valueStyle={{ color: taskQuaHan > 0 ? '#ff4d4f' : undefined }}
						/>
					</Card>
				</Col>
				<Col xs={12} sm={8} md={4}>
					<Card>
						<Statistic
							title='Tiến độ'
							value={phanTram}
							prefix={<RiseOutlined style={{ color: '#52c41a' }} />}
							suffix='%'
						/>
					</Card>
				</Col>
			</Row>

			{/* Thanh tiến độ */}
			<Card style={{ marginBottom: 24 }}>
				<Row align='middle' gutter={16}>
					<Col flex='auto'>
						<Progress
							percent={phanTram}
							status={phanTram === 100 ? 'success' : 'active'}
							strokeColor={{
								'0%': '#1890ff',
								'100%': '#52c41a',
							}}
							strokeWidth={20}
							format={(p) => `${p}% hoàn thành`}
						/>
					</Col>
				</Row>
			</Card>

			{/* Biểu đồ */}
			<Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
				<Col xs={24} md={14}>
					<Card title='Phân bổ task theo Tag'>
						{tagLabels.length > 0 ? (
							<ReactApexChart
								options={chartTagOptions}
								series={[{ name: 'Số task', data: tagValues }]}
								type='bar'
								height={280}
							/>
						) : (
							<Empty description='Chưa có dữ liệu' />
						)}
					</Card>
				</Col>
				<Col xs={24} md={10}>
					<Card title='Phân bổ theo mức độ ưu tiên'>
						{Object.keys(taskTheoMucDo).length > 0 ? (
							<ReactApexChart
								options={chartMucDoOptions}
								series={Object.values(taskTheoMucDo)}
								type='donut'
								height={280}
							/>
						) : (
							<Empty description='Chưa có dữ liệu' />
						)}
					</Card>
				</Col>
			</Row>

			{/* Task sắp hết hạn */}
			<Card title='⚠️ Task sắp hết hạn (trong 3 ngày tới)'>
				{taskSapHetHan.length > 0 ? (
					<div>
						{taskSapHetHan.map((task) => (
							<Card
								key={task.id}
								size='small'
								style={{
									marginBottom: 8,
									borderLeft: `4px solid ${laQuaHan(task) ? '#ff4d4f' : '#faad14'}`,
								}}
							>
								<Row justify='space-between' align='middle'>
									<Col>
										<strong>{task.tenTask}</strong>
										<div style={{ marginTop: 4 }}>
											<Tag color={MAU_TAG[task.tag] || 'default'}>{task.tag}</Tag>
											<Tag color={MAU_MUC_DO[task.mucDoUuTien]}>{task.mucDoUuTien}</Tag>
										</div>
									</Col>
									<Col>
										<Tag
											icon={<ClockCircleOutlined />}
											color={laQuaHan(task) ? 'error' : 'warning'}
										>
											{moment(task.deadline).format('DD/MM/YYYY')}
										</Tag>
									</Col>
								</Row>
							</Card>
						))}
					</div>
				) : (
					<Empty description='Không có task nào sắp hết hạn 🎉' />
				)}
			</Card>
		</div>
	);
};

export default TabDashboard;
