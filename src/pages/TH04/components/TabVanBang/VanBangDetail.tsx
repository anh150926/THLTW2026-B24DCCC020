import React from 'react';
import { Modal, Button, Descriptions, Space, Tag } from 'antd';
import moment from 'moment';
import { ThongTinVanBang, QuyetDinhTotNghiep, SoVanBang, TruongThongTin, KieuDuLieu } from '../../types';

interface Props {
	visible: boolean;
	onClose: () => void;
	detailItem: ThongTinVanBang | null;
	dsQuyetDinh: QuyetDinhTotNghiep[];
	dsSoVanBang: SoVanBang[];
	dsTruongThongTin: TruongThongTin[];
}

export const VanBangDetail: React.FC<Props> = ({
	visible,
	onClose,
	detailItem,
	dsQuyetDinh,
	dsSoVanBang,
	dsTruongThongTin,
}) => {
	if (!detailItem) return null;

	const qd = dsQuyetDinh.find((q) => q.id === detailItem.quyetDinhId);
	const so = qd ? dsSoVanBang.find((s) => s.id === qd.soVanBangId) : null;

	return (
		<Modal
			title='Chi Tiết Văn Bằng Sinh Viên'
			visible={visible}
			onCancel={onClose}
			footer={<Button type='primary' onClick={onClose}>Đóng Lại</Button>}
			width={700}
		>
			<Descriptions
				title={
					<Space>
						<Tag color='blue'>#{detailItem.soVaoSo}</Tag>
						<span style={{ fontSize: 16 }}>{detailItem.hoTen}</span>
					</Space>
				}
				bordered
				column={{ xs: 1, sm: 2 }}
				size='small'
				labelStyle={{ fontWeight: 'bold', width: '35%', backgroundColor: '#fafafa' }}
				contentStyle={{ backgroundColor: '#fff' }}
			>
				<Descriptions.Item label='Số vào sổ'>
					<strong>#{detailItem.soVaoSo}</strong>
				</Descriptions.Item>
				<Descriptions.Item label='Số hiệu VB'>{detailItem.soHieuVanBang}</Descriptions.Item>
				<Descriptions.Item label='Mã sinh viên'>{detailItem.maSinhVien}</Descriptions.Item>
				<Descriptions.Item label='Họ và tên'>{detailItem.hoTen}</Descriptions.Item>
				<Descriptions.Item label='Ngày sinh'>
					{detailItem.ngaySinh ? moment(detailItem.ngaySinh).format('DD/MM/YYYY') : '-'}
				</Descriptions.Item>
				<Descriptions.Item label='Quyết định'>
					{qd ? <Tag color='purple'>{qd.soQD}</Tag> : '-'}
				</Descriptions.Item>
				<Descriptions.Item label='Sổ Lưu Trữ' span={2}>
					{so ? `Năm ${so.nam} – ${so.moTa}` : '-'}
				</Descriptions.Item>

				{dsTruongThongTin.map((t) => (
					<Descriptions.Item key={t.id} label={t.tenTruong}>
						{t.kieuDuLieu === KieuDuLieu.DATE && detailItem.truongDongMap[t.id]
							? moment(detailItem.truongDongMap[t.id]).format('DD/MM/YYYY')
							: String(detailItem.truongDongMap[t.id] ?? '-')}
					</Descriptions.Item>
				))}
			</Descriptions>
		</Modal>
	);
};
