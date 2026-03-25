import React, { useState } from 'react';
import { Card, Form, Input, InputNumber, Button, Space, Alert, Descriptions, Tag, Divider, message, Row, Col, Empty } from 'antd';
import { SearchOutlined, FileSearchOutlined, ReloadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { ThongTinVanBang, QuyetDinhTotNghiep, SoVanBang, TruongThongTin, KieuDuLieu } from '../types';
import MyDatePicker from '@/components/MyDatePicker';

interface Props {
	dsVanBang: ThongTinVanBang[];
	dsQuyetDinh: QuyetDinhTotNghiep[];
	setDsQuyetDinh: (q: QuyetDinhTotNghiep[]) => void;
	dsSoVanBang: SoVanBang[];
	dsTruongThongTin: TruongThongTin[];
}

const PARAMS = ['soHieuVanBang', 'soVaoSo', 'maSinhVien', 'hoTen', 'ngaySinh'];
const countParams = (vals: any) => PARAMS.filter((k) => vals[k] != null && String(vals[k]).trim() !== '').length;

const DI = ({ label, children }: { label: string; children: React.ReactNode }) => (
	<Descriptions.Item label={label}>{children}</Descriptions.Item>
);

export const TabTraCuu: React.FC<Props> = ({ dsVanBang, dsQuyetDinh, setDsQuyetDinh, dsSoVanBang, dsTruongThongTin }) => {
	const [form] = Form.useForm();
	const [ketQua, setKetQua] = useState<{ vanBang: ThongTinVanBang; quyetDinh?: QuyetDinhTotNghiep; soVanBang?: SoVanBang }[]>([]);
	const [daTim, setDaTim] = useState(false);
	const [soTS, setSoTS] = useState(0);

	const handleTraCuu = (v: any) => {
		const ngayStr = v.ngaySinh ? moment(v.ngaySinh).format('YYYY-MM-DD') : undefined;
		const matched = dsVanBang.filter((vb) => {
			if (v.soHieuVanBang && !vb.soHieuVanBang.toLowerCase().includes(v.soHieuVanBang.toLowerCase())) return false;
			if (v.soVaoSo && vb.soVaoSo !== Number(v.soVaoSo)) return false;
			if (v.maSinhVien && !vb.maSinhVien.toLowerCase().includes(v.maSinhVien.toLowerCase())) return false;
			if (v.hoTen && !vb.hoTen.toLowerCase().includes(v.hoTen.toLowerCase())) return false;
			if (ngayStr && vb.ngaySinh !== ngayStr) return false;
			return true;
		});

		if (matched.length > 0) {
			const ids = [...new Set(matched.map((m) => m.quyetDinhId))];
			setDsQuyetDinh(dsQuyetDinh.map((q) => (ids.includes(q.id) ? { ...q, luotTraCuu: q.luotTraCuu + 1 } : q)));
		}

		setKetQua(matched.map((vb) => {
			const qd = dsQuyetDinh.find((q) => q.id === vb.quyetDinhId);
			return { vanBang: vb, quyetDinh: qd, soVanBang: dsSoVanBang.find((s) => s.id === qd?.soVanBangId) };
		}));
		setDaTim(true);
		matched.length ? message.success(`Tìm thấy ${matched.length} văn bằng.`) : message.info('Không tìm thấy.');
	};

	const reset = () => { form.resetFields(); setKetQua([]); setDaTim(false); setSoTS(0); };

	return (
		<Space direction='vertical' style={{ width: '100%' }} size={16}>
			<Card title={<><SearchOutlined /> Tra Cứu Văn Bằng</>} extra={<Tag color={soTS >= 2 ? 'green' : 'red'}>{soTS}/2 tham số</Tag>}>
				<Alert type='info' showIcon message='Nhập ít nhất 2 tham số để thực hiện tra cứu.' style={{ marginBottom: 16 }} />
				<Form form={form} layout='vertical' onFinish={handleTraCuu} onValuesChange={(_, all) => setSoTS(countParams(all))}>
					<Row gutter={16}>
						<Col xs={24} md={8}><Form.Item name='soHieuVanBang' label='Số hiệu VB'><Input placeholder='VB2024-001' allowClear /></Form.Item></Col>
						<Col xs={24} md={8}><Form.Item name='maSinhVien' label='Mã sinh viên'><Input placeholder='21IT...' allowClear /></Form.Item></Col>
						<Col xs={24} md={8}><Form.Item name='soVaoSo' label='Số vào sổ'><InputNumber style={{ width: '100%' }} min={1} /></Form.Item></Col>
						<Col xs={24} md={12}><Form.Item name='hoTen' label='Họ và tên'><Input placeholder='Nguyễn Văn A' allowClear /></Form.Item></Col>
						<Col xs={24} md={12}><Form.Item name='ngaySinh' label='Ngày sinh'><MyDatePicker style={{ width: '100%' }} format='DD/MM/YYYY' /></Form.Item></Col>
					</Row>
					<div style={{ textAlign: 'center', marginTop: 8 }}>
						<Space size='middle'>
							<Button type='primary' htmlType='submit' icon={<SearchOutlined />} size='large' disabled={soTS < 2}>Tra Cứu</Button>
							<Button onClick={reset} size='large' icon={<ReloadOutlined />}>Nhập Lại</Button>
						</Space>
					</div>
				</Form>
			</Card>

			{daTim && (
				<Card title={<><FileSearchOutlined /> Kết Quả <Tag color={ketQua.length > 0 ? 'green' : 'red'}>{ketQua.length}</Tag></>}>
					{ketQua.length === 0 ? (
						<Empty description='Không tìm thấy văn bằng phù hợp.' image={Empty.PRESENTED_IMAGE_SIMPLE} />
					) : ketQua.map((r, i) => (
						<div key={r.vanBang.id}>
							{i > 0 && <Divider />}
							<Descriptions
								title={<Space><Tag color='blue'>#{r.vanBang.soVaoSo}</Tag><span style={{ fontSize: 16 }}>{r.vanBang.hoTen}</span></Space>}
								bordered column={{ xs: 1, sm: 2 }} size='small'
								labelStyle={{ fontWeight: '600', width: '30%', background: '#fafafa' }}
							>
								<DI label='Số vào sổ'>#{r.vanBang.soVaoSo}</DI>
								<DI label='Số hiệu VB'>{r.vanBang.soHieuVanBang}</DI>
								<DI label='Mã SV'>{r.vanBang.maSinhVien}</DI>
								<DI label='Họ tên'>{r.vanBang.hoTen}</DI>
								<DI label='Ngày sinh'>{r.vanBang.ngaySinh ? moment(r.vanBang.ngaySinh).format('DD/MM/YYYY') : '-'}</DI>
								<DI label='Sổ VB'>{r.soVanBang ? `Năm ${r.soVanBang.nam} – ${r.soVanBang.moTa}` : '-'}</DI>
								<Descriptions.Item label='Quyết Định' span={2}>
									{r.quyetDinh ? (
										<div style={{ background: '#f6ffed', padding: '8px 12px', borderRadius: 6, border: '1px solid #b7eb8f' }}>
											<strong>{r.quyetDinh.soQD}</strong> | {moment(r.quyetDinh.ngayBanHanh).format('DD/MM/YYYY')}
											<div style={{ color: '#595959', fontSize: 13, marginTop: 4 }}>{r.quyetDinh.trichYeu}</div>
										</div>
									) : '-'}
								</Descriptions.Item>
								{dsTruongThongTin.map((t) => (
									<DI label={t.tenTruong} key={t.id}>
										{t.kieuDuLieu === KieuDuLieu.DATE && r.vanBang.truongDongMap[t.id]
											? moment(r.vanBang.truongDongMap[t.id]).format('DD/MM/YYYY')
											: String(r.vanBang.truongDongMap[t.id] ?? '-')}
									</DI>
								))}
							</Descriptions>
						</div>
					))}
				</Card>
			)}
		</Space>
	);
};
