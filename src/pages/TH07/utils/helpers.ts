import { IBaiViet, IThe } from '../types';

export function taoId(prefix: string): string {
	return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
}

export function kiemTraTrungLapThe(tenThe: string, dsThe: IThe[], boQuaId?: string): boolean {
	const normalized = tenThe.trim().toLowerCase();
	return dsThe.some((t) => t.tenThe.toLowerCase() === normalized && t.id !== boQuaId);
}

export function demBaiVietTheoThe(theId: string, dsBaiViet: IBaiViet[]): number {
	return dsBaiViet.filter((bv) => bv.dsTheId.includes(theId)).length;
}

export function layTenThe(theId: string, dsThe: IThe[]): string {
	const the = dsThe.find((t) => t.id === theId);
	return the ? the.tenThe : theId;
}
