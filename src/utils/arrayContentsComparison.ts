import { A } from '@mobily/ts-belt';

export type ArrayDifferenceType =
    | 'hasExtra'
    | 'missingItems'
    | 'different'
    | 'equivalent';

const arrayContentsComparison = <T>(
    primaryArray: readonly T[],
    secondaryArray: readonly T[]
): ArrayDifferenceType => {
    const everyPrimaryItemIsInSecondary = primaryArray.every((item) =>
        A.includes(secondaryArray, item)
    );
    const everySecondaryItemIsInPrimary = secondaryArray.every((item) =>
        A.includes(primaryArray, item)
    );
    if (everyPrimaryItemIsInSecondary && everySecondaryItemIsInPrimary)
        return 'equivalent';
    if (everyPrimaryItemIsInSecondary && !everySecondaryItemIsInPrimary)
        return 'missingItems';
    if (!everyPrimaryItemIsInSecondary && everySecondaryItemIsInPrimary)
        return 'hasExtra';
    return 'different';
};

export default arrayContentsComparison;
