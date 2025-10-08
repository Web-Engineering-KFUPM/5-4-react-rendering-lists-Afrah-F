import DueBadge from "./DueBadge";

export default function TaskItem({ task, onToggle, onDelete }) {
    return (
        <li className="task">
            <label className="taskMain">
                {/* 🟩 PART B: wire the checkbox */}
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={() => onToggle(task.id)}
                    aria-label="Mark task done"
                />

                {/* 🟩 PART B: show DueBadge only if NOT done */}
                {!task.isDone && <DueBadge dueDate={task.dueDate} />}

                {/* Task title */}
                <span className={`title${task.isDone ? " done" : ""}`}>
          {task.title}
        </span>
            </label>

            {/* 🟩 PART B: delete button */}
            <button
                className="ghost"
                aria-label="Delete task"
                onClick={() => onDelete(task.id)}
            >
                ✕
            </button>
        </li>
    );
}
