import React from 'react';
import { InputNumber, Button, Row, Col } from 'antd';
import { FireOutlined } from '@ant-design/icons';

interface Props {
	soDuDoan: number | null;
	setSoDuDoan: (value: number | null) => void;
	xuLyDoan: () => void;
	dangChoi: boolean;
}

export const FormDoanSo: React.FC<Props> = ({ soDuDoan, setSoDuDoan, xuLyDoan, dangChoi }) => {
	return (
		<Row gutter={16} justify='center' align='middle' style={{ marginBottom: 20 }}>
			<Col span={16}>
				<InputNumber
					min={1}
					max={100}
					value={soDuDoan}
					onChange={setSoDuDoan}
					disabled={!dangChoi}
					style={{ width: '100%' }}
					size='large'
					placeholder='Nhập số (1-100)'
					onPressEnter={xuLyDoan}
				/>
			</Col>
			<Col span={8}>
				<Button
					type='primary'
					icon={<FireOutlined />}
					size='large'
					block
					onClick={xuLyDoan}
					disabled={!dangChoi || soDuDoan === null}
				>
					Đoán
				</Button>
			</Col>
		</Row>
	);
};
