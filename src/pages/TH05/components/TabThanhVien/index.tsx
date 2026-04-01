import React, { useState, useMemo, useCallback } from 'react';
import { Card, Table, Select, Space, Tag, Button, message, Input, Empty } from 'antd';
import { SwapOutlined, SearchOutlined } from '@ant-design/icons';
import { CauLacBo, DonDangKy, TrangThaiDon, GioiTinh } from '../../types';
import { getCLBName } from '../../utils/helpers';
import { ModalChuyenCLB } from './ModalChuyenCLB';

interface Props {
	dsCauLacBo: CauLacBo[];
	dsDonDangKy: DonDangKy[];
	setDsDonDangKy: (val: DonDangKy[]) => void;
}

export const TabThanhVien: React.FC<Props> = ({ dsCauLacBo, dsDonDangKy, setDsDonDangKy }) => {
	const [selectedCLBId, setSelectedCLBId] = useState<string | undefined>(undefined);
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [visibleChuyenCLB, setVisibleChuyenCLB] = useState(false);

	/** Danh sách thành viên approved, được lọc theo CLB đã chọn */
	const dsThanhVien = useMemo(() => {
		let list = dsDonDangKy.filter((d) => d.trangThai === TrangThaiDon.APPROVED);
		if (selectedCLBId) list = list.filter((d) => d.cauLacBoId === selectedCLBId);
		return list;
	}, [dsDonDangKy, selectedCLBId]);

	const handleChuyenCLB = useCallback((clbMoiId: string) => {
		const updatedDons = dsDonDangKy.map((d) => {
			if (selectedRowKeys.includes(d.id)) {
				return { ...d, cauLacBoId: clbMoiId };
			}
			return d;
		});
		setDsDonDangKy(updatedDons);
		setVisibleChuyenCLB(false);
		setSelectedRowKeys([]);
		const clbName = dsCauLacBo.find((c) => c.id === clbMoiId)?.tenCLB || '';
		message.success(`Đã chuyển ${selectedRowKeys.length} thành viên sang CLB "${clbName}"!`);
	}, [dsDonDangKy, selectedRowKeys, dsCauLacBo, setDsDonDangKy]);

	const getColumnSearchProps = (dataIndex: string) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
			<div style={{ padding: 8 }}>
				<Input
					placeholder='Tìm kiếm...'
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => confirm()}
					style={{ marginBottom: 8, display: 'block' }}
				/>
				<Space>
					<Button type='primary' onClick={() => confirm()} icon={<SearchOutlined />} size='small'>Tìm</Button>
					<Button onClick={() => { clearFilters && clearFilters(); confirm(); }} size='small'>Xóa</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
		onFilter: (value: any, record: any) => record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
	});

	const columns: any[] = [
		{
			title: 'STT',
			width: 60,
			align: 'center' as const,
			render: (_: any, __: any, idx: number) => idx + 1,
		},
		{
			title: 'Họ tên',
			dataIndex: 'hoTen',
			sorter: (a: DonDangKy, b: DonDangKy) => a.hoTen.localeCompare(b.hoTen),
			...getColumnSearchProps('hoTen'),
		},
		{ title: 'Email', dataIndex: 'email', ...getColumnSearchProps('email') },
		{ title: 'SĐT', dataIndex: 'sdt', width: 120 },
		{
			title: 'Giới tính',
			dataIndex: 'gioiTinh',
			width: 100,
			render: (v: GioiTinh) => <Tag color={v === GioiTinh.NAM ? 'blue' : v === GioiTinh.NU ? 'magenta' : 'default'}>{v}</Tag>,
		},
		{ title: 'Sở trường', dataIndex: 'soTruong', ellipsis: true },
		{
			title: 'CLB',
			dataIndex: 'cauLacBoId',
			render: (v: string) => <Tag color='blue'>{getCLBName(v, dsCauLacBo)}</Tag>,
		},
	];

	const rowSelection = {
		selectedRowKeys,
		onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
	};

	return (
		<>
			<Card
				title='Quản Lý Thành Viên Câu Lạc Bộ'
				extra={
					<Space>
						<span>Chọn CLB:</span>
						<Select
							style={{ width: 250 }}
							placeholder='Tất cả CLB'
							allowClear
							value={selectedCLBId}
							onChange={(val) => { setSelectedCLBId(val); setSelectedRowKeys([]); }}
						>
							{dsCauLacBo.map((c) => (
								<Select.Option key={c.id} value={c.id}>{c.tenCLB} ({dsDonDangKy.filter((d) => d.cauLacBoId === c.id && d.trangThai === TrangThaiDon.APPROVED).length} TV)</Select.Option>
							))}
						</Select>
					</Space>
				}
			>
				{selectedRowKeys.length > 0 && (
					<div style={{ marginBottom: 16 }}>
						<Space>
							<span>Đã chọn <strong>{selectedRowKeys.length}</strong> thành viên:</span>
							<Button type='primary' icon={<SwapOutlined />} onClick={() => setVisibleChuyenCLB(true)}>
								Chuyển CLB cho {selectedRowKeys.length} thành viên
							</Button>
							<Button onClick={() => setSelectedRowKeys([])}>Bỏ chọn</Button>
						</Space>
					</div>
				)}

				{dsThanhVien.length === 0 ? (
					<Empty description={selectedCLBId ? 'CLB này chưa có thành viên nào.' : 'Chưa có thành viên nào được duyệt.'} />
				) : (
					<Table
						dataSource={dsThanhVien}
						columns={columns}
						rowKey='id'
						pagination={{ pageSize: 10 }}
						rowSelection={rowSelection}
					/>
				)}
			</Card>

			<ModalChuyenCLB
				visible={visibleChuyenCLB}
				onCancel={() => setVisibleChuyenCLB(false)}
				onConfirm={handleChuyenCLB}
				dsCauLacBo={dsCauLacBo}
				soLuong={selectedRowKeys.length}
				currentCLBId={selectedCLBId}
			/>
		</>
	);
};
