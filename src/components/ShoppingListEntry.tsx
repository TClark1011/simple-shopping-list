import { ThemeSelector } from '@/config';
import { useShoppingListState } from '@/store';
import { WithClassName, WithStyle } from '@/types';
import ShoppingListItem from '@/types/ShoppingListItem';
import { withCanceledEvent } from '@/utils';
import { createStyles, Paper, Text, CSSObject, Checkbox } from '@mantine/core';
import { D } from '@mobily/ts-belt';
import React from 'react';

const activeStyle: ThemeSelector<[], CSSObject> = (t) => ({
    boxShadow: `0 0 0 1px ${t.white}`,
    background: t.colors.gray[8],
});

const useStyles = createStyles((t) => ({
    root: {
        width: '100%',
        padding: 16,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '&:active': activeStyle(t),
        // position: 'absolute',
    },
    active: activeStyle(t),
    buttonLabel: {
        color: t.colors.red[9],
    },
}));

export type ShoppingListEntryProps = WithClassName &
    WithStyle & {
        data: ShoppingListItem;
    };

const ShoppingListEntry = ({
    className,
    style = {},
    data: { title, _id, checked },
}: ShoppingListEntryProps) => {
    const { classes, cx } = useStyles();

    const { toggleItemChecked, setTargetedItem, targetedItemId } =
        useShoppingListState(
            D.selectKeys([
                'toggleItemChecked',
                'setTargetedItem',
                'targetedItemId',
            ])
        );

    const onOptionsOpen = () => setTargetedItem(_id);
    const onCheckedChange = () => toggleItemChecked(_id);
    const isTargeted = targetedItemId === _id;

    return (
        <Paper
            shadow="xl"
            radius="md"
            className={cx(
                classes.root,
                className,
                isTargeted && classes.active
            )}
            onContextMenu={withCanceledEvent(onOptionsOpen)}
            style={style}
        >
            <Text>{title}</Text>
            <Checkbox checked={checked} onChange={onCheckedChange} />
        </Paper>
    );
};

export default ShoppingListEntry;
