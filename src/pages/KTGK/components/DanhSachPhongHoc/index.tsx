import React, { useMemo } from 'react';
import { Card, Table, Button, Empty, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import { IPhongHoc } from '../../types';
import { NGƯỠNG_XOA_PHONG } from '../../constants';
import { kiemTraTrungLap, coTheXoaPhong, taoIdPhongHoc } from '../../utils/helpers';
import { taoCauHinhCot } from './columns';
import FormPhongHoc from '../FormPhongHoc';

const DanhSachPhongHoc: React.FC = () => {
	const {
		danhSach,
		modalMo,
		setModalMo,
		phongDangSua,
		setPhongDangSua,
		themPhong,
		suaPhong,
		xoaPhong,
	} = useModel('ktgk');

	const moThemMoi = () => {
		setPhongDangSua(null);
		setModalMo(true);
	};

	const moChinhSua = (record: IPhongHoc) => {
		setPhongDangSua(record);
		setModalMo(true);
	};

	const xuLyXoa = (record: IPhongHoc) => {
		if (!coTheXoaPhong(record)) {
			message.error(
				`Không thể xóa phòng "${record.tenPhong}" vì có ${record.soChoNgoi} chỗ ngồi (≥ ${NGƯỠNG_XOA_PHONG}).`,
			);
			return;
		}
		xoaPhong(record.id);
		message.success(`Đã xóa phòng "${record.tenPhong}".`);
	};

	const xuLyLuu = (values: Omit<IPhongHoc, 'id'>) => {
		if (kiemTraTrungLap(values.maPhong, danhSach, 'maPhong', phongDangSua?.id)) {
			message.error('Mã phòng này đã tồn tại trong hệ thống!');
			return;
		}
		if (kiemTraTrungLap(values.tenPhong, danhSach, 'tenPhong', phongDangSua?.id)) {
			message.error('Tên phòng này đã tồn tại trong hệ thống!');
			return;
		}

		if (phongDangSua) {
			suaPhong({ ...values, id: phongDangSua.id });
			message.success('Cập nhật phòng học thành công!');
		} else {
			themPhong({ ...values, id: taoIdPhongHoc() });
			message.success('Thêm phòng học mới thành công!');
		}
		setModalMo(false);
	};

	const cauHinhCot = useMemo(
		() => taoCauHinhCot({ moChinhSua, xuLyXoa }),
		[danhSach],
	);

	return (
		<>
			<Card
				title='Danh Sách Phòng Học'
				extra={
					<Button type='primary' icon={<PlusOutlined />} onClick={moThemMoi}>
						Thêm Phòng
					</Button>
				}
			>
				{danhSach.length === 0 ? (
					<Empty description='Chưa có dữ liệu phòng học'>
						<Button type='primary' onClick={moThemMoi}>
							Tạo phòng đầu tiên
						</Button>
					</Empty>
				) : (
					<Table<IPhongHoc>
						dataSource={danhSach}
						columns={cauHinhCot}
						rowKey='id'
						bordered
						size='middle'
						pagination={{
							pageSize: 10,
							showSizeChanger: true,
							showTotal: (total) => `Tổng cộng: ${total} phòng học`,
						}}
					/>
				)}
			</Card>

			<FormPhongHoc
				hienThi={modalMo}
				phongDangSua={phongDangSua}
				dongModal={() => setModalMo(false)}
				luuPhong={xuLyLuu}
			/>
		</>
	);
};

export default DanhSachPhongHoc;
