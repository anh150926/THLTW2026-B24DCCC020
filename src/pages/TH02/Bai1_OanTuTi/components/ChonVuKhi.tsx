import React from 'react';
import { Button, Space, Typography } from 'antd';
import { ScissorOutlined, CodeSandboxOutlined, FileTextOutlined } from '@ant-design/icons';
import { VU_KHI } from '../../constants';

const { Title } = Typography;

interface Props {
	xuLyChon: (luaChon: string) => void;
}

export const ChonVuKhi: React.FC<Props> = ({ xuLyChon }) => {
	return (
		<div style={{ textAlign: 'center', marginBottom: 30 }}>
			<Title level={4}>Chọn vũ khí:</Title>
			<Space size='large'>
				<Button size='large' icon={<ScissorOutlined />} onClick={() => xuLyChon(VU_KHI.KEO)}>
					Kéo
				</Button>
				<Button size='large' icon={<CodeSandboxOutlined />} onClick={() => xuLyChon(VU_KHI.BUA)}>
					Búa
				</Button>
				<Button size='large' icon={<FileTextOutlined />} onClick={() => xuLyChon(VU_KHI.BAO)}>
					Bao
				</Button>
			</Space>
		</div>
	);
};
