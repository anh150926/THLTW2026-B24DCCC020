import { Button, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnType } from 'antd/es/table';
import { IPhongHoc } from '../../types';

export function taoPropTimKiem(dataIndex: keyof IPhongHoc): ColumnType<IPhongHoc> {
	return {
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div style={{ padding: 8 }}>
				<Input
					placeholder='Nhập từ khóa...'
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => confirm()}
					style={{ marginBottom: 8, display: 'block' }}
				/>
				<Space>
					<Button
						type='primary'
						onClick={() => confirm()}
						icon={<SearchOutlined />}
						size='small'
					>
						Tìm
					</Button>
					<Button
						size='small'
						onClick={() => {
							if (clearFilters) clearFilters();
							confirm();
						}}
					>
						Xóa lọc
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered: boolean) => (
			<SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
		),
		onFilter: (value, record) =>
			String(record[dataIndex]).toLowerCase().includes(String(value).toLowerCase()),
	};
}
