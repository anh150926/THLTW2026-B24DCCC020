import React, { useMemo, useState } from 'react';
import { Card, Table, Button, Tag, Input, Select, Space, message, Popconfirm } from 'antd';
import {
	PlusOutlined,
	EditOutlined,
	DeleteOutlined,
	SearchOutlined,
	ExclamationCircleOutlined,
	EyeOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { IBaiViet, IThe, ETrangThai } from '../../types';
import { MAU_TRANG_THAI, DS_TRANG_THAI, MAU_THE } from '../../constants';
import { layTenThe, taoId } from '../../utils/helpers';
import FormBaiViet from './FormBaiViet';

interface IQuanLyBaiVietProps {
	dsBaiViet: IBaiViet[];
	setDsBaiViet: React.Dispatch<React.SetStateAction<IBaiViet[]>>;
	dsThe: IThe[];
}

const QuanLyBaiViet: React.FC<IQuanLyBaiVietProps> = ({ dsBaiViet, setDsBaiViet, dsThe }) => {
	const [tuKhoa, setTuKhoa] = useState('');
	const [locTrangThai, setLocTrangThai] = useState<ETrangThai | undefined>(undefined);
	const [modalMo, setModalMo] = useState(false);
	const [baiVietDangSua, setBaiVietDangSua] = useState<IBaiViet | null>(null);

	const moThemMoi = () => {
		setBaiVietDangSua(null);
		setModalMo(true);
	};

	const moChinhSua = (record: IBaiViet) => {
		setBaiVietDangSua(record);
		setModalMo(true);
	};

	const xuLyXoa = (id: string, tieuDe: string) => {
		setDsBaiViet((prev) => prev.filter((item) => item.id !== id));
		message.success(`Đã xóa bài viết "${tieuDe}".`);
	};

	const xuLyLuu = (values: Omit<IBaiViet, 'id' | 'luotXem'>) => {
		if (baiVietDangSua) {
			setDsBaiViet((prev) =>
				prev.map((item) =>
					item.id === baiVietDangSua.id
						? { ...values, id: baiVietDangSua.id, luotXem: baiVietDangSua.luotXem }
						: item,
				),
			);
			message.success('Cập nhật bài viết thành công!');
		} else {
			setDsBaiViet((prev) => [...prev, { ...values, id: taoId('bv'), luotXem: 0 }]);
			message.success('Thêm bài viết mới thành công!');
		}
		setModalMo(false);
	};

	const dsBaiVietLoc = useMemo(() => {
		let ketQua = dsBaiViet;
		if (tuKhoa.trim()) {
			const kw = tuKhoa.trim().toLowerCase();
			ketQua = ketQua.filter((bv) => bv.tieuDe.toLowerCase().includes(kw));
		}
		if (locTrangThai) {
			ketQua = ketQua.filter((bv) => bv.trangThai === locTrangThai);
		}
		return ketQua;
	}, [dsBaiViet, tuKhoa, locTrangThai]);

	const columns: ColumnsType<IBaiViet> = [
		{
			title: 'STT',
			width: 60,
			align: 'center',
			render: (_t, _r, idx) => idx + 1,
		},
		{
			title: 'Tiêu đề',
			dataIndex: 'tieuDe',
			sorter: (a, b) => a.tieuDe.localeCompare(b.tieuDe),
			ellipsis: true,
		},
		{
			title: 'Trạng thái',
			dataIndex: 'trangThai',
			width: 120,
			align: 'center',
			render: (val: ETrangThai) => <Tag color={MAU_TRANG_THAI[val]}>{val}</Tag>,
		},
		{
			title: 'Thẻ',
			dataIndex: 'dsTheId',
			width: 200,
			render: (ids: string[]) => (
				<>
					{ids.map((theId, idx) => (
						<Tag key={theId} color={MAU_THE[idx % MAU_THE.length]} style={{ marginBottom: 2 }}>
							{layTenThe(theId, dsThe)}
						</Tag>
					))}
				</>
			),
		},
		{
			title: 'Lượt xem',
			dataIndex: 'luotXem',
			width: 100,
			align: 'center',
			sorter: (a, b) => a.luotXem - b.luotXem,
			render: (val: number) => <span><EyeOutlined style={{ marginRight: 4 }} />{val}</span>,
		},
		{
			title: 'Ngày tạo',
			dataIndex: 'ngayDang',
			width: 120,
			align: 'center',
			sorter: (a, b) => a.ngayDang.localeCompare(b.ngayDang),
		},
		{
			title: 'Thao tác',
			width: 100,
			align: 'center',
			render: (_t, record) => (
				<Space>
					<Button type='text' style={{ color: '#1890ff' }} icon={<EditOutlined />} onClick={() => moChinhSua(record)} />
					<Popconfirm
						title={`Xác nhận xóa bài viết "${record.tieuDe}"?`}
						onConfirm={() => xuLyXoa(record.id, record.tieuDe)}
						okText='Đồng ý xóa'
						cancelText='Hủy bỏ'
						okButtonProps={{ danger: true }}
						icon={<ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />}
					>
						<Button danger type='text' icon={<DeleteOutlined />} />
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<>
			<Card
				title='Quản Lý Bài Viết'
				extra={
					<Button type='primary' icon={<PlusOutlined />} onClick={moThemMoi}>
						Thêm Bài Viết
					</Button>
				}
			>
				<Space style={{ marginBottom: 16 }} size='middle'>
					<Input
						placeholder='Tìm kiếm theo tiêu đề...'
						prefix={<SearchOutlined />}
						value={tuKhoa}
						onChange={(e) => setTuKhoa(e.target.value)}
						allowClear
						style={{ width: 300 }}
					/>
					<Select
						placeholder='Lọc trạng thái'
						value={locTrangThai}
						onChange={(val) => setLocTrangThai(val)}
						allowClear
						style={{ width: 160 }}
						options={DS_TRANG_THAI}
					/>
				</Space>

				<Table<IBaiViet>
					dataSource={dsBaiVietLoc}
					columns={columns}
					rowKey='id'
					bordered
					size='middle'
					pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t) => `Tổng cộng: ${t} bài viết` }}
				/>
			</Card>

			<FormBaiViet
				hienThi={modalMo}
				baiVietDangSua={baiVietDangSua}
				dsThe={dsThe}
				dongModal={() => setModalMo(false)}
				luuBaiViet={xuLyLuu}
			/>
		</>
	);
};

export default QuanLyBaiViet;
