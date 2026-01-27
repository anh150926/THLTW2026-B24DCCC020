import React, { useState, useEffect } from 'react';
import { Card, Tabs, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

import Dashboard from './components/Dashboard';
import ProductTab from './components/ProductTab';
import OrderTab from './components/OrderTab';
import ProductModal from './components/ProductModal';
import OrderModal from './components/OrderModal';
import OrderDetailModal from './components/OrderDetailModal';

const duLieuSanPhamBanDau = [
	{ id: 1, tenSanPham: 'Laptop Dell XPS 13', danhMuc: 'Laptop', gia: 25000000, soLuong: 15 },
	{ id: 2, tenSanPham: 'iPhone 15 Pro Max', danhMuc: 'Điện thoại', gia: 30000000, soLuong: 8 },
	{ id: 3, tenSanPham: 'Samsung Galaxy S24', danhMuc: 'Điện thoại', gia: 22000000, soLuong: 20 },
	{ id: 4, tenSanPham: 'iPad Air M2', danhMuc: 'Máy tính bảng', gia: 18000000, soLuong: 5 },
	{ id: 5, tenSanPham: 'MacBook Air M3', danhMuc: 'Laptop', gia: 28000000, soLuong: 12 },
];

const duLieuDonHangBanDau = [
	{
		id: 'DH001',
		tenKhachHang: 'Nguyễn Văn A',
		sdt: '0912345678',
		diaChi: 'TP.HCM',
		sanPham: [{ idSanPham: 1, tenSanPham: 'Laptop Dell XPS 13', soLuong: 1, gia: 25000000 }],
		tongTien: 25000000,
		trangThai: 'Chờ xử lý',
		ngayTao: '2024-01-15',
	},
];

const QuanLyDonHang = () => {
	const [dsSanPham, setDsSanPham] = useState(duLieuSanPhamBanDau);
	const [dsDonHang, setDsDonHang] = useState(duLieuDonHangBanDau);

	useEffect(() => {
		const spLuuTru = localStorage.getItem('dsSanPham');
		const dhLuuTru = localStorage.getItem('dsDonHang');
		if (spLuuTru) setDsSanPham(JSON.parse(spLuuTru));
		if (dhLuuTru) setDsDonHang(JSON.parse(dhLuuTru));
	}, []);

	const luuSanPham = (data: any[]) => {
		setDsSanPham([...data]);
		localStorage.setItem('dsSanPham', JSON.stringify(data));
	};
	const luuDonHang = (data: any[]) => {
		setDsDonHang([...data]);
		localStorage.setItem('dsDonHang', JSON.stringify(data));
	};

	const [hienModalSP, setHienModalSP] = useState(false);
	const [sanPhamSua, setSanPhamSua] = useState<any>(null);

	const [hienModalDon, setHienModalDon] = useState(false);
	const [donHangSua, setDonHangSua] = useState<any>(null);
	const [donHangXem, setDonHangXem] = useState<any>(null);

	const xuLyThemSP = (values: any) => {
		const idMoi = dsSanPham.length ? Math.max(...dsSanPham.map((p) => p.id)) + 1 : 1;
		luuSanPham([{ ...values, id: idMoi }, ...dsSanPham]);
		setHienModalSP(false);
		message.success('Thêm sản phẩm thành công');
	};

	const xuLySuaSP = (values: any) => {
		luuSanPham(dsSanPham.map((p) => (p.id === sanPhamSua.id ? { ...p, ...values } : p)));
		setHienModalSP(false);
		setSanPhamSua(null);
		message.success('Cập nhật thành công');
	};

	const xuLyXoaSP = (id: number) => {
		luuSanPham(dsSanPham.filter((p) => p.id !== id));
		message.success('Đã xóa sản phẩm');
	};

	const xuLyTaoDon = (values: any) => {
		const donMoi = {
			...values,
			id: `DH${Date.now()}`,
			trangThai: 'Chờ xử lý',
			ngayTao: new Date().toISOString().split('T')[0],
		};
		luuDonHang([donMoi, ...dsDonHang]);
		setHienModalDon(false);
		message.success('Tạo đơn hàng thành công');
	};

	const xuLySuaDon = (values: any) => {
		const danhSachMoi = dsDonHang.map((d) => (d.id === donHangSua.id ? { ...d, ...values } : d));
		luuDonHang(danhSachMoi);
		setHienModalDon(false);
		setDonHangSua(null);
		message.success('Cập nhật đơn hàng thành công');
	};

	const xuLyDoiTrangThai = (maDonHang: string, trangThaiMoi: string) => {
		const donHang = dsDonHang.find((d) => d.id === maDonHang);
		if (!donHang) return;

		const trangThaiCu = donHang.trangThai;

		if (trangThaiCu === trangThaiMoi) return;

		let coThayDoiKho = false;
		const danhSachSanPhamMoi = dsSanPham.map((sp) => {
			const itemTrongDon = donHang.sanPham.find((i: any) => i.idSanPham === sp.id);

			if (itemTrongDon) {
				if (trangThaiMoi === 'Hoàn thành' && trangThaiCu !== 'Hoàn thành') {
					coThayDoiKho = true;
					return { ...sp, soLuong: Math.max(0, sp.soLuong - itemTrongDon.soLuong) };
				} else if (trangThaiCu === 'Hoàn thành' && trangThaiMoi !== 'Hoàn thành') {
					coThayDoiKho = true;
					return { ...sp, soLuong: sp.soLuong + itemTrongDon.soLuong };
				}
			}
			return sp;
		});

		if (coThayDoiKho) {
			luuSanPham(danhSachSanPhamMoi);
			if (trangThaiMoi === 'Hoàn thành') message.success('Đã trừ tồn kho sản phẩm');
			if (trangThaiMoi === 'Đã hủy') message.info('Đã hoàn trả số lượng về kho');
		}

		luuDonHang(dsDonHang.map((d) => (d.id === maDonHang ? { ...d, trangThai: trangThaiMoi } : d)));
	};

	return (
		<PageContainer title='Quản lý Bán hàng'>
			<Dashboard danhSachSanPham={dsSanPham} danhSachDonHang={dsDonHang} />

			<Card bordered={false}>
				<Tabs defaultActiveKey='1'>
					<Tabs.TabPane tab='Quản lý Sản phẩm' key='1'>
						<ProductTab
							danhSachSanPham={dsSanPham}
							onThemMoi={() => {
								setSanPhamSua(null);
								setHienModalSP(true);
							}}
							onChinhSua={(sp: any) => {
								setSanPhamSua(sp);
								setHienModalSP(true);
							}}
							onXoa={xuLyXoaSP}
						/>
					</Tabs.TabPane>
					<Tabs.TabPane tab='Quản lý Đơn hàng' key='2'>
						<OrderTab
							danhSachDonHang={dsDonHang}
							onTaoDon={() => {
								setDonHangSua(null);
								setHienModalDon(true);
							}}
							onDoiTrangThai={xuLyDoiTrangThai}
							onXemChiTiet={setDonHangXem}
							onChinhSua={(dh: any) => {
								setDonHangSua(dh);
								setHienModalDon(true);
							}}
						/>
					</Tabs.TabPane>
				</Tabs>
			</Card>

			<ProductModal
				visible={hienModalSP}
				onCancel={() => setHienModalSP(false)}
				onSubmit={sanPhamSua ? xuLySuaSP : xuLyThemSP}
				duLieuSua={sanPhamSua}
			/>
			<OrderModal
				visible={hienModalDon}
				onCancel={() => {
					setHienModalDon(false);
					setDonHangSua(null);
				}}
				onSubmit={donHangSua ? xuLySuaDon : xuLyTaoDon}
				danhSachSanPham={dsSanPham}
				duLieuSua={donHangSua}
			/>
			<OrderDetailModal visible={!!donHangXem} onCancel={() => setDonHangXem(null)} donHang={donHangXem} />
		</PageContainer>
	);
};

export default QuanLyDonHang;
