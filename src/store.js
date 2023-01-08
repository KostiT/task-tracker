import { v4 as uuidv4 } from 'uuid';

const getAllTasks = () => {
	const tasks = window.localStorage.getItem('tasks') ?? '{}';
	return JSON.parse(tasks);
};

const saveTasks = (tasks) => {
	window.localStorage.setItem('tasks', JSON.stringify(tasks));
};

const getTaskById = (id) => {
	let tasks = getAllTasks();
	let task = tasks[id];
	if (task == undefined) {
		throw new Error("Id not found.");
	}
	return {
		...task,
		deadline: new Date(task.deadline)
	};
}

const updateTask = (id, task) => {
	var tasks = getAllTasks();
	if (tasks[id] == undefined) {
		throw new Error("Id not found.");
	}
	tasks[id] = task;
	saveTasks(tasks);
}

const addNewTask = (task) => {
	var tasks = getAllTasks();
	const id = uuidv4();

	tasks[id] = {
		id: id, // for easier access
		...task
	};
	saveTasks(tasks);
}

const filterTasks = (status, isOverdue) => {
	let tasks = Object.values(getAllTasks()).map((task) => ({
		...task,
		deadline: new Date(task.deadline)
	}));

	if (status) {
		tasks = tasks.filter((task) => task.status == status);
	}

	if (isOverdue == "true") {
		tasks = tasks.filter((task) => task.deadline < new Date());
	}

	return tasks;
}


export {
	getAllTasks, addNewTask, updateTask, getTaskById, filterTasks
}