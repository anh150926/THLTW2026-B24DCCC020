import React from 'react';
import { List, Tag, Typography } from 'antd';

const { Text } = Typography;

interface Props {
	lichSu: { so: number; ketQua: string }[];
}

export const LichSuDoan: React.FC<Props> = ({ lichSu }) => {
	return (
		<div style={{ marginTop: 20 }}>
			<Text strong>Lịch sử các lần đoán:</Text>
			<List
				size='small'
				bordered
				dataSource={lichSu}
				style={{ marginTop: 10, maxHeight: 150, overflowY: 'auto', backgroundColor: '#fff' }}
				renderItem={(item, index) => (
					<List.Item>
						<Text>Lần {lichSu.length - index}: </Text>
						<Tag color='blue' style={{ marginLeft: 5 }}>
							{item.so}
						</Tag>
						<Text type='secondary'>({item.ketQua})</Text>
					</List.Item>
				)}
			/>
		</div>
	);
};
