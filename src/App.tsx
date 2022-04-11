import React from 'react';
import { Box, Center, createStyles, Stack, Text } from '@mantine/core';

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
            <Text>MainContent</Text>
            <Center className={classes.footer}>
                <Text>Footer</Text>
            </Center>
        </Stack>
    );
}

export default App;
