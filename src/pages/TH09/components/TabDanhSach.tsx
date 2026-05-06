import React, { useState, useMemo } from 'react';
import { Table, Tag, Input, Select, Space, Button, Popconfirm, Tooltip, Badge } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import type { ITask } from '../types';
import { ETrangThaiTask } from '../types';
import { DS_TRANG_THAI, MAU_TRANG_THAI, MAU_MUC_DO, MAU_TAG } from '../constants';
import { laQuaHan } from '../utils';

interface Props {
	dsTask: ITask[];
	setDsTask: (tasks: ITask[]) => void;
	onThemTask: () => void;
	onSuaTask: (task: ITask) => void;
}

const TabDanhSach: React.FC<Props> = ({ dsTask, setDsTask, onThemTask, onSuaTask }) => {
	const [tuKhoa, setTuKhoa] = useState('');
	const [locTrangThai, setLocTrangThai] = useState<string | undefined>(undefined);

	const dsHienThi = useMemo(() => {
		let result = [...dsTask];
		if (tuKhoa.trim()) {
			const kw = tuKhoa.toLowerCase().trim();
			result = result.filter((t) => t.tenTask.toLowerCase().includes(kw) || t.tag.toLowerCase().includes(kw));
		}
		if (locTrangThai) {
			result = result.filter((t) => t.trangThai === locTrangThai);
		}
		return result;
	}, [dsTask, tuKhoa, locTrangThai]);

	const handleXoa = (id: string) => {
		setDsTask(dsTask.filter((t) => t.id !== id));
	};

	const columns: ColumnsType<ITask> = [
		{ title: 'STT', width: 60, align: 'center', render: (_: any, __: ITask, i: number) => i + 1 },
		{
			title: 'Tên Task', dataIndex: 'tenTask', width: 250,
			sorter: (a: ITask, b: ITask) => a.tenTask.localeCompare(b.tenTask),
			render: (text: string, record: ITask) => (
				<div>
					<a onClick={() => onSuaTask(record)} style={{ fontWeight: 500 }}>{text}</a>
					{laQuaHan(record) && <Tag icon={<ExclamationCircleOutlined />} color='error' style={{ marginLeft: 8, fontSize: 11 }}>Quá hạn</Tag>}
				</div>
			),
		},
		{ title: 'Mô tả', dataIndex: 'moTa', ellipsis: true, width: 200 },
		{
			title: 'Trạng thái', dataIndex: 'trangThai', width: 130,
			filters: DS_TRANG_THAI.map((tt) => ({ text: tt.label, value: tt.value })),
			onFilter: (value: any, record: ITask) => record.trangThai === value,
			render: (tt: ETrangThaiTask) => <Badge status={MAU_TRANG_THAI[tt] as any} text={tt} />,
		},
		{
			title: 'Ưu tiên', dataIndex: 'mucDoUuTien', width: 120,
			sorter: (a: ITask, b: ITask) => {
				const o: Record<string, number> = { 'Cao': 0, 'Trung bình': 1, 'Thấp': 2 };
				return (o[a.mucDoUuTien] ?? 2) - (o[b.mucDoUuTien] ?? 2);
			},
			render: (m: string) => <Tag color={MAU_MUC_DO[m as keyof typeof MAU_MUC_DO]}>{m}</Tag>,
		},
		{
			title: 'Tag', dataIndex: 'tag', width: 110,
			render: (tag: string) => <Tag color={MAU_TAG[tag] || 'default'}>{tag}</Tag>,
		},
		{
			title: 'Deadline', dataIndex: 'deadline', width: 130,
			sorter: (a: ITask, b: ITask) => moment(a.deadline).valueOf() - moment(b.deadline).valueOf(),
			defaultSortOrder: 'ascend',
			render: (d: string, r: ITask) => (
				<span style={{ color: laQuaHan(r) ? '#ff4d4f' : undefined, fontWeight: laQuaHan(r) ? 600 : undefined }}>
					{moment(d).format('DD/MM/YYYY')}
				</span>
			),
		},
		{
			title: 'Ngày tạo', dataIndex: 'ngayTao', width: 120,
			render: (n: string) => moment(n).format('DD/MM/YYYY'),
		},
		{
			title: 'Thao tác', key: 'actions', width: 100, align: 'center',
			render: (_: any, record: ITask) => (
				<Space>
					<Tooltip title='Sửa'><Button type='link' icon={<EditOutlined />} onClick={() => onSuaTask(record)} /></Tooltip>
					<Popconfirm title='Xóa task này?' onConfirm={() => handleXoa(record.id)} okText='Xóa' cancelText='Hủy'>
						<Tooltip title='Xóa'><Button type='link' danger icon={<DeleteOutlined />} /></Tooltip>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<div>
			<div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
				<Space wrap>
					<Input.Search placeholder='Tìm theo tên, tag...' allowClear enterButton={<SearchOutlined />} onChange={(e) => setTuKhoa(e.target.value)} style={{ width: 320 }} />
					<Select placeholder='Lọc trạng thái' allowClear style={{ width: 180 }} onChange={(v) => setLocTrangThai(v)} options={DS_TRANG_THAI} />
				</Space>
				<Button type='primary' icon={<PlusOutlined />} onClick={onThemTask}>Thêm Task</Button>
			</div>
			<Table<ITask> columns={columns} dataSource={dsHienThi} rowKey='id' pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t) => `Tổng ${t} task` }} size='middle' bordered scroll={{ x: 1100 }} />
		</div>
	);
};

export default TabDanhSach;
