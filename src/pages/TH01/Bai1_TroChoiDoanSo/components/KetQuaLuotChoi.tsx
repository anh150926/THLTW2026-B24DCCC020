import React from 'react';
import { Alert } from 'antd';
import { TrophyOutlined, FrownOutlined, SmileOutlined } from '@ant-design/icons';

interface Props {
	trangThai: 'dang_choi' | 'thang' | 'thua';
	thongBao: string;
	loaiThongBao: 'info' | 'success' | 'warning' | 'error';
}

export const KetQuaLuotChoi: React.FC<Props> = ({ trangThai, thongBao, loaiThongBao }) => {
	return (
		<div style={{ textAlign: 'center', marginBottom: 20 }}>
			<div style={{ fontSize: 60, marginBottom: 10 }}>
				{trangThai === 'thang' && <TrophyOutlined style={{ color: '#52c41a' }} />}
				{trangThai === 'thua' && <FrownOutlined style={{ color: '#ff4d4f' }} />}
				{trangThai === 'dang_choi' && <SmileOutlined style={{ color: '#1890ff' }} />}
			</div>
			<Alert message={thongBao} type={loaiThongBao} showIcon />
		</div>
	);
};
