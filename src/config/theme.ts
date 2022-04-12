import { MantineTheme } from '@mantine/core';

const theme: Partial<MantineTheme> = {
    primaryColor: 'indigo',
    colorScheme: 'dark',
    fontFamily: 'sans-serif',
};

export type ThemeSelector<
    ExtraArgs extends unknown[] = [],
    Returns = number | string
> = (t: MantineTheme, ...p: ExtraArgs) => Returns;

export const selectSpacing: ThemeSelector<[keyof MantineTheme['spacing']]> = (
    t,
    key
) => t.spacing[key];
export const selectRadius: ThemeSelector<[keyof MantineTheme['radius']]> = (
    t,
    key
) => t.radius[key];

export default theme;
