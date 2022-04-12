import { ShoppingListEntry } from '@/components';
import { ITEM_TRANSITION_DURATION } from '@/config';
import { useShoppingListState } from '@/store';
import { Center, createStyles, Stack, Text, Transition } from '@mantine/core';
import { D } from '@mobily/ts-belt';
import React from 'react';

const useStyles = createStyles(() => ({
    root: {
        overflowY: 'auto',
    },
}));

const SPACE = 8;

const ShoppingList = () => {
    const { classes } = useStyles();
    const shoppingList = useShoppingListState(D.getUnsafe('shoppingList'));

    return (
        <>
            <Stack p={SPACE} spacing={SPACE} className={classes.root}>
                {!shoppingList.length && (
                    <Center p={16}>
                        <Text color="gray">Shopping List is Empty</Text>
                    </Center>
                )}
                {shoppingList.map((item) => (
                    <Transition
                        duration={ITEM_TRANSITION_DURATION}
                        transition="pop"
                        mounted={!item._markedForDelete}
                        key={item._id}
                    >
                        {(style) => (
                            <ShoppingListEntry data={item} style={style} />
                        )}
                    </Transition>
                ))}
            </Stack>
        </>
    );
};

export default ShoppingList;
