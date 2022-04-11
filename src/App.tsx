import React from 'react';
import { Box, Center, createStyles, Stack } from '@mantine/core';

const useStyles = createStyles((t) => ({
    root: {
        background: t.colors.dark[8],
        minHeight: '100vh',
    },
    footer: {
        height: 64,
        background: t.colors.dark[7],
    },
}));

function App() {
    const { classes } = useStyles();
    return (
        <Stack justify="space-between" className={classes.root}>
            <Box>MainContent</Box>
            <Center className={classes.footer}>Footer</Center>
        </Stack>
    );
}

export default App;
