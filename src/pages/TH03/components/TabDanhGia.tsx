import React, { useState, useMemo } from 'react';
import { Card, Table, Button, Modal, Form, Input, Rate, message, Tag, Row, Col, Space, Typography } from 'antd';
import { StarOutlined, MessageOutlined } from '@ant-design/icons';
import { LichHen, DanhGia, NhanVien, TrangThaiLich } from '../types';
import moment from 'moment';

interface Props {
	dsLichHen: LichHen[];
	dsDanhGia: DanhGia[];
	setDsDanhGia: (dg: DanhGia[]) => void;
	dsNhanVien: NhanVien[];
}

export const TabDanhGia: React.FC<Props> = ({ dsLichHen, dsDanhGia, setDsDanhGia, dsNhanVien }) => {
	const [modalDG, setModalDG] = useState(false);
	const [modalPH, setModalPH] = useState(false);
	const [lichChon, setLichChon] = useState<LichHen | null>(null);
	const [danhGiaChon, setDanhGiaChon] = useState<DanhGia | null>(null);
	const [form] = Form.useForm();
	const [formPhanHoi] = Form.useForm();

	const dsLichHoanThanh = dsLichHen.filter((l) => l.trangThai === TrangThaiLich.HOAN_THANH);

	const thongKeNhanVien = useMemo(() => {
		return dsNhanVien
			.map((nv) => {
				const ds = dsDanhGia.filter((dg) => dg.nhanVienId === nv.id);
				const tb = ds.length > 0 ? ds.reduce((sum, dg) => sum + dg.soSao, 0) / ds.length : 0;
				return { id: nv.id, tenNhanVien: nv.tenNhanVien, tong: ds.length, trungBinh: Math.round(tb * 10) / 10 };
			})
			.sort((a, b) => b.trungBinh - a.trungBinh);
	}, [dsNhanVien, dsDanhGia]);

	const luuDanhGia = (values: any) => {
		if (lichChon) {
			setDsDanhGia([
				{
					id: Date.now().toString(),
					lichHenId: lichChon.id,
					nhanVienId: lichChon.nhanVienId,
					ngayDanhGia: moment().format('YYYY-MM-DD HH:mm'),
					...values,
				},
				...dsDanhGia,
			]);
			message.success('Cảm ơn bạn đã đánh giá!');
			setModalDG(false);
		}
	};

	const luuPhanHoi = (values: any) => {
		if (danhGiaChon) {
			setDsDanhGia(
				dsDanhGia.map((dg) => (dg.id === danhGiaChon.id ? { ...dg, phanHoiNhanVien: values.phanHoiNhanVien } : dg)),
			);
			message.success('Đã gửi phản hồi!');
			setModalPH(false);
		}
	};

	const cotNhanVien = [
		{ title: 'Nhân viên', dataIndex: 'tenNhanVien', render: (t: string) => <b>{t}</b> },
		{
			title: 'Điểm trung bình (Sao)',
			dataIndex: 'trungBinh',
			render: (v: number) =>
				v > 0 ? (
					<Space>
						<Rate disabled allowHalf value={v} /> {v.toFixed(1)}
					</Space>
				) : (
					'Chưa có'
				),
		},
		{ title: 'Tổng lượt ĐG', dataIndex: 'tong', render: (v: number) => <Tag>{v} lượt</Tag> },
	];

	const columns = [
		{
			title: 'Khách hàng',
			render: (_: any, r: LichHen) => (
				<>
					{r.tenKhachHang} <br />
					<small>{r.ngayDat}</small>
				</>
			),
		},
		{ title: 'Nhân viên', render: (_: any, r: LichHen) => dsNhanVien.find((n) => n.id === r.nhanVienId)?.tenNhanVien },
		{
			title: 'Đánh giá chung',
			render: (_: any, r: LichHen) => {
				const dg = dsDanhGia.find((x) => x.lichHenId === r.id);
				if (!dg) return <Tag>Chưa đánh giá</Tag>;
				return (
					<div style={{ maxWidth: 250 }}>
						<Rate disabled value={dg.soSao} style={{ fontSize: 12 }} />
						<br />
						<Typography.Paragraph ellipsis={{ tooltip: true, rows: 2 }} style={{ marginBottom: 0 }}>
							{dg.nhanXet}
						</Typography.Paragraph>
					</div>
				);
			},
		},
		{
			title: 'Phản hồi NV',
			render: (_: any, r: LichHen) => {
				const dg = dsDanhGia.find((x) => x.lichHenId === r.id);
				return dg?.phanHoiNhanVien ? <span style={{ color: '#1890ff' }}>{dg.phanHoiNhanVien}</span> : '-';
			},
		},
		{
			title: 'Thao tác',
			render: (_: any, r: LichHen) => {
				const dg = dsDanhGia.find((x) => x.lichHenId === r.id);
				if (!dg)
					return (
						<Button
							size='small'
							type='primary'
							icon={<StarOutlined />}
							onClick={() => {
								setLichChon(r);
								form.resetFields();
								setModalDG(true);
							}}
						>
							Đánh giá
						</Button>
					);
				if (!dg.phanHoiNhanVien)
					return (
						<Button
							size='small'
							icon={<MessageOutlined />}
							onClick={() => {
								setDanhGiaChon(dg);
								formPhanHoi.resetFields();
								setModalPH(true);
							}}
						>
							Phản hồi
						</Button>
					);
				return null;
			},
		},
	];

	return (
		<Row gutter={[16, 16]}>
			<Col span={24}>
				<Card
					title={
						<Space>
							<StarOutlined style={{ color: '#faad14' }} /> Xếp hạng Nhân Viên
						</Space>
					}
				>
					<Table dataSource={thongKeNhanVien} columns={cotNhanVien} rowKey='id' pagination={false} size='small' />
				</Card>
			</Col>
			<Col span={24}>
				<Card title='Lịch Hẹn Thành Công — Chờ Đánh Giá'>
					<Table dataSource={dsLichHoanThanh} columns={columns} rowKey='id' size='small' pagination={{ pageSize: 5 }} />
				</Card>
			</Col>

			<Modal title='Khách hàng đánh giá' visible={modalDG} onCancel={() => setModalDG(false)} onOk={form.submit}>
				<Form form={form} layout='vertical' onFinish={luuDanhGia}>
					<Form.Item name='soSao' label='Số sao' rules={[{ required: true }]}>
						<Rate />
					</Form.Item>
					<Form.Item name='nhanXet' label='Nhận xét' rules={[{ required: true }]}>
						<Input.TextArea rows={3} />
					</Form.Item>
				</Form>
			</Modal>
			<Modal title='Nhân viên phản hồi' visible={modalPH} onCancel={() => setModalPH(false)} onOk={formPhanHoi.submit}>
				<Form form={formPhanHoi} layout='vertical' onFinish={luuPhanHoi}>
					<Form.Item name='phanHoiNhanVien' label='Nội dung phản hồi' rules={[{ required: true }]}>
						<Input.TextArea rows={3} />
					</Form.Item>
				</Form>
			</Modal>
		</Row>
	);
};
