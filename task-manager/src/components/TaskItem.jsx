import { useState } from "react";

import { useTaskConext } from "../context/TaskContext";

const TaskItem = ({ task }) => {
  const { toggleTask, editTask, deleteTask } = useTaskConext();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...task });
  // console.log(task);

  const handleEdit = () => {
    editTask(editData);
    // console.log({ task, editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...task });
    setIsEditing(false);
  };

  // utility function
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#ff4757";
      case "medium":
        return "#ffa502";
      case "low":
        return "#26de81";
      default:
        return "#ddd";
    }
  };

  const getActionBtnColor = (type) => {
    switch (type) {
      case "pending":
        return "#ffa502";
      case "completed":
        return "#26de81";
      case "edit":
        return "#667eea";
      case "delete":
        return "#ff4757";
      default:
        return "#ddd";
    }
  };

  const handleEditDataChange = (key, newValue) => {
    setEditData((prev) => ({ ...prev, [key]: newValue }));
  };
  return isEditing ? (
    <div className="task-item editing">
      <div className="form-group">
        <label htmlFor="title">Title*</label>
        <input
          type="text"
          value={editData.title}
          onChange={(e) => handleEditDataChange("title", e.target.value)}
          placeholder="Task title..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          value={editData.description}
          onChange={(e) => handleEditDataChange("description", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <select
          value={editData.priority}
          onChange={(e) => handleEditDataChange("priority", e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="edit-actions">
        <button
          className="toggle-btn"
          style={{ backgroundColor: getActionBtnColor("completed") }}
          onClick={handleEdit}
        >
          Save
        </button>
        <button
          className="toggle-btn"
          style={{ backgroundColor: getActionBtnColor("delete") }}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  ) : (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-content">
        <div className="task-header">
          <h3>{task.title}</h3>
          <span
            className="priority-badge"
            style={{ backgroundColor: getPriorityColor(task.priority) }}
          >
            {task.priority}
          </span>
        </div>
        {task.description && <p>{task.description}</p>}
        <div className="task-meta">
          <small>
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </small>
          {/* <small>
            Updated: {new Date(task.updatedAt).toLocaleDateString()}
          </small> */}
        </div>
        <div className="task-actions">
          <button
            className={`toggle-btn ${task.completed ? "completed" : "pending"}`}
            style={{
              backgroundColor: getActionBtnColor(
                task.completed ? "completed" : "pending",
              ),
            }}
            onClick={() => toggleTask(task.id, !task.completed)}
          >
            {task.completed ? "Completed" : "Pending"}
          </button>
          <button
            className="toggle-btn"
            style={{
              backgroundColor: getActionBtnColor("edit"),
            }}
            onClick={() => {
              setEditData({ ...task });
              setIsEditing(true);
            }}
          >
            Edit
          </button>
          <button
            className="toggle-btn"
            style={{
              backgroundColor: getActionBtnColor("delete"),
            }}
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
