import { createApp } from 'vue';
import * as VueRouter from 'vue-router';

import App from './App.vue';
import EditTask from './components/EditTask';
import TasksList from './components/TasksList';
import CreateTask from './components/CreateTask';

import Datepicker from 'vue3-datepicker';

const routes = [
	{ path: '/', component: TasksList },
	{ path: '/tasks/create', component: CreateTask },
	{ path: '/tasks/:id', component: EditTask },
];

const router = VueRouter.createRouter({
	history: VueRouter.createWebHashHistory(),
	routes,
});

function pad(num) {
	return num.toString().padStart(2, '0');
}

createApp(App)
	.use(router)
	.mixin({
		methods: {
			dateFormat(date) {
				return [
					pad(date.getDate()),
					pad(date.getMonth() + 1),
					date.getFullYear(),
				].join('/');
			}
		}
	})
	.component('Datepicker', Datepicker)
	.mount('#app');
