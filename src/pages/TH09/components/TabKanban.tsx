import React, { useCallback } from 'react';
import { Card, Tag, Empty, Badge, Tooltip } from 'antd';
import {
	ClockCircleOutlined,
	ExclamationCircleOutlined,
	PlusOutlined,
} from '@ant-design/icons';
import {
	DragDropContext,
	Droppable,
	Draggable,
	type DropResult,
} from 'react-beautiful-dnd';
import moment from 'moment';
import type { ITask } from '../types';
import { ETrangThaiTask } from '../types';
import { KANBAN_COLUMNS, MAU_MUC_DO, MAU_TAG } from '../constants';
import { laQuaHan, layTaskTheoTrangThai } from '../utils';

interface Props {
	dsTask: ITask[];
	setDsTask: (tasks: ITask[]) => void;
	onThemTask: (trangThai: ETrangThaiTask) => void;
	onSuaTask: (task: ITask) => void;
}

const TabKanban: React.FC<Props> = ({ dsTask, setDsTask, onThemTask, onSuaTask }) => {
	const handleDragEnd = useCallback(
		(result: DropResult) => {
			const { source, destination, draggableId } = result;

			if (!destination) return;
			if (source.droppableId === destination.droppableId && source.index === destination.index) return;

			const trangThaiMoi = destination.droppableId as ETrangThaiTask;

			const danhSachMoi = dsTask.map((task) => {
				if (task.id === draggableId) {
					return { ...task, trangThai: trangThaiMoi };
				}
				return task;
			});

			setDsTask(danhSachMoi);
		},
		[dsTask, setDsTask],
	);

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<div style={{ display: 'flex', gap: 16, overflowX: 'auto', minHeight: 500, paddingBottom: 16 }}>
				{KANBAN_COLUMNS.map((column) => {
					const tasksInColumn = layTaskTheoTrangThai(dsTask, column.id);
					return (
						<div
							key={column.id}
							style={{
								flex: '1 1 0',
								minWidth: 280,
								background: '#fafafa',
								borderRadius: 8,
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							{/* Column Header */}
							<div
								style={{
									padding: '12px 16px',
									background: column.headerBg,
									borderRadius: '8px 8px 0 0',
									borderBottom: `3px solid ${column.color}`,
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<span style={{ fontWeight: 600, fontSize: 15 }}>
									{column.title}
									<Badge
										count={tasksInColumn.length}
										style={{
											backgroundColor: column.color,
											marginLeft: 8,
											fontSize: 12,
										}}
									/>
								</span>
								<Tooltip title='Thêm task'>
									<PlusOutlined
										style={{ cursor: 'pointer', fontSize: 16, color: '#1890ff' }}
										onClick={() => onThemTask(column.id)}
									/>
								</Tooltip>
							</div>

							{/* Droppable Area */}
							<Droppable droppableId={column.id}>
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										{...provided.droppableProps}
										style={{
											flex: 1,
											padding: 8,
											minHeight: 200,
											background: snapshot.isDraggingOver ? '#e6f7ff' : 'transparent',
											transition: 'background-color 0.2s ease',
											borderRadius: '0 0 8px 8px',
										}}
									>
										{tasksInColumn.length === 0 && !snapshot.isDraggingOver && (
											<Empty
												image={Empty.PRESENTED_IMAGE_SIMPLE}
												description='Kéo task vào đây'
												style={{ marginTop: 40 }}
											/>
										)}

										{tasksInColumn.map((task, index) => (
											<Draggable key={task.id} draggableId={task.id} index={index}>
												{(dragProvided, dragSnapshot) => (
													<div
														ref={dragProvided.innerRef}
														{...dragProvided.draggableProps}
														{...dragProvided.dragHandleProps}
														style={{
															marginBottom: 8,
															...dragProvided.draggableProps.style,
														}}
													>
														<Card
															size='small'
															hoverable
															onClick={() => onSuaTask(task)}
															style={{
																borderLeft: `4px solid ${MAU_MUC_DO[task.mucDoUuTien] === 'red' ? '#ff4d4f' : MAU_MUC_DO[task.mucDoUuTien] === 'orange' ? '#fa8c16' : '#52c41a'}`,
																boxShadow: dragSnapshot.isDragging
																	? '0 8px 24px rgba(0,0,0,0.15)'
																	: '0 1px 3px rgba(0,0,0,0.08)',
																transform: dragSnapshot.isDragging
																	? 'rotate(3deg)'
																	: 'none',
																transition: 'box-shadow 0.2s, transform 0.2s',
															}}
														>
															<div style={{ marginBottom: 8 }}>
																<strong style={{ fontSize: 13 }}>
																	{task.tenTask}
																</strong>
															</div>

															{task.moTa && (
																<div
																	style={{
																		fontSize: 12,
																		color: '#8c8c8c',
																		marginBottom: 8,
																		display: '-webkit-box',
																		WebkitLineClamp: 2,
																		WebkitBoxOrient: 'vertical',
																		overflow: 'hidden',
																	}}
																>
																	{task.moTa}
																</div>
															)}

															<div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
																<Tag color={MAU_TAG[task.tag] || 'default'} style={{ fontSize: 11 }}>
																	{task.tag}
																</Tag>
																<Tag color={MAU_MUC_DO[task.mucDoUuTien]} style={{ fontSize: 11 }}>
																	{task.mucDoUuTien}
																</Tag>
															</div>

															<div
																style={{
																	display: 'flex',
																	justifyContent: 'space-between',
																	alignItems: 'center',
																	fontSize: 12,
																}}
															>
																<span style={{ color: '#8c8c8c' }}>
																	<ClockCircleOutlined style={{ marginRight: 4 }} />
																	{moment(task.deadline).format('DD/MM/YYYY')}
																</span>
																{laQuaHan(task) && (
																	<Tag
																		icon={<ExclamationCircleOutlined />}
																		color='error'
																		style={{ fontSize: 11, margin: 0 }}
																	>
																		Quá hạn
																	</Tag>
																)}
															</div>
														</Card>
													</div>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</div>
					);
				})}
			</div>
		</DragDropContext>
	);
};

export default TabKanban;
