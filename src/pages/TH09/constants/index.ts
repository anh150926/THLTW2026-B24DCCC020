import { ETrangThaiTask, EMucDoUuTien } from '../types';
import type { ITask } from '../types';

/* ========== Select Options ========== */
export const DS_TRANG_THAI = [
	{ label: 'Cần làm', value: ETrangThaiTask.CanLam },
	{ label: 'Đang làm', value: ETrangThaiTask.DangLam },
	{ label: 'Hoàn thành', value: ETrangThaiTask.HoanThanh },
];

export const DS_MUC_DO_UU_TIEN = [
	{ label: 'Cao', value: EMucDoUuTien.Cao },
	{ label: 'Trung bình', value: EMucDoUuTien.TrungBinh },
	{ label: 'Thấp', value: EMucDoUuTien.Thap },
];

export const DS_TAG = [
	'Frontend',
	'Backend',
	'Design',
	'Bug',
	'Feature',
	'Research',
	'Meeting',
	'Review',
	'Testing',
	'Deploy',
];

/* ========== Color Mappings ========== */
export const MAU_TRANG_THAI: Record<ETrangThaiTask, string> = {
	[ETrangThaiTask.CanLam]: 'default',
	[ETrangThaiTask.DangLam]: 'processing',
	[ETrangThaiTask.HoanThanh]: 'success',
};

export const MAU_MUC_DO: Record<EMucDoUuTien, string> = {
	[EMucDoUuTien.Cao]: 'red',
	[EMucDoUuTien.TrungBinh]: 'orange',
	[EMucDoUuTien.Thap]: 'green',
};

export const MAU_TAG: Record<string, string> = {
	Frontend: 'blue',
	Backend: 'purple',
	Design: 'magenta',
	Bug: 'red',
	Feature: 'cyan',
	Research: 'geekblue',
	Meeting: 'gold',
	Review: 'lime',
	Testing: 'volcano',
	Deploy: 'green',
};

/* ========== Kanban Column Config ========== */
export const KANBAN_COLUMNS = [
	{
		id: ETrangThaiTask.CanLam,
		title: '📋 Cần làm',
		color: '#d9d9d9',
		headerBg: '#fafafa',
	},
	{
		id: ETrangThaiTask.DangLam,
		title: '🔄 Đang làm',
		color: '#1890ff',
		headerBg: '#e6f7ff',
	},
	{
		id: ETrangThaiTask.HoanThanh,
		title: '✅ Hoàn thành',
		color: '#52c41a',
		headerBg: '#f6ffed',
	},
];

/* ========== Dữ liệu ban đầu ========== */
export const DU_LIEU_TASK: ITask[] = [
	{
		id: 'task_001',
		tenTask: 'Thiết kế giao diện trang chủ',
		moTa: 'Tạo wireframe và mockup cho trang chủ ứng dụng, bao gồm header, hero section, và footer.',
		deadline: '2026-05-10',
		mucDoUuTien: EMucDoUuTien.Cao,
		tag: 'Design',
		trangThai: ETrangThaiTask.DangLam,
		ngayTao: '2026-04-25',
	},
	{
		id: 'task_002',
		tenTask: 'Xây dựng API đăng nhập',
		moTa: 'Phát triển REST API cho chức năng authentication bằng JWT token.',
		deadline: '2026-05-08',
		mucDoUuTien: EMucDoUuTien.Cao,
		tag: 'Backend',
		trangThai: ETrangThaiTask.CanLam,
		ngayTao: '2026-04-26',
	},
	{
		id: 'task_003',
		tenTask: 'Viết unit test cho module user',
		moTa: 'Bao phủ test cho các hàm xử lý user: đăng ký, đăng nhập, cập nhật thông tin.',
		deadline: '2026-05-15',
		mucDoUuTien: EMucDoUuTien.TrungBinh,
		tag: 'Testing',
		trangThai: ETrangThaiTask.CanLam,
		ngayTao: '2026-04-27',
	},
	{
		id: 'task_004',
		tenTask: 'Fix bug hiển thị bảng dữ liệu',
		moTa: 'Bảng dữ liệu không hiển thị đúng trên mobile, cần responsive lại.',
		deadline: '2026-05-03',
		mucDoUuTien: EMucDoUuTien.Cao,
		tag: 'Bug',
		trangThai: ETrangThaiTask.HoanThanh,
		ngayTao: '2026-04-20',
	},
	{
		id: 'task_005',
		tenTask: 'Tích hợp thanh toán online',
		moTa: 'Tích hợp cổng thanh toán VNPay và MoMo cho hệ thống đặt hàng.',
		deadline: '2026-05-20',
		mucDoUuTien: EMucDoUuTien.TrungBinh,
		tag: 'Feature',
		trangThai: ETrangThaiTask.CanLam,
		ngayTao: '2026-04-28',
	},
	{
		id: 'task_006',
		tenTask: 'Code review Sprint 3',
		moTa: 'Review toàn bộ code của Sprint 3, kiểm tra coding convention và best practices.',
		deadline: '2026-05-07',
		mucDoUuTien: EMucDoUuTien.TrungBinh,
		tag: 'Review',
		trangThai: ETrangThaiTask.DangLam,
		ngayTao: '2026-04-29',
	},
	{
		id: 'task_007',
		tenTask: 'Họp khách hàng demo Sprint 2',
		moTa: 'Chuẩn bị slide và demo các tính năng đã hoàn thành trong Sprint 2.',
		deadline: '2026-05-02',
		mucDoUuTien: EMucDoUuTien.Cao,
		tag: 'Meeting',
		trangThai: ETrangThaiTask.HoanThanh,
		ngayTao: '2026-04-22',
	},
	{
		id: 'task_008',
		tenTask: 'Nghiên cứu WebSocket cho real-time',
		moTa: 'Tìm hiểu và POC tính năng real-time notification sử dụng WebSocket.',
		deadline: '2026-05-18',
		mucDoUuTien: EMucDoUuTien.Thap,
		tag: 'Research',
		trangThai: ETrangThaiTask.CanLam,
		ngayTao: '2026-04-30',
	},
	{
		id: 'task_009',
		tenTask: 'Triển khai lên staging',
		moTa: 'Deploy phiên bản mới nhất lên môi trường staging để QA test.',
		deadline: '2026-05-06',
		mucDoUuTien: EMucDoUuTien.Cao,
		tag: 'Deploy',
		trangThai: ETrangThaiTask.DangLam,
		ngayTao: '2026-05-01',
	},
	{
		id: 'task_010',
		tenTask: 'Xây dựng component Table dùng chung',
		moTa: 'Tạo component Table reusable với phân trang, search, filter tích hợp sẵn.',
		deadline: '2026-05-12',
		mucDoUuTien: EMucDoUuTien.TrungBinh,
		tag: 'Frontend',
		trangThai: ETrangThaiTask.CanLam,
		ngayTao: '2026-05-02',
	},
];
