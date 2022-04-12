import { selectRadius, selectSpacing, ThemeSelector } from '@/config';
import {
    Box,
    Button,
    ButtonProps,
    ButtonVariant,
    createStyles,
    Divider,
    Drawer,
    MantineColor,
    Stack,
    Text,
} from '@mantine/core';
import React from 'react';

const selectDrawerRadius: ThemeSelector = (t) => selectRadius(t, 'md');

const useStyles = createStyles((t) => ({
    drawer: {
        width: `calc(100% - ${t.spacing.md}px)`,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderTopLeftRadius: selectDrawerRadius(t),
        borderTopRightRadius: selectDrawerRadius(t),
    },
    body: {
        padding: selectSpacing(t, 'md'),
    },
    items: {
        justifyContent: 'flex-start',
    },
}));

export type SlideUpMenuItem = {
    label: string;
    onClick?: (onClose: () => unknown) => unknown;
    styles?: ButtonProps<unknown>['sx'];
    variant?: ButtonVariant;
    color?: MantineColor;
};

export type SlideUpMenuProps = {
    isOpen: boolean;
    onClose: () => unknown;
    label?: string | JSX.Element;
    items?: SlideUpMenuItem[];
};

const SlideUpMenu = ({
    isOpen,
    onClose,
    label,
    items = [],
}: SlideUpMenuProps) => {
    const { classes } = useStyles();

    return (
        <Drawer
            position="bottom"
            classNames={{
                drawer: classes.drawer,
            }}
            opened={isOpen}
            onClose={onClose}
            withCloseButton={false}
            trapFocus={false}
            size="max-content"
        >
            <Box className={classes.body}>
                <Stack>
                    {label !== undefined && (
                        <>
                            {typeof label === 'string' ? (
                                <Text align="center" weight="bold">
                                    {label}
                                </Text>
                            ) : (
                                label
                            )}
                            <Divider />
                        </>
                    )}
                    {items.map(
                        ({
                            label,
                            onClick = () => null,
                            styles = {},
                            variant = 'subtle',
                            color,
                        }) => (
                            <Button
                                size="lg"
                                classNames={{
                                    inner: classes.items,
                                }}
                                sx={styles}
                                variant={variant}
                                key={label}
                                onClick={() => onClick(onClose)}
                                px="sm"
                                {...(color && { color })}
                            >
                                {label}
                            </Button>
                        )
                    )}
                </Stack>
            </Box>
        </Drawer>
    );
};

export default SlideUpMenu;
