import { useMantineTheme } from '@mantine/core';
import { D, flow } from '@mobily/ts-belt';

const usePrimaryColor = flow(useMantineTheme, D.getUnsafe('primaryColor'));

export default usePrimaryColor;
