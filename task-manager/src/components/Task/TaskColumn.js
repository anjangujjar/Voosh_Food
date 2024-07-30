import React from 'react';
import TaskCard from './TaskCard';
import { Box, Typography } from '@mui/material';

const TaskColumn = ({ column, tasks }) => {
    return (
        <Box>
            <Typography variant="h4">{column}</Typography>
            {tasks.map((task) => (
                <TaskCard key={task._id} task={task} />
            ))}
        </Box>
    );
};

export default TaskColumn;
