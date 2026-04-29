import {
	ELoaiBaiTap,
	ETrangThaiBuoiTap,
	ENhomCo,
	EMucDoKho,
	ETrangThaiMucTieu,
	ELoaiMucTieu,
} from '../types';
import type { IBuoiTap, IChiSoSucKhoe, IMucTieu, IBaiTap } from '../types';

/* ========== Select Options ========== */
export const DS_LOAI_BAI_TAP = [
	{ label: 'Cardio', value: ELoaiBaiTap.Cardio },
	{ label: 'Strength', value: ELoaiBaiTap.Strength },
	{ label: 'Yoga', value: ELoaiBaiTap.Yoga },
	{ label: 'HIIT', value: ELoaiBaiTap.HIIT },
	{ label: 'Other', value: ELoaiBaiTap.Other },
];

export const DS_TRANG_THAI_BUOI_TAP = [
	{ label: 'Hoàn thành', value: ETrangThaiBuoiTap.HoanThanh },
	{ label: 'Bỏ lỡ', value: ETrangThaiBuoiTap.BoLo },
];

export const DS_NHOM_CO = [
	{ label: 'Chest', value: ENhomCo.Chest },
	{ label: 'Back', value: ENhomCo.Back },
	{ label: 'Legs', value: ENhomCo.Legs },
	{ label: 'Shoulders', value: ENhomCo.Shoulders },
	{ label: 'Arms', value: ENhomCo.Arms },
	{ label: 'Core', value: ENhomCo.Core },
	{ label: 'Full Body', value: ENhomCo.FullBody },
];

export const DS_MUC_DO_KHO = [
	{ label: 'Dễ', value: EMucDoKho.De },
	{ label: 'Trung bình', value: EMucDoKho.TrungBinh },
	{ label: 'Khó', value: EMucDoKho.Kho },
];

export const DS_LOAI_MUC_TIEU = [
	{ label: 'Giảm cân', value: ELoaiMucTieu.GiamCan },
	{ label: 'Tăng cơ', value: ELoaiMucTieu.TangCo },
	{ label: 'Cải thiện sức bền', value: ELoaiMucTieu.CaiThienSucBen },
	{ label: 'Khác', value: ELoaiMucTieu.Khac },
];

/* ========== Color Mappings ========== */
export const MAU_MUC_DO_KHO: Record<EMucDoKho, string> = {
	[EMucDoKho.De]: 'green',
	[EMucDoKho.TrungBinh]: 'orange',
	[EMucDoKho.Kho]: 'red',
};

export const MAU_LOAI_BAI_TAP: Record<ELoaiBaiTap, string> = {
	[ELoaiBaiTap.Cardio]: 'blue',
	[ELoaiBaiTap.Strength]: 'volcano',
	[ELoaiBaiTap.Yoga]: 'green',
	[ELoaiBaiTap.HIIT]: 'orange',
	[ELoaiBaiTap.Other]: 'default',
};

export const MAU_TRANG_THAI_MUC_TIEU: Record<ETrangThaiMucTieu, string> = {
	[ETrangThaiMucTieu.DangThucHien]: 'processing',
	[ETrangThaiMucTieu.DaDat]: 'success',
	[ETrangThaiMucTieu.DaHuy]: 'default',
};

/* ========== Dữ liệu ban đầu ========== */
export const DU_LIEU_BUOI_TAP: IBuoiTap[] = [
	{ id: 'bt_001', ngay: '2026-04-02', loaiBaiTap: ELoaiBaiTap.Cardio, thoiLuong: 45, caloDot: 400, ghiChu: 'Chạy bộ buổi sáng', trangThai: ETrangThaiBuoiTap.HoanThanh },
	{ id: 'bt_002', ngay: '2026-04-04', loaiBaiTap: ELoaiBaiTap.Strength, thoiLuong: 60, caloDot: 350, ghiChu: 'Tập ngực + vai', trangThai: ETrangThaiBuoiTap.HoanThanh },
	{ id: 'bt_003', ngay: '2026-04-05', loaiBaiTap: ELoaiBaiTap.Yoga, thoiLuong: 30, caloDot: 150, ghiChu: 'Yoga buổi tối', trangThai: ETrangThaiBuoiTap.HoanThanh },
	{ id: 'bt_004', ngay: '2026-04-07', loaiBaiTap: ELoaiBaiTap.HIIT, thoiLuong: 25, caloDot: 320, ghiChu: 'HIIT toàn thân', trangThai: ETrangThaiBuoiTap.HoanThanh },
	{ id: 'bt_005', ngay: '2026-04-08', loaiBaiTap: ELoaiBaiTap.Cardio, thoiLuong: 50, caloDot: 450, ghiChu: 'Đạp xe công viên', trangThai: ETrangThaiBuoiTap.HoanThanh },
	{ id: 'bt_006', ngay: '2026-04-10', loaiBaiTap: ELoaiBaiTap.Strength, thoiLuong: 55, caloDot: 380, ghiChu: 'Tập lưng + tay', trangThai: ETrangThaiBuoiTap.HoanThanh },
	{ id: 'bt_007', ngay: '2026-04-11', loaiBaiTap: ELoaiBaiTap.Cardio, thoiLuong: 40, caloDot: 350, ghiChu: '', trangThai: ETrangThaiBuoiTap.BoLo },
	{ id: 'bt_008', ngay: '2026-04-14', loaiBaiTap: ELoaiBaiTap.HIIT, thoiLuong: 30, caloDot: 380, ghiChu: 'Tabata 30 phút', trangThai: ETrangThaiBuoiTap.HoanThanh },
	{ id: 'bt_009', ngay: '2026-04-16', loaiBaiTap: ELoaiBaiTap.Strength, thoiLuong: 65, caloDot: 420, ghiChu: 'Tập chân', trangThai: ETrangThaiBuoiTap.HoanThanh },
	{ id: 'bt_010', ngay: '2026-04-18', loaiBaiTap: ELoaiBaiTap.Yoga, thoiLuong: 45, caloDot: 200, ghiChu: 'Yoga phục hồi', trangThai: ETrangThaiBuoiTap.HoanThanh },
	{ id: 'bt_011', ngay: '2026-04-20', loaiBaiTap: ELoaiBaiTap.Cardio, thoiLuong: 60, caloDot: 550, ghiChu: 'Chạy bộ 8km', trangThai: ETrangThaiBuoiTap.HoanThanh },
	{ id: 'bt_012', ngay: '2026-04-22', loaiBaiTap: ELoaiBaiTap.Strength, thoiLuong: 50, caloDot: 340, ghiChu: 'Push-Pull', trangThai: ETrangThaiBuoiTap.HoanThanh },
	{ id: 'bt_013', ngay: '2026-04-24', loaiBaiTap: ELoaiBaiTap.HIIT, thoiLuong: 20, caloDot: 280, ghiChu: 'HIIT nhanh', trangThai: ETrangThaiBuoiTap.HoanThanh },
	{ id: 'bt_014', ngay: '2026-04-26', loaiBaiTap: ELoaiBaiTap.Cardio, thoiLuong: 35, caloDot: 300, ghiChu: 'Nhảy dây', trangThai: ETrangThaiBuoiTap.HoanThanh },
	{ id: 'bt_015', ngay: '2026-04-27', loaiBaiTap: ELoaiBaiTap.Strength, thoiLuong: 70, caloDot: 460, ghiChu: 'Full body', trangThai: ETrangThaiBuoiTap.HoanThanh },
	{ id: 'bt_016', ngay: '2026-04-28', loaiBaiTap: ELoaiBaiTap.Yoga, thoiLuong: 40, caloDot: 180, ghiChu: 'Yoga sáng', trangThai: ETrangThaiBuoiTap.HoanThanh },
];

export const DU_LIEU_CHI_SO: IChiSoSucKhoe[] = [
	{ id: 'cs_001', ngay: '2026-03-01', canNang: 78, chieuCao: 172, nhipTim: 75, gioNgu: 7 },
	{ id: 'cs_002', ngay: '2026-03-08', canNang: 77.5, chieuCao: 172, nhipTim: 73, gioNgu: 6.5 },
	{ id: 'cs_003', ngay: '2026-03-15', canNang: 77, chieuCao: 172, nhipTim: 72, gioNgu: 7.5 },
	{ id: 'cs_004', ngay: '2026-03-22', canNang: 76.2, chieuCao: 172, nhipTim: 70, gioNgu: 7 },
	{ id: 'cs_005', ngay: '2026-03-29', canNang: 75.8, chieuCao: 172, nhipTim: 71, gioNgu: 8 },
	{ id: 'cs_006', ngay: '2026-04-05', canNang: 75.3, chieuCao: 172, nhipTim: 69, gioNgu: 7 },
	{ id: 'cs_007', ngay: '2026-04-12', canNang: 74.8, chieuCao: 172, nhipTim: 68, gioNgu: 7.5 },
	{ id: 'cs_008', ngay: '2026-04-19', canNang: 74.2, chieuCao: 172, nhipTim: 67, gioNgu: 7 },
	{ id: 'cs_009', ngay: '2026-04-26', canNang: 73.5, chieuCao: 172, nhipTim: 66, gioNgu: 8 },
];

export const DU_LIEU_MUC_TIEU: IMucTieu[] = [
	{ id: 'mt_001', tenMucTieu: 'Giảm cân về 70kg', loai: ELoaiMucTieu.GiamCan, giaTriMucTieu: 8, giaTriHienTai: 4.5, donVi: 'kg giảm', deadline: '2026-06-30', trangThai: ETrangThaiMucTieu.DangThucHien },
	{ id: 'mt_002', tenMucTieu: 'Chạy 10km liên tục', loai: ELoaiMucTieu.CaiThienSucBen, giaTriMucTieu: 10, giaTriHienTai: 8, donVi: 'km', deadline: '2026-05-15', trangThai: ETrangThaiMucTieu.DangThucHien },
	{ id: 'mt_003', tenMucTieu: 'Bench Press 80kg', loai: ELoaiMucTieu.TangCo, giaTriMucTieu: 80, giaTriHienTai: 80, donVi: 'kg', deadline: '2026-04-20', trangThai: ETrangThaiMucTieu.DaDat },
	{ id: 'mt_004', tenMucTieu: 'Tập 20 buổi/tháng', loai: ELoaiMucTieu.Khac, giaTriMucTieu: 20, giaTriHienTai: 15, donVi: 'buổi', deadline: '2026-04-30', trangThai: ETrangThaiMucTieu.DangThucHien },
];

export const DU_LIEU_BAI_TAP: IBaiTap[] = [
	{ id: 'lib_001', tenBaiTap: 'Push-up', nhomCo: ENhomCo.Chest, mucDoKho: EMucDoKho.De, moTaNgan: 'Bài tập cơ bản cho ngực và tay sau', huongDan: '1. Nằm sấp, hai tay rộng bằng vai.\n2. Hạ người xuống cho đến khi ngực gần chạm sàn.\n3. Đẩy người lên về vị trí ban đầu.\n4. Giữ cơ thể thẳng suốt quá trình.\n5. Thực hiện 3 hiệp x 12-15 lần.', caloDotTrungBinh: 400 },
	{ id: 'lib_002', tenBaiTap: 'Squat', nhomCo: ENhomCo.Legs, mucDoKho: EMucDoKho.De, moTaNgan: 'Bài tập cơ bản cho chân và mông', huongDan: '1. Đứng thẳng, hai chân rộng bằng vai.\n2. Hạ hông xuống như ngồi ghế.\n3. Đùi song song với sàn.\n4. Đẩy người đứng lên.\n5. Thực hiện 3 hiệp x 15 lần.', caloDotTrungBinh: 350 },
	{ id: 'lib_003', tenBaiTap: 'Deadlift', nhomCo: ENhomCo.Back, mucDoKho: EMucDoKho.Kho, moTaNgan: 'Bài tập nặng cho lưng dưới và toàn thân', huongDan: '1. Đứng trước tạ, chân rộng bằng hông.\n2. Gập người nắm tạ, lưng thẳng.\n3. Đẩy hông về phía trước, nâng tạ lên.\n4. Giữ tạ sát người.\n5. Hạ tạ xuống có kiểm soát.\n6. Thực hiện 4 hiệp x 6-8 lần.', caloDotTrungBinh: 500 },
	{ id: 'lib_004', tenBaiTap: 'Plank', nhomCo: ENhomCo.Core, mucDoKho: EMucDoKho.De, moTaNgan: 'Giữ cơ thể thẳng để tăng cường core', huongDan: '1. Chống khuỷu tay xuống sàn.\n2. Duỗi thẳng chân, nhón chân.\n3. Giữ cơ thể thẳng như tấm ván.\n4. Siết cơ bụng.\n5. Giữ 30-60 giây x 3 hiệp.', caloDotTrungBinh: 250 },
	{ id: 'lib_005', tenBaiTap: 'Bench Press', nhomCo: ENhomCo.Chest, mucDoKho: EMucDoKho.TrungBinh, moTaNgan: 'Đẩy tạ trên ghế phẳng cho ngực', huongDan: '1. Nằm trên ghế phẳng.\n2. Nắm tạ rộng hơn vai.\n3. Hạ tạ xuống ngực.\n4. Đẩy tạ lên thẳng tay.\n5. Thực hiện 4 hiệp x 8-10 lần.', caloDotTrungBinh: 450 },
	{ id: 'lib_006', tenBaiTap: 'Pull-up', nhomCo: ENhomCo.Back, mucDoKho: EMucDoKho.Kho, moTaNgan: 'Kéo xà đơn cho lưng và tay trước', huongDan: '1. Nắm xà rộng hơn vai.\n2. Kéo người lên cho cằm qua xà.\n3. Hạ người xuống có kiểm soát.\n4. Không đu đưa.\n5. Thực hiện 3 hiệp x tối đa.', caloDotTrungBinh: 480 },
	{ id: 'lib_007', tenBaiTap: 'Shoulder Press', nhomCo: ENhomCo.Shoulders, mucDoKho: EMucDoKho.TrungBinh, moTaNgan: 'Đẩy tạ qua đầu cho vai', huongDan: '1. Ngồi hoặc đứng, tạ ngang vai.\n2. Đẩy tạ lên thẳng qua đầu.\n3. Hạ tạ về ngang vai.\n4. Giữ core siết.\n5. Thực hiện 3 hiệp x 10 lần.', caloDotTrungBinh: 380 },
	{ id: 'lib_008', tenBaiTap: 'Bicep Curl', nhomCo: ENhomCo.Arms, mucDoKho: EMucDoKho.De, moTaNgan: 'Cuốn tạ cho bắp tay trước', huongDan: '1. Đứng thẳng, tạ hai bên.\n2. Cuốn tạ lên bằng cách gập khuỷu.\n3. Siết cơ ở đỉnh.\n4. Hạ tạ xuống từ từ.\n5. Thực hiện 3 hiệp x 12 lần.', caloDotTrungBinh: 280 },
	{ id: 'lib_009', tenBaiTap: 'Burpee', nhomCo: ENhomCo.FullBody, mucDoKho: EMucDoKho.Kho, moTaNgan: 'Bài tập cardio cường độ cao toàn thân', huongDan: '1. Đứng thẳng.\n2. Hạ xuống tư thế squat, tay chạm sàn.\n3. Nhảy chân ra sau thành plank.\n4. Hít đất 1 cái.\n5. Nhảy chân về, đứng lên và nhảy.\n6. Thực hiện 3 hiệp x 10 lần.', caloDotTrungBinh: 600 },
	{ id: 'lib_010', tenBaiTap: 'Lunges', nhomCo: ENhomCo.Legs, mucDoKho: EMucDoKho.TrungBinh, moTaNgan: 'Bước chân cho đùi trước và mông', huongDan: '1. Đứng thẳng, hai tay ngang hông.\n2. Bước chân trái lên phía trước.\n3. Hạ gối phải gần chạm sàn.\n4. Đẩy người đứng lên.\n5. Đổi chân.\n6. Thực hiện 3 hiệp x 12 lần mỗi chân.', caloDotTrungBinh: 350 },
	{ id: 'lib_011', tenBaiTap: 'Mountain Climber', nhomCo: ENhomCo.Core, mucDoKho: EMucDoKho.TrungBinh, moTaNgan: 'Leo núi tại chỗ cho core và cardio', huongDan: '1. Bắt đầu từ tư thế plank cao.\n2. Kéo gối phải về ngực.\n3. Nhanh chóng đổi chân.\n4. Duy trì nhịp nhanh.\n5. Thực hiện 3 hiệp x 30 giây.', caloDotTrungBinh: 550 },
	{ id: 'lib_012', tenBaiTap: 'Lat Pulldown', nhomCo: ENhomCo.Back, mucDoKho: EMucDoKho.TrungBinh, moTaNgan: 'Kéo cáp cho lưng trên (xô)', huongDan: '1. Ngồi tại máy kéo cáp.\n2. Nắm thanh rộng hơn vai.\n3. Kéo thanh xuống ngực.\n4. Siết lưng ở đáy.\n5. Thả từ từ lên.\n6. Thực hiện 3 hiệp x 12 lần.', caloDotTrungBinh: 400 },
];
