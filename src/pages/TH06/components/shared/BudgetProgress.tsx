import React from 'react';
import { Progress } from 'antd';

interface Props {
	phanTram: number;
	size?: 'small' | 'default';
	label?: string;
}

export const BudgetProgress: React.FC<Props> = ({ phanTram, size = 'small', label = 'Tỷ lệ sử dụng' }) => (
	<div>
		{label && <div style={{ fontSize: 14, color: 'rgba(0,0,0,0.45)', marginBottom: 4 }}>{label}</div>}
		<Progress
			percent={Math.min(phanTram, 100)}
			status={phanTram > 100 ? 'exception' : phanTram > 80 ? 'active' : 'success'}
			strokeColor={phanTram > 100 ? '#f5222d' : phanTram > 80 ? '#fa8c16' : '#52c41a'}
			format={() => `${phanTram}%`}
			size={size}
		/>
	</div>
);
