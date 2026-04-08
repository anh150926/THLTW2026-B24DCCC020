import React from 'react';
import { Alert } from 'antd';
import { WarningOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { formatTienVND } from '../../utils/helpers';

interface Props {
	phanTram: number;
	conLai: number;
	vuotNganSach: number;
}

export const BudgetAlert: React.FC<Props> = ({ phanTram, conLai, vuotNganSach }) => {
	if (phanTram > 100)
		return (
			<Alert
				type='error'
				showIcon
				icon={<WarningOutlined />}
				message='⚠️ VƯỢT NGÂN SÁCH!'
				description={`Chi phí ước tính vượt ${formatTienVND(vuotNganSach)} so với ngân sách. Hãy cân nhắc giảm bớt điểm đến hoặc tăng ngân sách.`}
				style={{ marginBottom: 16 }}
			/>
		);
	if (phanTram > 80)
		return (
			<Alert
				type='warning'
				showIcon
				message='Sắp vượt ngân sách!'
				description={`Đã sử dụng ${phanTram}% ngân sách. Chỉ còn ${formatTienVND(conLai)} có thể chi tiêu.`}
				style={{ marginBottom: 16 }}
			/>
		);
	if (phanTram > 0)
		return (
			<Alert
				type='success'
				showIcon
				icon={<CheckCircleOutlined />}
				message='Ngân sách ổn định'
				description={`Đã sử dụng ${phanTram}% ngân sách. Còn lại ${formatTienVND(conLai)} để chi tiêu.`}
				style={{ marginBottom: 16 }}
			/>
		);
	return null;
};
