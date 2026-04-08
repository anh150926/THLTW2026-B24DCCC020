import { CauLacBo, DonDangKy, TrangThaiDon } from '../types';
import * as XLSX from 'xlsx';

export const getCLBName = (id: string, dsCauLacBo: CauLacBo[]): string => {
	const clb = dsCauLacBo.find((c) => c.id === id);
	return clb ? clb.tenCLB : '—';
};

export const countDonByStatus = (
	cauLacBoId: string,
	trangThai: TrangThaiDon,
	dsDonDangKy: DonDangKy[],
): number => {
	return dsDonDangKy.filter((d) => d.cauLacBoId === cauLacBoId && d.trangThai === trangThai).length;
};

export const getApprovedMembers = (cauLacBoId: string, dsDonDangKy: DonDangKy[]): DonDangKy[] => {
	return dsDonDangKy.filter((d) => d.cauLacBoId === cauLacBoId && d.trangThai === TrangThaiDon.APPROVED);
};

export const exportToXLSX = (data: Record<string, any>[], fileName: string): void => {
	const ws = XLSX.utils.json_to_sheet(data);
	const wb = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, ws, 'DanhSach');
	XLSX.writeFile(wb, `${fileName}.xlsx`);
};

export const formatDateTime = (isoString: string): string => {
	const d = new Date(isoString);
	const pad = (n: number) => n.toString().padStart(2, '0');
	return `${pad(d.getHours())}:${pad(d.getMinutes())} ${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};
