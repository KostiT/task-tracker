<template>
    <div>
      <select v-model="status">
        <option value="">All</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    </div>

    <div>
      <input type="checkbox" :value="false" v-model="overdue" id="deadlineOverdue">
      <label class="label-inline" for="deadlineOverdue">Overdue deadline</label>
    </div>

  <div>
    <table>
      <colgroup>
        <col width="10%" />
        <col width="10%" />
        <col width="40%" />
        <col width="10%" />
      </colgroup>
      <thead>
        <td>Name</td>
        <td>Deadline</td>
        <td>Description</td>
        <td>Status</td>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>
            <router-link :to="`/tasks/${task.id}`">{{ task.name }}</router-link>
          </td>
          <td>{{ dateFormat(task.deadline) }}</td>
          <td>
            <div class="description">
              <span>{{ task.description }}</span>
            </div>
          </td>
          <td>{{ task.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { filterTasks } from '../store';
export default {
  data() {
    return {
      status: 'all',
      overdue: false,
    }
  },
  watch: {
    overdue(newVal) {
      this.$router.push({ query: { ...this.$route.query, overdue: newVal } });
    },
    status(newVal) {
      this.$router.push({ query: { ...this.$route.query, status: newVal } });
    },
    '$route.query.status': function(val) {
      this.status = val;
    },
    '$route.query.overdue': function(val) {
      this.overdue = val;
    },
  },
  created() {
    this.status = this.$route.query.status;
  },
  computed: {
    tasks() {
      return filterTasks(this.$route.query.status, this.$route.query.overdue);
    }
  },
}
</script>
<style>
.flex-1 { flex: 1; }
.description { display: flex; }

.description span {
  flex: 1;
  width: 1px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>