import { SlideUpMenu } from '@/components';
import { useShoppingListState, useShoppingListTargetedItem } from '@/store';
import { ActionIcon, createStyles, Input } from '@mantine/core';
import { useDidUpdate, useInputState } from '@mantine/hooks';
import { B, D } from '@mobily/ts-belt';
import React, { useRef, useState } from 'react';
import { DeviceFloppy, Edit } from 'tabler-icons-react';

const useStyles = createStyles(() => ({
    input: {
        textAlign: 'center',
        fontWeight: 'bold',
        '&:disabled': {
            backgroundColor: 'transparent',
        },
        padding: 0,
    },
}));

const useRequiredShoppingListState = () => {
    const { deleteItem, targetedItemId, closeMenu } = useShoppingListState(
        D.selectKeys(['deleteItem', 'targetedItemId', 'closeMenu'])
    );

    const fullTargetedItem = useShoppingListTargetedItem();
    const deleteTargetedItem = () =>
        targetedItemId && deleteItem(targetedItemId);

    return {
        deleteTargetedItem,
        fullTargetedItem,
        closeMenu,
    };
};

const useActiveMenuTitleInputState = () => {
    const fullTargetedItem = useShoppingListTargetedItem();
    const [titleInputValue, setTitleInputValue] = useInputState('');
    const [editModeIsActive, setEditModeIsActive] = useState(false);
    const titleEditInputElementRef = useRef<HTMLInputElement>();
    const updateTargetedItem = useShoppingListState(
        D.getUnsafe('updateTargetedItem')
    );

    const titleInputIcon = editModeIsActive ? <DeviceFloppy /> : <Edit />;
    const toggleTitleEditMode = () => setEditModeIsActive(B.inverse);

    useDidUpdate(() => {
        setTitleInputValue(fullTargetedItem?.title || '');
    }, [fullTargetedItem]);

    useDidUpdate(() => {
        if (editModeIsActive) {
            titleEditInputElementRef.current?.focus();
        }
    }, [editModeIsActive]);

    useDidUpdate(() => {
        // Reset state value when the menu gets closed
        if (!fullTargetedItem) {
            setTitleInputValue('');
            setEditModeIsActive(false);
        }
    }, [fullTargetedItem]);

    useDidUpdate(() => {
        if (!editModeIsActive) {
            // When edit mode gets disabled, save the new title
            updateTargetedItem({
                title: titleInputValue,
            });
        }
    }, [editModeIsActive]);

    return {
        titleInputValue,
        setTitleInputValue,
        editModeIsActive,
        titleEditInputElementRef,
        titleInputIcon,
        toggleTitleEditMode,
    };
};

const ActiveItemMenu = () => {
    const { classes } = useStyles();
    const { deleteTargetedItem, closeMenu, fullTargetedItem } =
        useRequiredShoppingListState();

    const {
        titleInputValue,
        setTitleInputValue,
        editModeIsActive,
        titleEditInputElementRef,
        titleInputIcon,
        toggleTitleEditMode,
    } = useActiveMenuTitleInputState();

    return (
        <SlideUpMenu
            isOpen={!!fullTargetedItem}
            onClose={closeMenu}
            label={
                <Input
                    variant={editModeIsActive ? 'default' : 'unstyled'}
                    width="100%"
                    classNames={{
                        input: classes.input,
                    }}
                    value={titleInputValue}
                    onChange={setTitleInputValue}
                    disabled={!editModeIsActive}
                    ref={titleEditInputElementRef as any}
                    rightSection={
                        <ActionIcon
                            onClick={toggleTitleEditMode}
                            color="gray"
                            variant="transparent"
                        >
                            {titleInputIcon}
                        </ActionIcon>
                    }
                />
            }
            items={[
                {
                    label: 'Delete',
                    onClick: (onClose) => {
                        deleteTargetedItem();
                        onClose();
                    },
                    styles: (t) => ({
                        color: t.colors.red[9],
                    }),
                    color: 'red',
                },
                {
                    label: editModeIsActive ? 'Save' : 'Edit',
                    onClick: toggleTitleEditMode,
                },
            ]}
        />
    );
};

export default ActiveItemMenu;
