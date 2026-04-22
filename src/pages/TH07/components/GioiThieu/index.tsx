import React from 'react';
import { Card, Avatar, Typography, Tag, Divider, Row, Col } from 'antd';
import {
	GithubOutlined,
	FacebookOutlined,
	LinkedinOutlined,
	MailOutlined,
	UserOutlined,
	TrophyOutlined,
	CodeOutlined,
} from '@ant-design/icons';
import { THONG_TIN_TAC_GIA } from '../../constants';

const { Title, Paragraph, Text, Link } = Typography;

const GioiThieu: React.FC = () => {
	const tacGia = THONG_TIN_TAC_GIA;
	const colors = ['blue', 'green', 'cyan', 'purple', 'magenta', 'volcano', 'gold', 'geekblue'];

	return (
		<Row gutter={[24, 24]}>
			<Col xs={24} md={8}>
				<Card bodyStyle={{ textAlign: 'center', padding: '24px 16px' }}>
					<Avatar
						size={120}
						src={tacGia.anhDaiDien}
						icon={<UserOutlined />}
						style={{ marginBottom: 12, border: '3px solid #1890ff' }}
					/>
					<Title level={4} style={{ marginBottom: 4 }}>{tacGia.ten}</Title>
					<Text type='secondary'>Full-stack Developer</Text>

					<Divider style={{ margin: '16px 0' }} />

					<div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
						<Link href={tacGia.lienKet.github} target='_blank'>
							<GithubOutlined style={{ fontSize: 18, marginRight: 8 }} />GitHub
						</Link>
						<Link href={tacGia.lienKet.facebook} target='_blank'>
							<FacebookOutlined style={{ fontSize: 18, marginRight: 8, color: '#1877f2' }} />Facebook
						</Link>
						<Link href={tacGia.lienKet.linkedin} target='_blank'>
							<LinkedinOutlined style={{ fontSize: 18, marginRight: 8, color: '#0a66c2' }} />LinkedIn
						</Link>
						<Link href={`mailto:${tacGia.lienKet.email}`}>
							<MailOutlined style={{ fontSize: 18, marginRight: 8, color: '#ea4335' }} />{tacGia.lienKet.email}
						</Link>
					</div>
				</Card>
			</Col>

			<Col xs={24} md={16}>
				<Card
					title={<span><UserOutlined style={{ marginRight: 8 }} />Giới thiệu bản thân</span>}
					bodyStyle={{ padding: '16px 24px' }}
					style={{ marginBottom: 16 }}
				>
					<Paragraph style={{ fontSize: 15, lineHeight: 1.8, marginBottom: 0 }}>
						{tacGia.tieuSu}
					</Paragraph>
				</Card>

				<Card
					title={<span><CodeOutlined style={{ marginRight: 8 }} />Kỹ năng chuyên môn</span>}
					bodyStyle={{ padding: '16px 24px' }}
					style={{ marginBottom: 16 }}
				>
					{tacGia.kyNang.map((kyNang, idx) => (
						<Tag key={kyNang} color={colors[idx % colors.length]} style={{ fontSize: 14, padding: '4px 12px', marginBottom: 8 }}>
							{kyNang}
						</Tag>
					))}
				</Card>

				<Card
					title={<span><TrophyOutlined style={{ marginRight: 8 }} />Thành tựu</span>}
					bodyStyle={{ padding: '16px 24px' }}
				>
					<ul style={{ fontSize: 14, lineHeight: 2, margin: 0, paddingLeft: 20 }}>
						<li>Tham gia phát triển nhiều dự án web thực tế</li>
						<li>Đóng góp cho cộng đồng mã nguồn mở trên GitHub</li>
						<li>Viết blog chia sẻ kiến thức lập trình đều đặn</li>
						<li>Hoàn thành nhiều khóa học chuyên sâu về công nghệ web</li>
					</ul>
				</Card>
			</Col>
		</Row>
	);
};

export default GioiThieu;
