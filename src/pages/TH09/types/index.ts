export enum ETrangThaiTask {
	CanLam = 'Cần làm',
	DangLam = 'Đang làm',
	HoanThanh = 'Hoàn thành',
}

export enum EMucDoUuTien {
	Cao = 'Cao',
	TrungBinh = 'Trung bình',
	Thap = 'Thấp',
}

export interface ITask {
	id: string;
	tenTask: string;
	moTa: string;
	deadline: string;
	mucDoUuTien: EMucDoUuTien;
	tag: string;
	trangThai: ETrangThaiTask;
	ngayTao: string;
}
