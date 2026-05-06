import useLocalStorage from './useLocalStorage';
import type { ITask } from '../types';
import { DU_LIEU_TASK } from '../constants';

export const useTh09Model = () => {
	const [dsTask, setDsTask] = useLocalStorage<ITask[]>('TH09_DsTask', DU_LIEU_TASK);

	return {
		dsTask,
		setDsTask,
	};
};
