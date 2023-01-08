<template>
	<div>
		<table>
			<colgroup>
				<col width="30%" />
				<col width="70%" />
			</colgroup>
			<tbody>
				<tr>
					<td>Name:</td><td>{{ task.name }}</td>
				</tr>
				<tr>
					<td>Tag:</td><td>{{ task.tag }}</td>
				</tr>
				<tr>
					<td>Status:</td>
					<td>
						<div class="space-between">
							<div>{{ task.status }}</div>
							<div>
								<button class="button" v-if="task.status == 'In Progress'" @click.prevent="updateTaskStatus(task.id, 'Done')">Done?</button>
								<button class="button" v-else @click.prevent="updateTaskStatus(task.id, 'In Progress')">In Progress?</button>
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<td>Deadline:</td>
					<td>
						<div v-if="deadlineFormVisible" class="space-between space-x">
							<Datepicker v-model="task.deadline"></Datepicker>
							<button class="button" @click.prevent="updateDeadline(task.id)">Update</button>
						</div>
						<div v-else class="space-between">
							{{ dateFormat(task.deadline) }}
							<a href="#" class="button button-outline" @click.prevent="showDeadlineForm">Change</a>
						</div>
					</td>
				</tr>
				<tr>
					<td>Task description:</td><td>{{ task.description }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
import { getTaskById, updateTask } from '../store';

export default {
	data() {
		return {
			task: {
				tag: '',
				name: '',
				deadline: new Date(),
				description: '',
			},
			deadlineFormVisible: false,
		};
	},
	mounted() {
		this.task = getTaskById(this.$route.params.id);
	},
	methods: {
		updateTaskStatus(id, status) {
			this.task.status = status;
			updateTask(id, this.task);
		},
		showDeadlineForm() {
			this.deadlineFormVisible = !this.deadlineFormVisible;
		},
		updateDeadline(id) {
			updateTask(id, this.task);
			this.deadlineFormVisible = false;
		}
	}
}
</script>
<style>
.button, input { margin-bottom: 0; }
.space-between { display: flex; align-items: center; justify-content: space-between; }
</style>