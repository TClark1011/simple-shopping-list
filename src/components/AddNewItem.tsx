import { usePrimaryColor } from '@/hooks';
import { useShoppingListState } from '@/store';
import { WithClassName } from '@/types';
import { ActionIcon, Box, createStyles, Input, Paper } from '@mantine/core';
import { useDidUpdate, useInputState, useInterval } from '@mantine/hooks';
import { D } from '@mobily/ts-belt';
import React, { useCallback, useEffect, useState } from 'react';
import { Plus } from 'tabler-icons-react';

const useStyles = createStyles((t) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    paper: {
        width: '100%',
        height: 44,
        transition: 'box-shadow',
        transitionDuration: '0.1s',
    },
    field: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        input: {
            paddingLeft: 16,
            height: '100%',
        },
    },
    button: {
        marginLeft: 16,
        borderRadius: '100%',
    },
    invalid: {
        boxShadow: `0 0 0 1px ${t.colors.red[9]}`,
    },
}));

const useInputInvalidNeedsContent = (inputValue: string) => {
    const [errorIsActive, setErrorIsActive] = useState(false);

    const activateError = () => setErrorIsActive(true);

    useEffect(() => {
        if (inputValue) {
            setErrorIsActive(false);
        }
    }, [inputValue]);

    const errorTimeoutInterval = useInterval(
        () => setErrorIsActive(false),
        4000
    ); // Turn off error after 4 seconds

    useDidUpdate(() => {
        if (errorIsActive) {
            // Start the countdown if the error is active
            errorTimeoutInterval.start();
        } else {
            errorTimeoutInterval.stop();
        }
    }, [errorIsActive]);

    return [errorIsActive, activateError] as const;
};

const AddNewItem = ({ className }: WithClassName) => {
    const { classes, cx } = useStyles();
    const createNewItem = useShoppingListState(D.getUnsafe('createNewItem'));
    const [value, setValue] = useInputState('');
    const [errorIsActive, activateError] = useInputInvalidNeedsContent(value);

    const onSubmit = useCallback(() => {
        if (!value) return activateError();

        createNewItem(value);
        setValue('');
    }, [value]);
    const inputPlaceholder = errorIsActive
        ? 'Names cannot be blank'
        : 'Create New Item';
    const primaryColor = usePrimaryColor();

    return (
        <Box className={cx(classes.root, className)}>
            <Paper
                shadow="md"
                radius="xl"
                className={cx(classes.paper, errorIsActive && classes.invalid)}
            >
                <Input
                    onChange={setValue}
                    value={value}
                    className={classes.field}
                    variant="unstyled"
                    invalid={errorIsActive}
                    placeholder={inputPlaceholder}
                />
            </Paper>
            <ActionIcon
                variant="filled"
                color={primaryColor}
                className={classes.button}
                onClick={onSubmit}
                size="xl"
            >
                <Plus />
            </ActionIcon>
        </Box>
    );
};

export default AddNewItem;
