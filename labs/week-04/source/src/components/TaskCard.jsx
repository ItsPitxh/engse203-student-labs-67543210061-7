function TaskCard({ task, onDeleteTask }) {
  return (
    <li className="task-card">
      <div className="task-info">
        <h3>{task.title}</h3>
        <div className="task-tags">
          <span className="badge">{task.category}</span>
          <span className="badge">{task.priority}</span>
          <span className="badge" style={{ background: '#bfdbfe' }}>{task.status}</span>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => onDeleteTask(task.id)}
        aria-label={`ลบรายการ ${task.title}`}
      >
        ลบ
      </button>
    </li>
  );
}

export default TaskCard;