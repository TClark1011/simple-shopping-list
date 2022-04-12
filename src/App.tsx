import React from 'react';
import { createStyles, Stack } from '@mantine/core';
import AddNewItem from '@/components/AddNewItem';
import { ActiveItemMenu, ShoppingList } from '@/components';

const useStyles = createStyles((t) => ({
    root: {
        background: t.colors.dark[8],
        height: '100vh',
    },
    footer: {
        height: 64,
        background: t.colors.dark[7],
    },
    addNew: {
        margin: 16,
    },
}));

const App = () => {
    const { classes } = useStyles();

    return (
        <>
            <Stack justify="space-between" className={classes.root}>
                <ShoppingList />
                <AddNewItem className={classes.addNew} />
            </Stack>
            <ActiveItemMenu />
        </>
    );
};

export default App;
