import { useTaskConext } from "../context/TaskContext";

import TaskItem from "./TaskItem";

const TaskList = () => {
  const { tasks, taskStats } = useTaskConext();

  return tasks.length === 0 ? (
    <div className="empty-state">
      <h3>No tasks found</h3>
      <p>Add a task to get started!</p>
    </div>
  ) : (
    <div className="task-list">
      <div className="task-stats">
        <span>Total: {taskStats.total}</span>
        <span>Completed: {taskStats.completed}</span>
        <span>Pending: {taskStats.pending}</span>
      </div>

      <div className="tasks">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
