import { ShoppingListEntry } from '@/components';
import { ITEM_TRANSITION_DURATION } from '@/config';
import { useShoppingListState, useViewableShoppingListItems } from '@/store';
import { ShoppingListItem } from '@/types';
import { arrayContentsComparison } from '@/utils';
import { Center, createStyles, Stack, Text, Transition } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { A, D } from '@mobily/ts-belt';
import React, { useCallback, useMemo } from 'react';

const useStyles = createStyles(() => ({
    root: {
        overflowY: 'auto',
    },
}));

const useShoppingListHasNoItems = () => {
    const shoppingList = useViewableShoppingListItems();
    const [debouncedShoppingList] = useDebouncedValue(
        shoppingList,
        ITEM_TRANSITION_DURATION + 10
    );

    const diffBetweenRealAndDebounced = useMemo(
        () => arrayContentsComparison(shoppingList, debouncedShoppingList),
        [shoppingList, debouncedShoppingList]
    );

    return (
        A.isEmpty(debouncedShoppingList) &&
        diffBetweenRealAndDebounced !== 'hasExtra'
    );
};

const useShoppingListItemIsVisible = () => {
    const shoppingList = useViewableShoppingListItems();

    const deriveIfItemIsVisible = useCallback(
        (item: ShoppingListItem) => A.includes(shoppingList, item),
        [shoppingList]
    );

    return deriveIfItemIsVisible;
};

const SPACE = 8;
const ShoppingList = () => {
    const { classes } = useStyles();
    const shoppingList = useShoppingListState(D.getUnsafe('shoppingList'));
    const shoppingListHasNoItems = useShoppingListHasNoItems();
    const deriveIfItemIsVisible = useShoppingListItemIsVisible();

    return (
        <Stack p={SPACE} spacing={SPACE} className={classes.root}>
            {shoppingListHasNoItems && (
                <Center p={16}>
                    <Text color="gray">Shopping List is Empty</Text>
                </Center>
            )}
            {shoppingList.map((item) => (
                <Transition
                    duration={ITEM_TRANSITION_DURATION}
                    transition="pop"
                    mounted={deriveIfItemIsVisible(item)}
                    key={item._id}
                >
                    {(style) => <ShoppingListEntry data={item} style={style} />}
                </Transition>
            ))}
        </Stack>
    );
};

export default ShoppingList;
