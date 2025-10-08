import { useState } from "react";
import TaskItem from "./TaskItem";

export default function CourseCard({ course, index, onMutateCourse }) {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");

    // 📘 TASK 4 — PART A: toggle via .map()
    function toggleTask(id) {
        onMutateCourse(index, (tasks) =>
            tasks.map((t) => (t.id === id ? { ...t, isDone: !t.isDone } : t))
        );
    }

    // 📘 TASK 4 — PART A: delete via .filter()
    function deleteTask(id) {
        onMutateCourse(index, (tasks) => tasks.filter((t) => t.id !== id));
    }

    // 📘 TASK 4 — PART A: add a new task
    function addTask(e) {
        e.preventDefault();
        const trimmed = title.trim();
        if (!trimmed || !date) return;

        const newTask = {
            id: Date.now().toString(),
            title: trimmed,
            dueDate: date,
            isDone: false,
        };

        onMutateCourse(index, (tasks) => [...tasks, newTask]);
        setTitle("");
        setDate("");
    }

    const allDone =
        course.tasks.length > 0 && course.tasks.every((t) => t.isDone);

    return (
        <article className="course card">
            <header className="cardHeader">
                <h2>{course.title}</h2>
                {/* 🟩 PART A: “All caught up” badge when ALL tasks are done */}
                {allDone && <span className="badge success">All caught up</span>}
            </header>

            {/* 🟩 PART A: Empty vs list (ternary) */}
            <section className="tasksSection">
                {course.tasks.length === 0 ? (
                    <p className="empty">No tasks yet. Add your first one below.</p>
                ) : (
                    <ul className="tasks">
                        {/* 📘 TASK 2 — Render tasks */}
                        {course.tasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onToggle={toggleTask}
                                onDelete={deleteTask}
                            />
                        ))}
                    </ul>
                )}
            </section>

            {/* Add Form */}
            <form onSubmit={addTask} className="newTask">
                <input
                    className="titleField"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task title"
                    aria-label="Task title"
                />
                <div className="dateRow">
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        aria-label="Due date"
                    />
                    <button type="submit" className="primary">
                        Add
                    </button>
                </div>
            </form>
        </article>
    );
}
