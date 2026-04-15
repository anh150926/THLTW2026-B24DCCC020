import { Button, Space, Tag, Popconfirm, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { IPhongHoc, ELoaiPhong } from '../../types';
import { MAPPING_MAU_LOAI_PHONG, DS_LOAI_PHONG, DS_PHU_TRACH, NGƯỠNG_XOA_PHONG } from '../../constants';
import { coTheXoaPhong } from '../../utils/helpers';
import { taoPropTimKiem } from './SearchFilter';

interface ICauHinhCotParams {
	moChinhSua: (record: IPhongHoc) => void;
	xuLyXoa: (record: IPhongHoc) => void;
}

export function taoCauHinhCot({ moChinhSua, xuLyXoa }: ICauHinhCotParams): ColumnsType<IPhongHoc> {
	return [
		{
			title: 'STT',
			width: 60,
			align: 'center',
			render: (_text, _record, idx) => idx + 1,
		},
		{
			title: 'Mã phòng',
			dataIndex: 'maPhong',
			width: 120,
			sorter: (a, b) => a.maPhong.localeCompare(b.maPhong),
			...taoPropTimKiem('maPhong'),
		},
		{
			title: 'Tên phòng',
			dataIndex: 'tenPhong',
			sorter: (a, b) => a.tenPhong.localeCompare(b.tenPhong),
			...taoPropTimKiem('tenPhong'),
		},
		{
			title: 'Số chỗ ngồi',
			dataIndex: 'soChoNgoi',
			width: 130,
			align: 'center',
			sorter: (a, b) => a.soChoNgoi - b.soChoNgoi,
			render: (val: number) => (
				<Tag color={val >= NGƯỠNG_XOA_PHONG ? 'blue' : 'orange'}>{val}</Tag>
			),
		},
		{
			title: 'Loại phòng',
			dataIndex: 'loaiPhong',
			width: 140,
			align: 'center',
			filters: DS_LOAI_PHONG.map((item) => ({ text: item.label, value: item.value })),
			onFilter: (value, record) => record.loaiPhong === value,
			render: (val: ELoaiPhong) => <Tag color={MAPPING_MAU_LOAI_PHONG[val]}>{val}</Tag>,
		},
		{
			title: 'Người phụ trách',
			dataIndex: 'nguoiPhuTrach',
			width: 160,
			filters: DS_PHU_TRACH.map((ten) => ({ text: ten, value: ten })),
			onFilter: (value, record) => record.nguoiPhuTrach === value,
		},
		{
			title: 'Thao tác',
			width: 120,
			align: 'center',
			render: (_text, record) => {
				const duocXoa = coTheXoaPhong(record);
				return (
					<Space>
						<Tooltip title='Chỉnh sửa'>
							<Button
								type='text'
								style={{ color: '#1890ff' }}
								icon={<EditOutlined />}
								onClick={() => moChinhSua(record)}
							/>
						</Tooltip>

						{duocXoa ? (
							<Popconfirm
								title={`Xác nhận xóa phòng "${record.tenPhong}"?`}
								onConfirm={() => xuLyXoa(record)}
								okText='Đồng ý xóa'
								cancelText='Hủy bỏ'
								okButtonProps={{ danger: true }}
								icon={<ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />}
							>
								<Button danger type='text' icon={<DeleteOutlined />} />
							</Popconfirm>
						) : (
							<Tooltip title={`Không thể xóa (≥ ${NGƯỠNG_XOA_PHONG} chỗ)`}>
								<Button danger type='text' icon={<DeleteOutlined />} disabled />
							</Tooltip>
						)}
					</Space>
				);
			},
		},
	];
}
