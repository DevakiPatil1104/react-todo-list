import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function ToDoList() {

    let [tasks, setTasks] = useState([
        { toDo: "sample task", id: uuidv4(), isDone: false }
    ]);
    let [newTask, setNewTask] = useState("");

    let addNewTask = () => {
        setTasks((prevTasks) => {
            return [...prevTasks, { toDo: newTask, id: uuidv4(), isDone: false }];
        });
        setNewTask("");
    };

    let updateTaskValue = (event) => {
        setNewTask(event.target.value);
    };

    let deleteTask = (id) => {
        setTasks((prevTasks) =>
            prevTasks.filter((task) => task.id !== id)
        );
    };

    let clearAll = () => {
        setTasks((prevTasks) => [])};

    let upperCaseAll = () => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                return {
                    ...task,
                    toDo: task.toDo.toUpperCase(),
                };
            })
        );
    };

    let upperCaseOne = (id) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                if (task.id === id) {
                    return {
                        ...task,
                        toDo: task.toDo.toUpperCase(),
                    };
                }
                return task;
            })
        );
    };

    let markAllDone = () => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                return {
                    ...task,
                    isDone: true,
                };
            })
        );
    };

    let markAsDone = (id) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                if (task.id === id) {
                    return {
                        ...task,
                        isDone: true,
                    };
                }
                return task;
            })
        );
    };



    return (
        <div>
            <input
                placeholder="Add a task"
                onChange={updateTaskValue}
                value={newTask}
            />
            &nbsp;&nbsp;&nbsp;
            <button onClick={addNewTask}>Add Task</button>

            <br /><br /><hr />

            <h2>To Do List</h2>

            <ul>
                {tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            <span
                                style={
                                    task.isDone
                                        ? { textDecorationLine: "line-through", color: "red" }
                                        : {}
                                }
                            >
                                {task.toDo}
                            </span>
                            &nbsp;&nbsp;
                            <button onClick={() => upperCaseOne(task.id)}>UpperCase</button>
                            &nbsp;&nbsp;
                            <button onClick={() => markAsDone(task.id)}>Mark as DONE</button>
                            &nbsp;&nbsp;&nbsp;
                            <button onClick={() => deleteTask(task.id)}>Delete</button>
                        </li>
                    );
                })}
            </ul>

            <br /><br />
            <button onClick={upperCaseAll}>UpperCase all</button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={markAllDone}>Mark ALL as DONE</button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={clearAll}>Clear List</button>
        </div>
    );
}
