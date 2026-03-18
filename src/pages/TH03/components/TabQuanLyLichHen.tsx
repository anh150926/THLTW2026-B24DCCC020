import React, { useState, useEffect, useMemo } from 'react';
import { Card, Table, Button, Modal, Form, Input, Select, TimePicker, Popconfirm, Space, Tag, message, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { LichHen, DichVu, NhanVien, TrangThaiLich } from '../types';
import { TRANG_THAI_COLOR, LIST_TRANG_THAI } from '../constants';
import { tinhGioKetThuc, kiemTraHopLeLichHen } from '../utils/bookingLogic';
import MyDatePicker from '@/components/MyDatePicker';
import moment from 'moment';

const { Option } = Select;

interface Props {
	dsLichHen: LichHen[];
	setDsLichHen: (l: LichHen[]) => void;
	dsDichVu: DichVu[];
	dsNhanVien: NhanVien[];
}

export const TabQuanLyLichHen: React.FC<Props> = ({ dsLichHen, setDsLichHen, dsDichVu, dsNhanVien }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [dangSuaLich, setDangSuaLich] = useState<LichHen | null>(null);
	const [form] = Form.useForm();
	const [ngayDangChon, setNgayDangChon] = useState<string | null>(null);
	const [filterTen, setFilterTen] = useState('');

	useEffect(() => {
		if (modalVisible) {
			if (dangSuaLich) {
				form.setFieldsValue({ ...dangSuaLich, gioBatDau: moment(dangSuaLich.gioBatDau, 'HH:mm') });
				setNgayDangChon(dangSuaLich.ngayDat);
			} else {
				form.resetFields();
				setNgayDangChon(null);
			}
		}
	}, [modalVisible, dangSuaLich, form]);

	const xuLyLuuLichHen = (values: any) => {
		const dichVu = dsDichVu.find((d) => d.id === values.dichVuId);
		const nhanVien = dsNhanVien.find((n) => n.id === values.nhanVienId);
		if (!dichVu || !nhanVien) { message.error('Vui lòng chọn Dịch vụ và Nhân viên hợp lệ!'); return; }

		const gioBatDauStr = values.gioBatDau.format('HH:mm');
		const lichMoi: LichHen = {
			id: dangSuaLich ? dangSuaLich.id : Date.now().toString(),
			tenKhachHang: values.tenKhachHang, soDienThoai: values.soDienThoai,
			dichVuId: values.dichVuId, nhanVienId: values.nhanVienId,
			ngayDat: values.ngayDat, gioBatDau: gioBatDauStr,
			gioKetThuc: tinhGioKetThuc(gioBatDauStr, dichVu.thoiGianPhut),
			trangThai: values.trangThai || TrangThaiLich.CHO_DUYET,
		};

		const ketQua = kiemTraHopLeLichHen(lichMoi, nhanVien, dsLichHen);
		if (!ketQua.hopLe) { message.error(ketQua.thongBao); return; }

		setDsLichHen(dangSuaLich ? dsLichHen.map((l) => (l.id === lichMoi.id ? lichMoi : l)) : [lichMoi, ...dsLichHen]);
		message.success('Đã lưu lịch hẹn!');
		setModalVisible(false);
	};

	const dsNhanVienKhaDung = useMemo(() => {
		if (!ngayDangChon) return dsNhanVien;
		const thu = moment(ngayDangChon, 'YYYY-MM-DD').day();
		return dsNhanVien.filter((nv) => !nv.ngayLamViec || nv.ngayLamViec.length === 0 || nv.ngayLamViec.includes(thu));
	}, [dsNhanVien, ngayDangChon]);

	const dsLichHenHienThi = useMemo(() => {
		if (!filterTen) return dsLichHen;
		return dsLichHen.filter((l) => l.tenKhachHang.toLowerCase().includes(filterTen.toLowerCase()) || l.soDienThoai.includes(filterTen));
	}, [dsLichHen, filterTen]);

	const columns = [
		{ title: 'Khách hàng', render: (_: any, r: LichHen) => <>{r.tenKhachHang} <br/><small>{r.soDienThoai}</small></> },
		{ title: 'Ngày hẹn', dataIndex: 'ngayDat' },
		{ title: 'Thời gian', render: (_: any, r: LichHen) => `${r.gioBatDau} - ${r.gioKetThuc}` },
		{ title: 'Dịch vụ', render: (_: any, r: LichHen) => dsDichVu.find((d) => d.id === r.dichVuId)?.tenDichVu },
		{ title: 'Nhân viên', render: (_: any, r: LichHen) => dsNhanVien.find((n) => n.id === r.nhanVienId)?.tenNhanVien },
		{ title: 'Trạng thái', dataIndex: 'trangThai', render: (tt: TrangThaiLich) => <Tag color={TRANG_THAI_COLOR[tt]}>{tt}</Tag> },
		{
			title: 'Thao tác',
			render: (_: any, r: LichHen) => (
				<Space>
					<Button type='text' style={{ color: '#1890ff' }} icon={<EditOutlined />} onClick={() => { setDangSuaLich(r); setModalVisible(true); }} />
					<Popconfirm title='Xóa lịch?' onConfirm={() => setDsLichHen(dsLichHen.filter((l) => l.id !== r.id))}>
						<Button danger type='text' icon={<DeleteOutlined />} />
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<Card title='Danh Sách Lịch Hẹn' extra={
			<Space>
				<Input prefix={<SearchOutlined />} placeholder='Tìm tên / SĐT khách...' value={filterTen} onChange={(e) => setFilterTen(e.target.value)} allowClear />
				<Button type='primary' icon={<PlusOutlined />} onClick={() => { setDangSuaLich(null); setModalVisible(true); }}>Đặt Lịch</Button>
			</Space>
		}>
			<Table dataSource={dsLichHenHienThi} columns={columns} rowKey='id' size='small' pagination={{ pageSize: 10 }} />

			<Modal title={dangSuaLich ? 'Cập nhật Lịch Hẹn' : 'Đặt Lịch Mới'} visible={modalVisible} onCancel={() => setModalVisible(false)} onOk={form.submit} width={700}>
				<Form form={form} layout='vertical' onFinish={xuLyLuuLichHen} initialValues={{ trangThai: TrangThaiLich.CHO_DUYET }}>
					<Row gutter={16}>
						<Col span={12}><Form.Item name='tenKhachHang' label='Tên khách' rules={[{ required: true }]}><Input /></Form.Item></Col>
						<Col span={12}><Form.Item name='soDienThoai' label='SĐT' rules={[{ required: true }]}><Input /></Form.Item></Col>
					</Row>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item name='dichVuId' label='Dịch vụ' rules={[{ required: true }]}>
								<Select>{dsDichVu.map((d) => <Option key={d.id} value={d.id}>{d.tenDichVu}</Option>)}</Select>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name='ngayDat' label='Ngày đặt' rules={[{ required: true }]}>
								<MyDatePicker format='DD/MM/YYYY' saveFormat='YYYY-MM-DD' onChange={(val) => { setNgayDangChon(val); form.setFieldsValue({ nhanVienId: undefined }); }} disabledDate={(current) => (current ? current < moment().startOf('day') : false)} />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item name='nhanVienId' label='Nhân viên' rules={[{ required: true }]}>
								<Select placeholder={ngayDangChon ? 'Chọn NV làm việc trong ngày này' : 'Chọn ngày trước'}>
									{dsNhanVienKhaDung.map((n) => <Option key={n.id} value={n.id}>{n.tenNhanVien}</Option>)}
								</Select>
							</Form.Item>
						</Col>
						<Col span={12}><Form.Item name='gioBatDau' label='Giờ đặt' rules={[{ required: true }]}><TimePicker format='HH:mm' style={{ width: '100%' }} /></Form.Item></Col>
					</Row>
					{dangSuaLich && (
						<Form.Item name='trangThai' label='Trạng thái' rules={[{ required: true }]}>
							<Select>{LIST_TRANG_THAI.map((tt) => <Option key={tt} value={tt}>{tt}</Option>)}</Select>
						</Form.Item>
					)}
				</Form>
			</Modal>
		</Card>
	);
};
