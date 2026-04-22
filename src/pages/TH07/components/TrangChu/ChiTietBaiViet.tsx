import React, { useMemo } from 'react';
import { Card, Typography, Tag, Button, Row, Col, Divider, Avatar, Space } from 'antd';
import {
	ArrowLeftOutlined,
	CalendarOutlined,
	EyeOutlined,
	UserOutlined,
	TagOutlined,
} from '@ant-design/icons';
import { IBaiViet, IThe, ETrangThai } from '../../types';
import { MAU_THE } from '../../constants';
import { layTenThe } from '../../utils/helpers';

const { Title, Paragraph, Text } = Typography;

interface IChiTietBaiVietProps {
	baiVietId: string;
	dsBaiViet: IBaiViet[];
	dsThe: IThe[];
	quayLai: () => void;
	moChiTiet: (id: string) => void;
}

const ChiTietBaiViet: React.FC<IChiTietBaiVietProps> = ({
	baiVietId, dsBaiViet, dsThe, quayLai, moChiTiet,
}) => {
	const baiViet = useMemo(() => dsBaiViet.find((bv) => bv.id === baiVietId), [dsBaiViet, baiVietId]);

	const baiVietLienQuan = useMemo(() => {
		if (!baiViet) return [];
		return dsBaiViet
			.filter(
				(bv) =>
					bv.id !== baiViet.id &&
					bv.trangThai === ETrangThai.DaDang &&
					bv.dsTheId.some((theId) => baiViet.dsTheId.includes(theId)),
			)
			.slice(0, 3);
	}, [dsBaiViet, baiViet]);

	if (!baiViet) {
		return (
			<Card>
				<p>Bài viết không tồn tại.</p>
				<Button onClick={quayLai} icon={<ArrowLeftOutlined />}>Quay lại</Button>
			</Card>
		);
	}

	const renderMarkdown = (content: string) => {
		let html = content;
		html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
		html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
		html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
		html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_m, _lang, code) =>
			`<pre style="background:#1e1e1e;color:#d4d4d4;padding:16px;border-radius:8px;overflow-x:auto;font-size:13px;line-height:1.5"><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`,
		);
		html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
		html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
		html = html.replace(/`(.*?)`/g, '<code style="background:#f5f5f5;padding:2px 6px;border-radius:4px;font-size:13px">$1</code>');
		html = html.replace(/^\|(.+)\|$/gm, (match) => {
			const cells = match.split('|').filter((c) => c.trim() !== '');
			return `<tr>${cells.map((c) => `<td style="border:1px solid #ddd;padding:8px">${c.trim()}</td>`).join('')}</tr>`;
		});
		html = html.replace(/(<tr>.*<\/tr>\n?)+/g, (match) => {
			const rows = match.trim().split('\n').filter((r) => !r.match(/^\|[\s\-|]+\|$/));
			return rows.length > 0 ? `<table style="border-collapse:collapse;width:100%;margin:12px 0">${rows.join('')}</table>` : match;
		});
		html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
		html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
		html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');
		html = html.replace(/\n\n/g, '<br/><br/>');
		html = html.replace(/\n/g, '<br/>');
		return html;
	};

	return (
		<div>
			<Button onClick={quayLai} icon={<ArrowLeftOutlined />} style={{ marginBottom: 16 }} size='large'>
				Quay lại danh sách
			</Button>

			<Card>
				<img
					src={baiViet.anhDaiDien}
					alt={baiViet.tieuDe}
					style={{ width: '100%', maxHeight: 400, objectFit: 'cover', borderRadius: 8, marginBottom: 24 }}
				/>
				<Title level={2}>{baiViet.tieuDe}</Title>

				<Space size='large' style={{ marginBottom: 16 }}>
					<Text type='secondary'>
						<Avatar icon={<UserOutlined />} size='small' style={{ marginRight: 4 }} />
						{baiViet.tacGia}
					</Text>
					<Text type='secondary'><CalendarOutlined style={{ marginRight: 4 }} />{baiViet.ngayDang}</Text>
					<Text type='secondary'><EyeOutlined style={{ marginRight: 4 }} />{baiViet.luotXem} lượt xem</Text>
				</Space>

				<div style={{ marginBottom: 16 }}>
					<TagOutlined style={{ marginRight: 8 }} />
					{baiViet.dsTheId.map((theId, idx) => (
						<Tag key={theId} color={MAU_THE[idx % MAU_THE.length]}>{layTenThe(theId, dsThe)}</Tag>
					))}
				</div>

				<Divider />

				<div
					style={{ fontSize: 15, lineHeight: 1.8 }}
					dangerouslySetInnerHTML={{ __html: renderMarkdown(baiViet.noiDung) }}
				/>
			</Card>

			{baiVietLienQuan.length > 0 && (
				<>
					<Divider><Title level={4} style={{ margin: 0 }}>📚 Bài viết liên quan</Title></Divider>
					<Row gutter={[16, 16]}>
						{baiVietLienQuan.map((bv) => (
							<Col xs={24} sm={12} lg={8} key={bv.id}>
								<Card
									hoverable
									cover={<img alt={bv.tieuDe} src={bv.anhDaiDien} style={{ height: 160, objectFit: 'cover' }} />}
									onClick={() => moChiTiet(bv.id)}
								>
									<Card.Meta
										title={bv.tieuDe}
										description={<Paragraph ellipsis={{ rows: 2 }} style={{ color: '#666' }}>{bv.tomTat}</Paragraph>}
									/>
								</Card>
							</Col>
						))}
					</Row>
				</>
			)}
		</div>
	);
};

export default ChiTietBaiViet;
