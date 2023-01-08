<template>
	<div>
		<ul class="errors">
			<li v-for="(error, id) in errors" :key="id">{{ error }}</li>
		</ul>
	</div>
	<div>
		<label for="task-name">Name</label>
		<input type="text" id="task-name" placeholder="Task name" v-model="name">
	</div>
	<div>
		<label for="task-tag">Tag</label>
		<input type="text" id="task-tag" placeholder="Task tag" v-model="tag">
	</div>
	<div>
		<label for="task-description">Description</label>
		<textarea id="task-description" placeholder="Task description" v-model="description"></textarea>
	</div>
	<div>
		<label for="task-deadline">Deadline</label>
		<Datepicker v-model="deadline"></Datepicker>
	</div>

	<button @click.prevent="createTask">Save</button>
</template>
<script>
import { addNewTask } from '../store';

export default {
	data() {
		return {
			tag: '',
			name: '',
			deadline: new Date(),
			description: '',

			errors: [],
		};
	},
	methods: {
		validate() {
			this.errors = [];
			['tag', 'name', 'deadline', 'description'].forEach((key)=> {
				if (this[key] == '') {
					this.errors.push(`please fill the ${key} field.`);
				} else if (this[key].length > 2048) {
					this.errors.push(`${key} is too long.`);
				}
			});
		},
		createTask() {
			this.validate();
			if (this.errors.length != 0) {
				return;
			}
			addNewTask({
				tag: this.tag,
				name: this.name,
				status: 'In Progress',
				deadline: this.deadline,
				description: this.description,
			});

			this.$router.push('/');
		},
	}
}
</script>
<style>
.errors { color: #f20000; }
</style>