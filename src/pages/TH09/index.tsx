import React, { useState } from 'react';
import { Tabs, message } from 'antd';
import {
	DashboardOutlined,
	AppstoreOutlined,
	UnorderedListOutlined,
} from '@ant-design/icons';
import { useTh09Model } from './hooks/useTh09Model';
import TabDashboard from './components/TabDashboard';
import TabKanban from './components/TabKanban';
import TabDanhSach from './components/TabDanhSach';
import FormTask from './components/FormTask';
import type { ITask } from './types';
import { ETrangThaiTask } from './types';

const { TabPane } = Tabs;

const TH09_QuanLyCongViec: React.FC = () => {
	const model = useTh09Model();

	const [hienForm, setHienForm] = useState(false);
	const [taskSua, setTaskSua] = useState<ITask | null>(null);
	const [trangThaiMacDinh, setTrangThaiMacDinh] = useState<ETrangThaiTask>(ETrangThaiTask.CanLam);

	const moFormThem = (trangThai?: ETrangThaiTask) => {
		setTaskSua(null);
		setTrangThaiMacDinh(trangThai || ETrangThaiTask.CanLam);
		setHienForm(true);
	};

	const moFormSua = (task: ITask) => {
		setTaskSua(task);
		setHienForm(true);
	};

	const handleSubmit = (task: ITask) => {
		if (taskSua) {
			model.setDsTask(model.dsTask.map((t) => (t.id === task.id ? task : t)));
			message.success('Cập nhật task thành công!');
		} else {
			model.setDsTask([task, ...model.dsTask]);
			message.success('Thêm task thành công!');
		}
		setHienForm(false);
		setTaskSua(null);
	};

	return (
		<div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
			<h2 style={{ marginBottom: 20 }}>ỨNG DỤNG THEO DÕI CÔNG VIỆC CÁ NHÂN</h2>
			<Tabs defaultActiveKey='1' type='card' size='large'>
				<TabPane
					tab={<span><DashboardOutlined /> 1. Dashboard</span>}
					key='1'
				>
					<TabDashboard dsTask={model.dsTask} />
				</TabPane>

				<TabPane
					tab={<span><AppstoreOutlined /> 2. Kanban Board</span>}
					key='2'
				>
					<TabKanban
						dsTask={model.dsTask}
						setDsTask={model.setDsTask}
						onThemTask={moFormThem}
						onSuaTask={moFormSua}
					/>
				</TabPane>

				<TabPane
					tab={<span><UnorderedListOutlined /> 3. Danh Sách Task</span>}
					key='3'
				>
					<TabDanhSach
						dsTask={model.dsTask}
						setDsTask={model.setDsTask}
						onThemTask={() => moFormThem()}
						onSuaTask={moFormSua}
					/>
				</TabPane>
			</Tabs>

			<FormTask
				visible={hienForm}
				onCancel={() => { setHienForm(false); setTaskSua(null); }}
				onSubmit={handleSubmit}
				taskSua={taskSua}
				trangThaiMacDinh={trangThaiMacDinh}
			/>
		</div>
	);
};

export default TH09_QuanLyCongViec;
