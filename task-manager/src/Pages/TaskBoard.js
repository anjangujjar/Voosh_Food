import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskColumn from '../components/Task/TaskColumn';
import Navbar from '../components/Layout/Navbar';

const TaskBoard = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/tasks', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTasks(response.data);
        };

        fetchTasks();
    }, []);

    const columns = ['To Do', 'In Progress', 'Done'];

    return (
        <div>
            <Navbar />
            <div>
                {columns.map((column) => (
                    <TaskColumn key={column} column={column} tasks={tasks.filter(task => task.column === column)} />
                ))}
            </div>
        </div>
    );
};

export default TaskBoard;
