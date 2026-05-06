import moment from 'moment';
import type { ITask } from '../types';
import { ETrangThaiTask } from '../types';

export function taoId(): string {
	return `task_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
}

export function laQuaHan(task: ITask): boolean {
	if (task.trangThai === ETrangThaiTask.HoanThanh) return false;
	return moment(task.deadline).isBefore(moment(), 'day');
}

export function demTongTask(dsTask: ITask[]): number {
	return dsTask.length;
}

export function demTaskHoanThanh(dsTask: ITask[]): number {
	return dsTask.filter((t) => t.trangThai === ETrangThaiTask.HoanThanh).length;
}

export function demTaskQuaHan(dsTask: ITask[]): number {
	return dsTask.filter((t) => laQuaHan(t)).length;
}

export function demTaskDangLam(dsTask: ITask[]): number {
	return dsTask.filter((t) => t.trangThai === ETrangThaiTask.DangLam).length;
}

export function demTaskCanLam(dsTask: ITask[]): number {
	return dsTask.filter((t) => t.trangThai === ETrangThaiTask.CanLam).length;
}

export function tinhPhanTramHoanThanh(dsTask: ITask[]): number {
	if (dsTask.length === 0) return 0;
	return Math.round((demTaskHoanThanh(dsTask) / dsTask.length) * 100);
}

export function layTaskTheoTrangThai(dsTask: ITask[], trangThai: ETrangThaiTask): ITask[] {
	return dsTask.filter((t) => t.trangThai === trangThai);
}

export function sapXepTheoDeadline(dsTask: ITask[], order: 'asc' | 'desc' = 'asc'): ITask[] {
	return [...dsTask].sort((a, b) => {
		const diff = moment(a.deadline).valueOf() - moment(b.deadline).valueOf();
		return order === 'asc' ? diff : -diff;
	});
}

export function demTaskTheoTag(dsTask: ITask[]): Record<string, number> {
	const result: Record<string, number> = {};
	dsTask.forEach((t) => {
		if (t.tag) {
			result[t.tag] = (result[t.tag] || 0) + 1;
		}
	});
	return result;
}

export function demTaskTheoMucDo(dsTask: ITask[]): Record<string, number> {
	const result: Record<string, number> = {};
	dsTask.forEach((t) => {
		result[t.mucDoUuTien] = (result[t.mucDoUuTien] || 0) + 1;
	});
	return result;
}
