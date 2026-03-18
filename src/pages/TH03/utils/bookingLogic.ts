import { LichHen, NhanVien } from '../types';
import { NGAY_TRONG_TUAN } from '../constants';
import moment from 'moment';

export const tinhGioKetThuc = (gioBatDau: string, thoiGianPhut: number): string => {
	return moment(gioBatDau, 'HH:mm').add(thoiGianPhut, 'minutes').format('HH:mm');
};

export const kiemTraHopLeLichHen = (
	lichMoi: Partial<LichHen>,
	nhanVien: NhanVien,
	dsLichHen: LichHen[],
): { hopLe: boolean; thongBao: string } => {
	const ngayHienTai = moment().startOf('day');
	const ngayDatLich = moment(lichMoi.ngayDat, 'YYYY-MM-DD');

	if (ngayDatLich.isBefore(ngayHienTai)) {
		return { hopLe: false, thongBao: 'Không thể đặt lịch vào ngày trong quá khứ!' };
	}

	// Kiểm tra nhân viên có làm việc vào ngày trong tuần đó không
	if (nhanVien.ngayLamViec && nhanVien.ngayLamViec.length > 0) {
		const thuTrongTuan = ngayDatLich.day();
		if (!nhanVien.ngayLamViec.includes(thuTrongTuan)) {
			const tenNgay = NGAY_TRONG_TUAN.find((n) => n.value === thuTrongTuan)?.label || thuTrongTuan;
			const dsNgayLam = nhanVien.ngayLamViec.map((v) => NGAY_TRONG_TUAN.find((n) => n.value === v)?.label).join(', ');
			return {
				hopLe: false,
				thongBao: `Nhân viên không làm việc vào ${tenNgay}. Lịch làm việc: ${dsNgayLam}.`,
			};
		}
	}

	const batDauMoi = moment(lichMoi.gioBatDau, 'HH:mm');
	const ketThucMoi = moment(lichMoi.gioKetThuc, 'HH:mm');
	const caBatDauNV = moment(nhanVien.gioBatDau, 'HH:mm');
	const caKetThucNV = moment(nhanVien.gioKetThuc, 'HH:mm');

	if (batDauMoi.isBefore(caBatDauNV) || ketThucMoi.isAfter(caKetThucNV)) {
		return {
			hopLe: false,
			thongBao: `Giờ phục vụ (${batDauMoi.format('HH:mm')}-${ketThucMoi.format(
				'HH:mm',
			)}) vượt quá ca làm việc của nhân viên (${nhanVien.gioBatDau}-${nhanVien.gioKetThuc}).`,
		};
	}

	const lichTrongNgay = dsLichHen.filter(
		(l) =>
			l.nhanVienId === lichMoi.nhanVienId &&
			l.ngayDat === lichMoi.ngayDat &&
			l.trangThai !== 'Hủy' &&
			l.id !== lichMoi.id,
	);

	if (lichTrongNgay.length >= nhanVien.gioiHanKhach) {
		return { hopLe: false, thongBao: 'Nhân viên này đã kín lịch nhận khách trong ngày!' };
	}

	for (const lichCu of lichTrongNgay) {
		const batDauCu = moment(lichCu.gioBatDau, 'HH:mm');
		const ketThucCu = moment(lichCu.gioKetThuc, 'HH:mm');

		if (batDauMoi.isBefore(ketThucCu) && ketThucMoi.isAfter(batDauCu)) {
			return {
				hopLe: false,
				thongBao: `Trùng lịch! Nhân viên đang bận phục vụ khách từ ${lichCu.gioBatDau} đến ${lichCu.gioKetThuc}.`,
			};
		}
	}

	return { hopLe: true, thongBao: 'Hợp lệ' };
};
