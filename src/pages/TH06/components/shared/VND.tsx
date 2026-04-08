import React from 'react';
import { InputNumber } from 'antd';

interface Props {
	value?: number;
	onChange?: (v: number | null) => void;
	min?: number;
	step?: number;
	style?: React.CSSProperties;
	size?: 'small' | 'middle' | 'large';
	placeholder?: string;
	addonAfter?: string;
}

export const VNDInput: React.FC<Props> = ({
	min = 0,
	step = 50000,
	style = { width: '100%' },
	...rest
}) => (
	<InputNumber
		min={min}
		step={step}
		style={style}
		formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
		parser={(v: any) => v.replace(/,/g, '')}
		{...rest}
	/>
);
