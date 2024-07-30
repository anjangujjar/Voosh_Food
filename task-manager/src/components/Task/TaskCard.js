import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const TaskCard = ({ task }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{task.title}</Typography>
                <Typography variant="body2">{task.description}</Typography>
            </CardContent>
        </Card>
    );
};

export default TaskCard;
